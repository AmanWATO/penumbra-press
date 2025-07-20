import axios from "axios";

const API_BASE_URL = "https://api.penumbrapenned.com/penumbra/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("auth_token");
      window.location.href = "/login-to-penumbra";
    }
    return Promise.reject(error);
  }
);

interface AuthResponse {
  token: string;
  authorId: string; // Backend returns authorId, not user object
}

interface User {
  authorId: string; // Changed from id to authorId to match backend
  email: string;
  username: string;
  createdAt: string;
}

export const signUp = async (
  email: string,
  password: string,
  username: string
): Promise<{ error?: string; token?: string; authorId?: string }> => {
  try {
    const response = await api.post<AuthResponse>("register", {
      username,
      email,
      password,
    });

    const { token, authorId } = response.data;

    sessionStorage.setItem("auth_token", token);
    // Only store token, not user data

    return { token, authorId };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Registration failed";
    return { error: errorMessage };
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<{ error?: string; token?: string; authorId?: string }> => {
  try {
    const response = await api.post<AuthResponse>("login", {
      email,
      password,
    });

    const { token, authorId } = response.data;

    sessionStorage.setItem("auth_token", token);
    // Only store token, not user data

    return { token, authorId };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Login failed";
    return { error: errorMessage };
  }
};

export const getCurrentUser = async (): Promise<{
  error?: string;
  user?: User;
}> => {
  try {
    const response = await api.get<User>("user");
    const user = response.data;

    return { user };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch user data";
    return { error: errorMessage };
  }
};

export const signOut = (): void => {
  sessionStorage.removeItem("auth_token");
  window.location.href = "/login-to-penumbra";
};

export const resetPassword = async (
  email: string
): Promise<{ error?: string; success?: boolean }> => {
  try {
    return { success: true };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Password reset failed";
    return { error: errorMessage };
  }
};

export const getStoredToken = (): string | null => {
  return sessionStorage.getItem("auth_token");
};

export const isAuthenticated = (): boolean => {
  return !!getStoredToken();
};

export default api;
