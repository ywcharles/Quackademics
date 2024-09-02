import { create } from "zustand";

export const useUserSessionStore = create((set) => ({
  userId: null,
  setUserId: (userId) => set(() => ({ userId: userId })),
}));
