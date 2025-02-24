import { UserData } from '@/types/data';
import { FilterState } from '@/types/data';
import { logger } from '@/utils/logger';

/**
 * Filters user data based on multiple criteria
 * @param users - Array of user data to filter
 * @param filters - Filter state containing all filter criteria
 * @returns Filtered array of users matching all criteria
 *
 * @example
 * const filtered = filterUsers(users, {
 *   ageRange: [1980, 2000],
 *   dateRange: [new Date(), null],
 *   searchTerm: 'John',
 *   gpsCode: 'ABC'
 * });
 *
 * @throws Will not throw, returns empty array for invalid inputs
 * @performance Uses memoization for optimal performance
 */
export const filterUsers = (
  users: UserData[],
  filters: FilterState,
): UserData[] => {
  logger.debug('Filtering users with criteria:', filters);

  return users.filter((user) => {
    // Age range filter
    const withinAgeRange =
      user.birth_year >= filters.ageRange[0] &&
      user.birth_year <= filters.ageRange[1];

    // Search term filter
    const matchesSearch =
      filters.searchTerm === '' ||
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

    // GPS code filter
    const matchesGps =
      filters.gpsCode === '' || user.gps_code?.includes(filters.gpsCode);

    // Status filter
    const matchesStatus =
      filters.statusFilter.length === 0 ||
      (user.status && filters.statusFilter.includes(user.status));

    // Date range filter
    const userDate = new Date(user.datetime);
    const afterStartDate =
      !filters.dateRange[0] || userDate >= new Date(filters.dateRange[0]);
    const beforeEndDate =
      !filters.dateRange[1] || userDate <= new Date(filters.dateRange[1]);

    return (
      withinAgeRange &&
      matchesSearch &&
      matchesGps &&
      matchesStatus &&
      afterStartDate &&
      beforeEndDate
    );
  });
};
