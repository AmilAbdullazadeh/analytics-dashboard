import { DateRange } from './filters';
import { ValueRange } from './filters';
import { UserStatus } from './status';

export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  birth_year: number;
  gps_code: string;
  latitude: number;
  longitude: number;
  datetime: string;
  status: UserStatus;
  value: number;
}

export interface UserFilters {
  search?: string;
  status?: string;
  dateRange?: DateRange;
  gpsCode?: string;
  valueRange?: ValueRange;
}
