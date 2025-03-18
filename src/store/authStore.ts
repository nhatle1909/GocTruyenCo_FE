import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { decodeJWT } from '../utils/jwtUtils';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  roles: string[];
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      roles: [],
      setToken: (token) => {
        const claims = decodeJWT(token);
        set({ 
          token, 
          isAuthenticated: true,
          roles: claims?.role || []
        });
      },
      clearToken: () => set({ 
        token: null, 
        isAuthenticated: false,
        roles: []
      }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        roles: state.roles
      }),
    }
  )
);
