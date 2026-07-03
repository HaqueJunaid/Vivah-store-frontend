import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserRole, AuthProvider, AuthUser, AuthState } from '../types/allTypes';

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            role: null,
            user: null,
            setToken: (token, role, user) => set({
                token,
                role: role || get().role,
                user: user !== undefined ? user : get().user
            }),
            setUser: (user) => set({ user }),
            logout: () => set({ token: null, role: null, user: null }),
            hasRole: (requiredRole) => {
                const currentRole = get().role;
                if (Array.isArray(requiredRole)) {
                    return requiredRole.includes(currentRole);
                }
                return currentRole === requiredRole;
            },
        }),
        {
            name: 'auth-storage'
        }
    )
);