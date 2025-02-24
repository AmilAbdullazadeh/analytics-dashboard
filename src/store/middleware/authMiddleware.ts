import { createListenerMiddleware } from '@reduxjs/toolkit';
import { isAuthenticated } from '@/utils/auth';
import { logout } from '../features/auth/authSlice';
import { RootState } from '@/store';

export const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
  predicate: (_action, currentState) => {
    const state = currentState as RootState;
    return state.auth.isAuthenticated && !isAuthenticated();
  },
  effect: async (_action, api) => {
    api.dispatch(logout());
  },
});
