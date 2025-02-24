import { UserFilters } from './user';

export interface DateRange {
  start?: Date;
  end?: Date;
}

export interface ValueRange {
  min?: number;
  max?: number;
}

export interface FilterPreset {
  id: string;
  name: string;
  filters: UserFilters;
}
