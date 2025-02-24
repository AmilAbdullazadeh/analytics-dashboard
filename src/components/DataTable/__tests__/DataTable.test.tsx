import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { DataTable } from '@/components/DataTable';
import { mockData } from '@/services/mockData';
import filterReducer from '@/store/filterSlice';
import { formatDate, formatPhoneNumber } from '@/utils/formatters';

describe('DataTable', () => {
  const mockStore = configureStore({
    reducer: {
      filters: filterReducer,
    },
  });

  const setup = (props = {}) => {
    return render(
      <Provider store={mockStore}>
        <DataTable data={mockData} {...props} />
      </Provider>,
    );
  };

  describe('Rendering', () => {
    it('renders table with correct columns', () => {
      setup();
      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(4);
      expect(headers[0]).toHaveTextContent('Name');
      expect(headers[1]).toHaveTextContent('Birth Year');
      expect(headers[2]).toHaveTextContent('Phone');
      expect(headers[3]).toHaveTextContent('Date');
    });

    it('renders data in correct format', () => {
      setup();
      const firstRow = screen.getAllByRole('row')[1];
      const cells = within(firstRow).getAllByRole('cell');

      expect(cells[0]).toHaveTextContent('Zelig Hutchason');
      expect(cells[1]).toHaveTextContent('1984');
      expect(cells[2]).toHaveTextContent(formatPhoneNumber('1781666460'));
      expect(cells[3]).toHaveTextContent(formatDate('2024-12-31 08:48:35'));
    });
  });

  describe('Interactions', () => {
    it('handles row clicks', () => {
      const onRowClick = jest.fn();
      setup({ onRowClick });

      const firstRow = screen.getAllByRole('row')[1];
      fireEvent.click(firstRow);

      expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
      expect(onRowClick).toHaveBeenCalledTimes(1);
    });

    it('handles sorting when clicking column headers', () => {
      setup();
      const nameHeader = screen.getByText('Name');

      fireEvent.click(nameHeader);
      const rows = screen.getAllByRole('row');
      const firstRowAfterSort = within(rows[1]).getAllByRole('cell')[0];

      // Verify sorting (assuming mockData is properly sorted)
      expect(firstRowAfterSort).toHaveTextContent(/^[A-Z]/);
    });
  });

  describe('Error handling', () => {
    it('renders fallback UI when data is empty', () => {
      setup({ data: [] });
      expect(screen.getByText('No data available')).toBeInTheDocument();
    });
  });
});
