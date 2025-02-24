import { StatCards } from '../StatCards';
import { StatusChart } from '../Charts';
import { TimelineView } from '../TimelineView';
import { FilterPanel } from '../FilterPanel';
import { MapView } from '../Map/MapView';
import { useGetUsersQuery } from '@/store/api';
import { Spinner } from '../ui/spinner';
import { ErrorAlert } from '../ui/error-alert';
import { ErrorBoundary } from '../ErrorBoundary';
import { DataTable } from '../DataTable';

export const AnalyticsDashboard = () => {
  const { data: users = [], isLoading, error } = useGetUsersQuery();

  if (isLoading) return <Spinner />;

  if (error) {
    const errorMessage =
      'message' in error
        ? error.message || 'An error occurred'
        : 'An error occurred';
    return <ErrorAlert message={errorMessage} />;
  }

  return (
    <ErrorBoundary fallback={<ErrorAlert message="Something went wrong" />}>
      <div className="space-y-6 m-6">
        <StatCards data={users} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <FilterPanel />
            <StatusChart data={users} />
            <TimelineView data={users} />
          </div>
          <div className="lg:col-span-3 space-y-6">
            <MapView data={users} />
            <DataTable data={users} onRowClick={console.log} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};
