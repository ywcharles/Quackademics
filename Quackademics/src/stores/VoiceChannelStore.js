import { create } from "zustand";

export const useVoiceChannelStore = create((set) => ({
  serverName: "none",
  setServerName: (serverName) => set({ serverName }),
}));
