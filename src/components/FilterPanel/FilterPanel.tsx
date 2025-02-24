import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { SearchInput } from '@/components/ui/search-input';
import { Input } from '@/components/ui/input';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RootState } from '@/store';
import {
  setAgeRange,
  setDateRange,
  setSearchTerm,
  setGpsCode,
  setStatusFilter,
  resetFilters,
} from '@/store/filterSlice';
import { FILTER_DEFAULTS } from '@/config/constants';
import { Status } from '@/types/data';
import { useTranslation } from 'react-i18next';

const STATUS_OPTIONS: Status[] = [
  'Qualified',
  'Lead',
  'Closed',
  'Lost',
  'Negotiation',
  'Proposal',
];

export const FilterPanel = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  return (
    <Card className="top-4">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('dashboard.filters.title')}
          </h3>
          <Badge variant="secondary" className="font-medium">
            {activeFiltersCount} {t('dashboard.filters.active')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label className="text-gray-700">
            {t('dashboard.filters.search')}
          </Label>
          <SearchInput
            value={filters.searchTerm}
            onChange={(value) => dispatch(setSearchTerm(value))}
            placeholder={t('dashboard.filters.searchPlaceholder')}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700">
            {t('dashboard.filters.status.title')}
          </Label>
          <Select
            value={filters.statusFilter[0] || 'all'}
            onValueChange={(value) => {
              if (value === 'all') {
                dispatch(setStatusFilter([]));
              } else {
                dispatch(setStatusFilter([value as Status]));
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t('dashboard.filters.allStatuses')}
              </SelectItem>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  <div className="flex items-center gap-2">
                    <Badge variant={status}>{status}</Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{t('dashboard.filters.dateRange')}</Label>
          <DateRangePicker
            value={
              filters.dateRange[0]
                ? {
                    from: new Date(filters.dateRange[0]),
                    to: filters.dateRange[1]
                      ? new Date(filters.dateRange[1])
                      : undefined,
                  }
                : undefined
            }
            onChange={(range) =>
              dispatch(
                setDateRange([
                  range?.from?.toISOString() || '',
                  range?.to?.toISOString() || '',
                ]),
              )
            }
          />
        </div>

        <div className="space-y-2">
          <Label>{t('dashboard.filters.ageRange')}</Label>
          <Slider
            value={filters.ageRange}
            min={FILTER_DEFAULTS.AGE_RANGE[0]}
            max={FILTER_DEFAULTS.AGE_RANGE[1]}
            step={1}
            onValueChange={(value) =>
              dispatch(setAgeRange(value as [number, number]))
            }
            className="py-4"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{filters.ageRange[0]}</span>
            <span>{filters.ageRange[1]}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>{t('dashboard.filters.gpsCode')}</Label>
          <Input
            value={filters.gpsCode}
            onChange={(e) => dispatch(setGpsCode(e.target.value))}
            placeholder={t('dashboard.filters.gpsCodePlaceholder')}
            className="w-full"
          />
        </div>

        <div className="pt-4 border-t">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => dispatch(resetFilters())}
          >
            {t('dashboard.filters.reset')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
