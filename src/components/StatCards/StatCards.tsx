import { useMemo } from 'react';
import { UserData } from '@/types/data';
import { getStatusColor } from '@/utils/colors';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '../ui/card';
interface StatCardsProps {
  data: UserData[];
}

export const StatCards = ({ data }: StatCardsProps) => {
  const { t } = useTranslation();
  const stats = useMemo(
    () => ({
      totalUsers: data.length,
      averageValue:
        data.reduce((acc, user) => acc + user.value, 0) / data.length,
      statusDistribution: data.reduce(
        (acc, user) => {
          acc[user.status] = (acc[user.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
      activeRegions: new Set(data.map((user) => user.gps_code)).size,
    }),
    [data],
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-500">
            {t('dashboard.metrics.totalUsers')}
          </h3>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-500">
            {t('dashboard.metrics.averageValue')}
          </h3>
          <p className="text-2xl font-bold">
            ${stats.averageValue.toLocaleString()}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-500">
            {t('dashboard.metrics.activeRegions')}
          </h3>
          <p className="text-2xl font-bold">{stats.activeRegions}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-gray-500">
            {t('dashboard.metrics.statusDistribution')}
          </h3>
          <div className="flex gap-1 mt-2">
            {Object.entries(stats.statusDistribution).map(([status, count]) => (
              <div
                key={status}
                className="h-4 rounded-sm"
                style={{
                  width: `${(count / stats.totalUsers) * 100}%`,
                  backgroundColor: getStatusColor(status),
                }}
                title={`${status}: ${count}`}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
