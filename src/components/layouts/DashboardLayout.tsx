"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import useAuthState from "@/hooks/useAuthState";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import { dashboardTheme } from "@/styles/theme";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { user, loading } = useAuthState();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle initial load
  useEffect(() => {
    if (!loading) {
      // Wait a bit to ensure auth state is settled
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Uncomment these if you want to enforce authentication
  useEffect(() => {
    if (!loading && !user && !isInitialLoad) {
      router.replace("/login-to-penumbra");
    }
  }, [loading, user, isInitialLoad]);

  // Only show loading screen on initial load, not on navigation
  if (isInitialLoad && loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: dashboardTheme.colors.primary }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full"
            style={{
              border: `2px solid ${dashboardTheme.colors.loading}`,
              borderTopColor: dashboardTheme.colors.accent,
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm"
            style={{
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body,
            }}
          >
            Loading your dashboard...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="flex min-h-screen overflow-hidden"
      style={{ backgroundColor: dashboardTheme.colors.primary }}
    >
      <Sidebar />
      <div className="flex-1 relative">
        {/* Subtle ambient background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: dashboardTheme.colors.subtleGradient }}
        />

        {/* Show a subtle loading indicator for subsequent auth checks */}
        {loading && !isInitialLoad && (
          <div
            className="absolute top-4 right-4 z-50 px-3 py-2 rounded-lg flex items-center gap-2"
            style={{
              background: dashboardTheme.colors.cardBg,
              border: `1px solid ${dashboardTheme.colors.cardBorder}`,
              boxShadow: dashboardTheme.colors.cardShadow,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 rounded-full"
              style={{
                border: `2px solid ${dashboardTheme.colors.loading}`,
                borderTopColor: dashboardTheme.colors.accent,
              }}
            />
            <span
              className="text-xs"
              style={{
                color: dashboardTheme.colors.textSecondary,
                fontFamily: dashboardTheme.fonts.body,
              }}
            >
              Checking...
            </span>
          </div>
        )}

        {/* Main content */}
        <main
          className="relative z-10 min-h-screen"
          style={{
            padding: isMobile
              ? `${dashboardTheme.spacing.lg} ${dashboardTheme.spacing.md}`
              : dashboardTheme.spacing.xl,
            paddingTop: isMobile ? "4rem" : dashboardTheme.spacing.xl,
            fontFamily: dashboardTheme.fonts.body,
            color: dashboardTheme.colors.textPrimary,
          }}
        >
          <div className="max-w-full">
            <div className={`${isMobile ? "space-y-4" : ""}`}>{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
