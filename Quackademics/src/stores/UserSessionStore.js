import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserSessionStore = create(
  persist(
    (set) => ({
      userId: null,
      setUserId: (userId) => set(() => ({ userId: userId })),

      username: null,
      setUsername: (username) => set(() => ({ username: username })),

      profilePicture: null,
      setProfilePicture: (profilePicture) =>
        set(() => ({ profilePicture: profilePicture })),

      loginSuccess: false,
      setLoginSuccess: (loginSuccess) =>
        set(() => ({ loginSuccess: loginSuccess })),
    }),
    {
      name: "user-session-store",
      getStorage: () => localStorage,
    },
  ),
);
