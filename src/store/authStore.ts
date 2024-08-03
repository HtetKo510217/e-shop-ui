import { create } from 'zustand';
import { AuthState } from '../models/User';

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    clearAuth: () => set({ user: null, token: null }),
}));


const authToken = localStorage.getItem('authToken');
const userData = localStorage.getItem('userData');

if (authToken && userData) {
  useAuthStore.setState({
    token: authToken,
    user: JSON.parse(userData)
  });
}