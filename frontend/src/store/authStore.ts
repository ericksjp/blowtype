import { create } from "zustand";
import {
  authAPI,
  type User,
  type LoginData,
  type RegisterData,
} from "../services/api";
import { toast } from "react-toastify";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  initializeAuth: () => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        set({
          user,
          token,
          isAuthenticated: true,
        });
      } catch (error) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    }
  },

  login: async (data: LoginData) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.login(data);

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });

      toast.success("Login successful!");
      return true;
    } catch (error: any) {
      const message = error.response?.data?.error || "Login failed";
      toast.error(message);
      set({ isLoading: false });
      return false;
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.register(data);

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      set({
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });

      toast.success("Registration successful!");
      return true;
    } catch (error: any) {
      const message = error.response?.data?.error || "Registration failed";
      toast.error(message);
      set({ isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    toast.info("Logged out successfully");
  },

  clearError: () => {},
}));
