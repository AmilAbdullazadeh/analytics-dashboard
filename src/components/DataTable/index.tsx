import { useMemo, useState, Suspense, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { UserData, Status } from '@/types/data';
import { DataTableProps } from '@/types/components';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/formatters';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { measurePerformance } from '@/utils/performance';
import { sanitizeInput } from '@/utils/security';
import { isWithinInterval } from 'date-fns';
import { TableToolbar } from './TableToolbar';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TablePagination } from './TablePagination';

const columns: ColumnDef<UserData>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.first_name} {row.original.last_name}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.status as Status}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: 'birth_year',
    header: 'Age',
    cell: ({ row }) => {
      const age = new Date().getFullYear() - row.original.birth_year;
      return <div>{age} years</div>;
    },
  },
  {
    accessorKey: 'gps_code',
    header: 'GPS Code',
    cell: ({ row }) => <div>{row.original.gps_code || 'N/A'}</div>,
  },
  {
    accessorKey: 'datetime',
    header: 'Date',
    cell: ({ row }) => <div>{formatDate(row.original.datetime)}</div>,
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => (
      <div className="text-right font-medium">
        ${row.original.value.toLocaleString()}
      </div>
    ),
  },
];

// Helper function for date range check
const isWithinDateRange = (date: string, range: [string, string]) => {
  const checkDate = new Date(date);
  return isWithinInterval(checkDate, {
    start: new Date(range[0]),
    end: range[1] ? new Date(range[1]) : new Date(),
  });
};

export function DataTable({ data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const filters = useSelector((state: RootState) => state.filters);

  // Measure performance
  const endMeasure = measurePerformance('table-render');

  // Memoize filtered data with security
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const searchTerm = sanitizeInput(filters.searchTerm.toLowerCase());
      const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();

      return (
        (!searchTerm || fullName.includes(searchTerm)) &&
        (!filters.statusFilter.length ||
          filters.statusFilter.includes(item.status)) &&
        (!filters.dateRange[0] ||
          isWithinDateRange(item.datetime, filters.dateRange))
      );
    });
  }, [data, filters]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, filterValue) => {
      const searchValue = filterValue.toLowerCase();
      return Object.values(row.original)
        .join(' ')
        .toLowerCase()
        .includes(searchValue);
    },
  });

  // Add keyboard shortcuts
  useKeyboardShortcuts({ table });

  useEffect(() => {
    const pageIndex = table.getState().pagination.pageIndex;

    // Preload next page data
    if (table.getCanNextPage()) {
      void table
        .getRowModel()
        .rows.slice(
          table.getState().pagination.pageSize * (pageIndex + 1),
          table.getState().pagination.pageSize * (pageIndex + 2),
        );
    }
  }, [table]);

  // Cleanup measure on unmount
  useEffect(() => endMeasure, [endMeasure]);

  return (
    <div className="space-y-4">
      <TableToolbar table={table} />
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <Suspense fallback="Loading header...">
              <TableHeader table={table} />
            </Suspense>
            <Suspense fallback="Loading data...">
              <TableBody table={table} />
            </Suspense>
          </table>
        </div>
      </div>
      <TablePagination table={table} />
    </div>
  );
}
