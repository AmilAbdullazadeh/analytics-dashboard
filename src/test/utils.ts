import { RenderOptions } from '@testing-library/react';
import { api } from '@/store/api';
import { authApi } from '@/store/services/authApi';
import filterReducer from '@/store/filterSlice';
import authReducer from '@/store/features/auth/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';

function render(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
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
    }),
    ...renderOptions
  }: { preloadedState?: any; store?: any } & Omit<RenderOptions, 'wrapper'> = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

function screen(ui: React.ReactElement) {
  return render(ui).screen;
}

function fireEvent(ui: React.ReactElement) {
  return render(ui).fireEvent;
}

export * from '@testing-library/react';
export { render, screen, fireEvent };
