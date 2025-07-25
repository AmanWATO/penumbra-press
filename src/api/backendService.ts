import axios from "axios";

const API_BASE_URL = "https://api.penumbrapenned.com/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to safely access localStorage
const getStoredToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

// Helper function to safely set localStorage
const setStoredToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
};

// Helper function to safely remove from localStorage
const removeStoredToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
  }
};

api.interceptors.request.use(
  (config) => {
    const token = getStoredToken();
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
      removeStoredToken();
      if (typeof window !== "undefined") {
        window.location.href = "/login-to-penumbra";
      }
    }
    return Promise.reject(error);
  }
);

interface AuthResponse {
  token: string;
  authorId: string; // Backend returns authorId, not user object
}

interface User {
  authorId: string;
  email: string;
  username: string;
  createdAt: string;
  phone: string;
  writingSlots: number;
  Purchase: {
    plan: "STANDARD" | "EARLY_BIRD" | "PENUMBRA_PRISM";
    status: "PENDING" | "SUCCESS"
  }[];
}

interface Submission {
  id: number;
  title: string;
  content: string;
  genre: string;
  plan: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface CreateSubmissionDto {
  title: string;
  content: string;
  genre: string;
}

interface UpdateSubmissionDto {
  title?: string;
  content?: string;
  genre?: string;
}

interface SubmissionResponse {
  submissions: Submission[];
  plan: "STANDARD" | "EARLY_BIRD" | "PENUMBRA_PRISM" | null;
  writingSlots: number;
}

export const signUp = async (
  email: string,
  password: string,
  username: string,
  phone: string
): Promise<{ error?: string; token?: string; authorId?: string }> => {
  try {
    const response = await api.post<AuthResponse>("penumbra/register", {
      username,
      email,
      password,
      phone,
    });

    const { token, authorId } = response.data;

    setStoredToken(token);
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
    const response = await api.post<AuthResponse>("penumbra/login", {
      email,
      password,
    });

    const { token, authorId } = response.data;

    setStoredToken(token);
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
    const response = await api.get<User>("penumbra/user");
    const user = response.data;

    console.log({ user });

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
  removeStoredToken();
  if (typeof window !== "undefined") {
    window.location.href = "/login-to-penumbra";
  }
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

export const isAuthenticated = (): boolean => {
  return !!getStoredToken();
};

export const createSubmission = async (
  submissionData: CreateSubmissionDto
): Promise<{ error?: string; submission?: Submission }> => {
  try {
    const response = await api.post<Submission>("submissions", submissionData);
    return { submission: response.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to create submission";
    return { error: errorMessage };
  }
};

export const updateSubmission = async (
  id: number,
  updateData: UpdateSubmissionDto
): Promise<{ error?: string; submission?: Submission }> => {
  try {
    const response = await api.patch<Submission>(
      `submissions/${id}`,
      updateData
    );
    return { submission: response.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to update submission";
    return { error: errorMessage };
  }
};

export const getSubmissions = async (): Promise<{
  error?: string;
  data?: SubmissionResponse;
}> => {
  try {
    const response = await api.get<SubmissionResponse>("submissions");
    return { data: response.data };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch submissions";
    return { error: errorMessage };
  }
};

// Export the safe localStorage functions for use elsewhere
export { getStoredToken, setStoredToken, removeStoredToken };

export default api;