export type Status =
  | 'Qualified'
  | 'Lead'
  | 'Closed'
  | 'Lost'
  | 'Negotiation'
  | 'Proposal';

export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  birth_year: number;
  gps_code: string;
  latitude: number;
  longitude: number;
  datetime: string;
  status: Status;
  value: number;
}

export interface FilterState {
  searchTerm: string;
  gpsCode: string;
  ageRange: [number, number];
  dateRange: [string, string];
  statusFilter: Status[];
  valueRange: [number, number];
  advancedSearch: {
    field: keyof UserData;
    operator: 'equals' | 'contains' | 'greaterThan' | 'lessThan';
    value: string;
  }[];
  selectedPreset: string | null;
  selectedIds: string[];
  groupBy: keyof UserData | null;
  mapLayer: 'default' | 'satellite' | 'terrain';
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: Pick<
    FilterState,
    | 'searchTerm'
    | 'gpsCode'
    | 'ageRange'
    | 'dateRange'
    | 'statusFilter'
    | 'valueRange'
    | 'advancedSearch'
    | 'groupBy'
    | 'mapLayer'
  >;
  createdBy: string;
  createdAt: Date;
}
