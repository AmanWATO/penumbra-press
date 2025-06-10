/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import useAuthState from "@/hooks/useAuthState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PropsWithChildren } from "react";
import { dashboardTheme } from "@/styles/theme";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { user, loading } = useAuthState();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login-to-penumbra");
    }
  }, [loading, user]);

  if (loading || !user) {
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
              borderTopColor: dashboardTheme.colors.accent 
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm"
            style={{ 
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body 
            }}
          >
            Loading your dashboard...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
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
        
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
            transition={{ 
              duration: parseFloat(dashboardTheme.animation.slow), 
              ease: dashboardTheme.animation.ease,
              filter: { duration: parseFloat(dashboardTheme.animation.medium) }
            }}
            className="relative z-10 min-h-screen"
            style={{ 
              padding: dashboardTheme.spacing.xl,
              fontFamily: dashboardTheme.fonts.body,
              color: dashboardTheme.colors.textPrimary
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.1, 
                duration: parseFloat(dashboardTheme.animation.medium) 
              }}
            >
              {children}
            </motion.div>
          </motion.main>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}