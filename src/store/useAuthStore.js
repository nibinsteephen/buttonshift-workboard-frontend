import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            user_name: null,

            login: (accessToken, refreshToken, user_name) =>
                set((state) => ({
                    isAuthenticated: true,
                    refreshToken,
                    accessToken,
                    user_name,
                })),

            logOut: () =>
                set((state) => ({
                    isAuthenticated: false,
                    refreshToken: null,
                    accessToken: null,
                    user_name: null,
                })),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);
