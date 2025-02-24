import { useMemo } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserData } from '@/types/data';
import { formatDate } from '@/utils/formatters';

interface TimelineViewProps {
  data: UserData[];
}

export const TimelineView = ({ data }: TimelineViewProps) => {
  const sortedData = useMemo(() => {
    return [...data].sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
    );
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Recent Activity</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedData.slice(0, 5).map((user) => (
            <div key={user.id} className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">
                    {user.first_name} {user.last_name}
                  </h4>
                  <Badge variant={user.status}>{user.status}</Badge>
                </div>
                <p className="text-sm text-gray-500">
                  {formatDate(user.datetime)}
                </p>
                <p className="text-sm">
                  Value: ${(user.value || 0).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
