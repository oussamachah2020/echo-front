import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  accessToken: string | null;
  setAccessToken: (value: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (value) => set({ accessToken: value }),
      logout: () => set({ accessToken: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);
