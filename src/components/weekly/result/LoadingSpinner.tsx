import React from "react";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";

export const LoadingSpinner: React.FC = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: dashboardTheme.colors.primary }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div
          className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-4"
          style={{ borderColor: dashboardTheme.colors.accent }}
        />
        <p
          className="text-lg"
          style={{ color: dashboardTheme.colors.textSecondary }}
        >
          Loading contest results...
        </p>
      </motion.div>
    </div>
  );
};