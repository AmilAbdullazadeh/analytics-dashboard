import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserToken } from '@/types';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  user: UserToken | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.token = token;
      state.user = jwtDecode<UserToken>(token);
      state.isAuthenticated = true;
      document.cookie = `auth_token=${token}; path=/; max-age=86400; secure; samesite=strict`;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      document.cookie =
        'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
