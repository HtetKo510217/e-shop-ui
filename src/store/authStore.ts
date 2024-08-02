import { create } from 'zustand';
import { AuthState } from '../models/User';

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    clearAuth: () => set({ user: null, token: null }),
}));
