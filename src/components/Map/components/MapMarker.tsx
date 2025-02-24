import { Marker } from 'react-leaflet';
import { UserData } from '@/types/data';
import { MapPopup } from './MapPopup';

interface MapMarkerProps {
  user: UserData;
  onClick?: (user: UserData) => void;
}

export const MapMarker = ({ user, onClick }: MapMarkerProps) => (
  <Marker
    key={user.id}
    position={[user.latitude, user.longitude]}
    eventHandlers={{
      click: () => onClick?.(user),
    }}
  >
    <MapPopup user={user} />
  </Marker>
);
