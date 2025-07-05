import React from "react";
import { motion } from "framer-motion";
import { dashboardTheme, fonts } from "@/styles/theme";

export const ContestHeader: React.FC = () => {
  return (
    <motion.div
      className="text-center mb-12 max-md:mb-8 px-4 max-md:px-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1
        className="text-4xl max-md:text-2xl font-bold mb-4"
        style={{
          color: dashboardTheme.colors.textPrimary,
          fontFamily: fonts.heading,
        }}
      >
        Weekly Contest Results
      </h1>
      <span
        className="px-6 py-2 max-md:px-4 rounded-lg max-md:text-base font-semibold text-lg inline-block"
        style={{
          backgroundColor: dashboardTheme.colors.accent,
          color: dashboardTheme.colors.activeText,
          fontFamily: fonts.serifAlt,
        }}
      >
        Week 1
      </span>
      <p
        className="mt-2 text-sm font-medium"
        style={{
          color: dashboardTheme.colors.textSecondary,
          fontFamily: fonts.playful,
        }}
      >
        Jun 10 – Jun 16
      </p>
    </motion.div>
  );
};
