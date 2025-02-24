import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/services/api/baseQuery';
import { UserData } from '@/types/data';
import { mockData } from '@/services/mockData';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery,
  refetchOnMountOrArgChange: true, // refetch on mount or arg change
  refetchOnFocus: true, // refetch on focus
  refetchOnReconnect: true, // refetch on reconnect
  keepUnusedDataFor: 300, // 5 minutes
  endpoints: (builder) => ({
    getUsers: builder.query<UserData[], void>({
      queryFn: async () => {
        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 500));
          return { data: mockData };
        } catch (error) {
          return {
            error: {
              status: 500,
              data: error,
              message: 'Failed to fetch users',
            },
          };
        }
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
