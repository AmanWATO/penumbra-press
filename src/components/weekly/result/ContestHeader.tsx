import React from "react";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";

export const ContestHeader: React.FC = () => {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1
        className="text-4xl font-bold mb-4"
        style={{ color: dashboardTheme.colors.textPrimary }}
      >
        Weekly Contest Results
      </h1>
      <span
        className="px-6 py-2 rounded-lg font-semibold text-lg"
        style={{
          backgroundColor: dashboardTheme.colors.accent,
          color: dashboardTheme.colors.activeText,
        }}
      >
        Week 1
      </span>
    </motion.div>
  );
};