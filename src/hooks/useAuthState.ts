import { getCurrentUser, getStoredToken } from "@/api/backendService";
import { useState, useEffect } from "react";

interface User {
  authorId: string; // Changed from id to authorId to match backend
  email: string;
  username: string;
  createdAt:string
}

export default function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = async () => {
      setLoading(true);

      try {
        const token = getStoredToken();

        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }

        // Always fetch fresh user data from API since we're not storing it
        const { user: apiUser, error } = await getCurrentUser();
        if (error) {
          // Token is invalid, clear everything
          setUser(null);
        } else if (apiUser) {
          setUser(apiUser);
        }
      } catch (error) {
        console.error("Auth state check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();

    // Listen for storage changes (for multi-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "auth_token") {
        checkAuthState();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { user, loading };
}
