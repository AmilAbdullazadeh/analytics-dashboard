import { Popup } from 'react-leaflet';
import { UserData } from '@/types/data';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/formatters';

interface MapPopupProps {
  user: UserData;
}

export const MapPopup = ({ user }: MapPopupProps) => (
  <Popup>
    <Card className="border-0 shadow-none">
      <CardHeader className="p-2">
        <h3 className="text-lg font-semibold">
          {user.first_name} {user.last_name}
        </h3>
      </CardHeader>
      <CardContent className="p-2 pt-0 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">GPS:</span>
          {user.gps_code ? (
            <Badge variant="Lead">{user.gps_code}</Badge>
          ) : (
            <Badge variant="Closed">N/A</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Birth Year:</span>
          <span className="text-sm">{user.birth_year}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Date:</span>
          <span className="text-sm">{formatDate(user.datetime)}</span>
        </div>
      </CardContent>
    </Card>
  </Popup>
);
