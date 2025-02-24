import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MapView } from '../index';
import { mockData } from '@/services/mockData';
import filterReducer from '@/store/filterSlice';

interface MapProps {
  children: React.ReactNode;
  initialViewState: {
    zoom: number;
    longitude: number;
    latitude: number;
  };
}

interface MarkerProps {
  children: React.ReactNode;
  onClick?: () => void;
  longitude: number;
  latitude: number;
}

// Mock react-map-gl
jest.mock('react-map-gl', () => ({
  __esModule: true,
  default: ({ children, initialViewState }: MapProps) => (
    <div data-testid="map-container" data-zoom={initialViewState.zoom}>
      {children}
    </div>
  ),
  Marker: ({ children, onClick, longitude, latitude }: MarkerProps) => (
    <div
      data-testid="map-marker"
      onClick={onClick}
      data-longitude={longitude}
      data-latitude={latitude}
    >
      {children}
    </div>
  ),
  Popup: ({ children, longitude, latitude }: Omit<MarkerProps, 'onClick'>) => (
    <div
      data-testid="map-popup"
      data-longitude={longitude}
      data-latitude={latitude}
    >
      {children}
    </div>
  ),
}));

describe('MapView', () => {
  const mockStore = configureStore({
    reducer: {
      filters: filterReducer,
    },
  });

  const setup = (props = {}) => {
    return render(
      <Provider store={mockStore}>
        <MapView data={mockData} {...props} />
      </Provider>,
    );
  };

  describe('Rendering', () => {
    it('renders map container with correct initial state', () => {
      setup();
      const container = screen.getByTestId('map-container');
      expect(container).toBeInTheDocument();
      expect(container).toHaveAttribute('data-zoom', '2');
    });

    it('renders markers at correct coordinates', () => {
      setup();
      const markers = screen.getAllByTestId('map-marker');
      const firstMarker = markers[0];

      expect(firstMarker).toHaveAttribute(
        'data-longitude',
        mockData[0].longitude.toString(),
      );
      expect(firstMarker).toHaveAttribute(
        'data-latitude',
        mockData[0].latitude.toString(),
      );
    });

    it('renders popups with correct coordinates', () => {
      setup();
      const popups = screen.getAllByTestId('map-popup');
      const firstPopup = popups[0];

      expect(firstPopup).toHaveAttribute(
        'data-longitude',
        mockData[0].longitude.toString(),
      );
      expect(firstPopup).toHaveAttribute(
        'data-latitude',
        mockData[0].latitude.toString(),
      );
    });
  });

  describe('Interactions', () => {
    it('handles marker clicks', () => {
      const onMarkerClick = jest.fn();
      setup({ onMarkerClick });

      const markers = screen.getAllByTestId('map-marker');
      fireEvent.click(markers[0]);

      expect(onMarkerClick).toHaveBeenCalledWith(mockData[0]);
      expect(onMarkerClick).toHaveBeenCalledTimes(1);
    });

    it('filters markers based on search term', () => {
      const { rerender } = setup();
      const initialMarkers = screen.getAllByTestId('map-marker');

      mockStore.dispatch({
        type: 'filters/setSearchTerm',
        payload: 'Zelig',
      });

      rerender(
        <Provider store={mockStore}>
          <MapView data={mockData} />
        </Provider>,
      );

      const filteredMarkers = screen.getAllByTestId('map-marker');
      expect(filteredMarkers.length).toBeLessThan(initialMarkers.length);
    });
  });

  describe('Content Display', () => {
    it('displays correct user information in popups', () => {
      setup();
      const popups = screen.getAllByTestId('map-popup');
      const firstUser = mockData[0];

      expect(popups[0]).toHaveTextContent(firstUser.first_name);
      expect(popups[0]).toHaveTextContent(firstUser.last_name);
      expect(popups[0]).toHaveTextContent(firstUser.birth_year.toString());
      expect(popups[0]).toHaveTextContent(firstUser.gps_code || 'N/A');
    });
  });

  describe('Error handling', () => {
    it('shows error message when map fails to load', () => {
      setup();
      fireEvent.error(screen.getByTestId('map-container'));
      expect(screen.getByText('Failed to load map')).toBeInTheDocument();
    });
  });
});
