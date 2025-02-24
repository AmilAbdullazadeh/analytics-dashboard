import { useMemo, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RootState } from '@/store';
import { filterUsers } from '@/utils/filters';
import { MAP_CONFIG } from '@/config/constants';
import { MapViewProps } from '@/types/components';
import { MapEvents } from './components/MapEvents';
import { MapMarker } from './components/MapMarker';
import 'leaflet/dist/leaflet.css';

export const MapView = ({ data, onMarkerClick }: MapViewProps) => {
  const filters = useSelector((state: RootState) => state.filters);
  const filteredData = useMemo(
    () => filterUsers(data, filters),
    [data, filters],
  );
  const [mapError, setMapError] = useState<string | null>(null);

  if (mapError) {
    return (
      <Alert variant="destructive" className="mx-4">
        <AlertDescription>{mapError}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="mx-4 overflow-hidden">
      <CardContent className="p-0">
        <div className="h-[600px] w-full relative">
          <MapContainer
            center={MAP_CONFIG.DEFAULT_CENTER}
            zoom={MAP_CONFIG.DEFAULT_ZOOM}
            className="h-full w-full"
          >
            <MapEvents onError={setMapError} />
            <TileLayer
              url={MAP_CONFIG.TILE_LAYER}
              attribution={MAP_CONFIG.ATTRIBUTION}
            />
            {filteredData.map((user) => (
              <MapMarker key={user.id} user={user} onClick={onMarkerClick} />
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  );
};
