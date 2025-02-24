import { useMemo } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { UserData } from '@/types/data';

interface ChartProps {
  data: UserData[];
}

export const StatusChart = ({ data }: ChartProps) => {
  const chartData = useMemo(() => {
    const statusGroups = data.reduce(
      (acc, user) => {
        acc[user.status] = (acc[user.status] || 0) + user.value;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(statusGroups).map(([status, value]) => ({
      status,
      value,
      percentage:
        (value / data.reduce((sum, user) => sum + user.value, 0)) * 100,
    }));
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Value by Status</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {chartData.map(({ status, value, percentage }) => (
            <div key={status} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{status}</span>
                <span>${value.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
