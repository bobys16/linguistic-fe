// Authentication utility functions
import { User } from './types';

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    // Store in cookie for middleware access
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
    // Also store in localStorage for client-side access
    localStorage.setItem('token', token);
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    // Try to get from cookie first
    const cookies = document.cookie.split('; ');
    const tokenCookie = cookies.find(row => row.startsWith('token='));
    if (tokenCookie) {
      return tokenCookie.split('=')[1];
    }
    // Fallback to localStorage
    return localStorage.getItem('token');
  }
  return null;
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    // Remove from cookie
    document.cookie = 'token=; path=/; max-age=0';
    // Remove from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const setUser = (user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

export const isTokenValid = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
