import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/store/api';
import { authApi } from '@/store/services/authApi';
import filterReducer from '@/store/filterSlice';
import authReducer from '@/store/features/auth/authSlice';

const store = configureStore({
  reducer: {
    filters: filterReducer,
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(authApi.middleware),
});

export function TestProviders({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
} 