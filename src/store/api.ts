import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserData } from '@/types/data';
import { mockData } from '@/services/mockData';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<UserData[], void>({
      queryFn: () => {
        // Simulate API delay
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: mockData });
          }, 500);
        });
      },
    }),
  }),
});

export const { useGetUsersQuery } = api;
