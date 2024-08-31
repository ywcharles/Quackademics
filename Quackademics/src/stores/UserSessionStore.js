import { create } from "zustand";

export const useUserSessionStore = create((set) => ({
  userId: "",
  setUserId: (userId) => set(() => ({ userId: userId })),
}));
