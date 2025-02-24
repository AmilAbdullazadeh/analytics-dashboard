import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { UserToken } from '@/types';

interface AuthState {
  token: string | null;
  user: UserToken | null;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem('auth_token'),
  user: null,
  login: (token: string) => {
    localStorage.setItem('auth_token', token);
    const user = jwtDecode<UserToken>(token);
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    set({ token: null, user: null });
  },
}));
