import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { filterUsers } from '@/utils/filters';
import { RootState } from '@/store';
import { UserData } from '@/types/data';

export const useFilteredData = (data: UserData[]) => {
  const filters = useSelector((state: RootState) => state.filters);

  return useMemo(() => filterUsers(data, filters), [data, filters]);
};
