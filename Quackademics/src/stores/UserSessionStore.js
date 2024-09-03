import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserSessionStore = create(
  persist(
    (set) => ({
      userId: null,
      setUserId: (userId) => set(() => ({ userId: userId })),
    }),
    {
      name: "user-session-store", 
      getStorage: () => localStorage, 
    }
  )
);
