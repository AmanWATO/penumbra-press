import React from "react";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";

export const NoEntriesMessage: React.FC = () => {
  return (
    <motion.div
      className="text-center py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-6xl mb-4">📝</div>
      <h3
        className="text-2xl font-bold mb-2"
        style={{ color: dashboardTheme.colors.textPrimary }}
      >
        No Entries Yet
      </h3>
      <p style={{ color: dashboardTheme.colors.textSecondary }}>
        No entries found for this Week. Check back later!
      </p>
    </motion.div>
  );
};