"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { Plus, FileText } from "lucide-react";

export default function SubmissionsPage() {
  const router = useRouter();
  const hasSubmissions = false; // This would come from your state/API

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: dashboardTheme.animation.ease }}
        className="px-4 sm:px-6 lg:px-8 py-6 max-md:py-5"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8 text-center sm:text-left"
        >
          <h1
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{
              fontFamily: dashboardTheme.fonts.heading,
              color: dashboardTheme.colors.textPrimary,
            }}
          >
            Your Submissions
          </h1>
          <p
            className="text-base sm:text-lg"
            style={{
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body,
            }}
          >
            Manage your contest entries and track their status
          </p>
        </motion.div>

        {!hasSubmissions ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative overflow-hidden text-center px-5 py-5 sm:px-6 lg:px-8 sm:py-6 lg:py-8"
            style={{
              backgroundColor: dashboardTheme.colors.cardBg,
              border: `1px solid ${dashboardTheme.colors.cardBorder}`,
              borderRadius: dashboardTheme.radius.xl,
              boxShadow: dashboardTheme.colors.cardShadow,
            }}
          >
            {/* Background decoration */}
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                background: dashboardTheme.colors.subtleGradient,
                opacity: 0.3,
              }}
            />

            {/* Floating icon */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -5, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-20"
            >
              <FileText
                size={28}
                className="sm:size-8"
                style={{ color: dashboardTheme.colors.accent }}
              />
            </motion.div>

            <div className="relative z-10">
              {/* Center icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="mb-4 sm:mb-6"
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${dashboardTheme.colors.accent}20 0%, ${dashboardTheme.colors.accentLight}20 100%)`,
                  }}
                >
                  <FileText
                    size={32}
                    className="sm:size-10"
                    style={{ color: dashboardTheme.colors.accent }}
                  />
                </div>
              </motion.div>

              {/* Text */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-xl sm:text-2xl font-semibold mb-4"
                style={{
                  fontFamily: dashboardTheme.fonts.heading,
                  color: dashboardTheme.colors.textPrimary,
                }}
              >
                No Submissions Yet
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-base sm:text-lg mb-8 px-4 sm:px-8"
                style={{
                  color: dashboardTheme.colors.textSecondary,
                  fontFamily: dashboardTheme.fonts.body,
                  lineHeight: "1.6",
                }}
              >
                Ready to share your literary masterpiece? Start by adding your
                first submission to the Penumbra Writing Contest.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: dashboardTheme.colors.accent,
                    color: dashboardTheme.colors.activeText,
                    border: "none",
                    borderRadius: dashboardTheme.radius.md,
                    fontFamily: dashboardTheme.fonts.body,
                    boxShadow: dashboardTheme.components.button.primary.shadow,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      dashboardTheme.colors.accentDark;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(139, 110, 87, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      dashboardTheme.colors.accent;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      dashboardTheme.components.button.primary.shadow;
                  }}
                  onClick={() =>
                    router.push("/penumbra-dashboard/submissions/guidelines")
                  }
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Plus size={20} />
                    Add Your Submission
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <div>{/* Submissions list would go here */}</div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
