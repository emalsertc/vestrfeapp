import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  friendsCount: number;
  sponsorships: {
    active: string[];
    pending: string[];
    maxCount: number;
  };
  subscription: {
    status: 'active' | 'cancelled' | 'pending';
    monthlyPayment: number;
  };
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  updateSponsorship: (sponsorships: User['sponsorships']) => void;
  updateSubscription: (subscription: User['subscription']) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      updateSponsorship: (sponsorships) => 
        set((state) => ({
          user: state.user ? { ...state.user, sponsorships } : null
        })),
      updateSubscription: (subscription) =>
        set((state) => ({
          user: state.user ? { ...state.user, subscription } : null
        })),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'user-storage',
    }
  )
); 