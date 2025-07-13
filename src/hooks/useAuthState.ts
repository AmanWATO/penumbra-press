import {
  getCurrentUser,
  getStoredToken,
  getStoredUser,
} from "@/api/backendService";
import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  username: string;
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

        const storedUser = getStoredUser();
        if (storedUser) {
          setUser(storedUser);

          // Verify token is still valid by fetching fresh user data
          const { user: freshUser, error } = await getCurrentUser();
          if (error) {
            // Token is invalid, clear everything
            setUser(null);
          } else if (freshUser) {
            // Update with fresh user data
            setUser(freshUser);
          }
        } else {
          // No stored user, try to fetch from API
          const { user: apiUser, error } = await getCurrentUser();
          if (error) {
            setUser(null);
          } else if (apiUser) {
            setUser(apiUser);
          }
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
      if (e.key === "auth_token" || e.key === "user_data") {
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
