import { jwtDecode } from 'jwt-decode';
import { UserToken } from '@/types';

export const getAuthToken = (): string | null => {
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find((cookie) =>
    cookie.trim().startsWith('auth_token='),
  );
  return authCookie ? authCookie.split('=')[1] : null;
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<UserToken>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export const hasRole = (requiredRole: string): boolean => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<UserToken>(token);
    return decoded.roles.includes(requiredRole);
  } catch {
    return false;
  }
};

export const getUser = (): UserToken | null => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    return jwtDecode<UserToken>(token);
  } catch {
    return null;
  }
};
