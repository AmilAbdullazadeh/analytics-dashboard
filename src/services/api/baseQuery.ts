import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  // Common headers or configuration here
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
  credentials: 'include', // include credentials
  mode: 'cors', // cors mode
  cache: 'no-store', // no store
});
