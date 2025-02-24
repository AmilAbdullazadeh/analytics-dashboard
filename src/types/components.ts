import { Table } from '@tanstack/react-table';
import { UserData } from '@/types/data';

export interface MapViewProps {
  data: UserData[];
  onMarkerClick?: (user: UserData) => void;
}

export interface DataTableProps {
  data: UserData[];
  onRowClick?: (user: UserData) => void;
}

export interface TableHeaderProps {
  table: Table<UserData>;
}

export interface TableRowProps {
  table: Table<UserData>;
  onRowClick?: (user: UserData) => void;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export interface FilterPanelProps {
  className?: string;
}
