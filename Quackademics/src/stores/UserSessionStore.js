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

      bio: "",
      setBio: (bio) => set(() => ({ bio: bio })),

      study: "",
      setStudy: (study) => set(() => ({ study: study })),

      startYear: "",
      setStartYear: (startYear) => set(() => ({ startYear: startYear })),

      graduationYear: "",
      setGraduationYear: (graduationYear) =>
        set(() => ({ graduationYear: graduationYear })),

      loginSuccess: false,
      setLoginSuccess: (loginSuccess) =>
        set(() => ({ loginSuccess: loginSuccess })),

      showWelcome: false,
      setShowWelcome: (showWelcome) =>
        set(() => ({ showWelcome: showWelcome })),
    }),
    {
      name: "user-session-store",
      getStorage: () => localStorage,
    },
  ),
);
