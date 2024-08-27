import { create } from "zustand";

export const useThemeMode = create((set) => ({
  themeMode: "",
  setThemeMode: (themeMode) => set({ themeMode }),
}));
