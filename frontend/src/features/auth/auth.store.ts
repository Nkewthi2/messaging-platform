import { create } from "zustand";
import { setAuthToken } from "../../services/api/client";

type AuthStore = {
  token: string | null;
  setToken: (token: string | null) => void;
};

const initial = (() => {
  try {
    const t = localStorage.getItem("token");
    if (t) return t;
  } catch (e) {
    // ignore
  }
  return null;
})();

export const useAuthStore = create<AuthStore>((set) => ({
  token: initial,

  setToken: (token) => {
    try {
      if (token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
      } else {
        localStorage.removeItem("token");
        setAuthToken(undefined);
      }
    } catch (e) {
      // ignore
    }

    set({ token });
  },
}));