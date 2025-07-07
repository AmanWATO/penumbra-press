import React from "react";
import { motion } from "framer-motion";
import { dashboardTheme, fonts } from "@/styles/theme";

interface ContestHeaderProps {
  currentWeek: 1 | 2 | 3;
  onWeekChange: (week: number) => void;
}

const weekInfo = {
  1: {
    display: "Week 1",
    dates: "Jun 10 – Jun 16 (2025)",
  },
  2: {
    display: "Week 2",
    dates: "Jun 17 – Jun 23 (2025)",
  },
  3: {
    display: "Week 3",
    dates: "Jun 24 – Jul 7 (2025)",
  },
} as const;

export const ContestHeader: React.FC<ContestHeaderProps> = ({
  currentWeek,
  onWeekChange,
}) => {
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

      {/* Week Selector */}
      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3].map((week) => (
          <button
            key={week}
            onClick={() => onWeekChange(week)}
            className={`px-4 py-2 max-md:px-3 max-md:py-1.5 rounded-lg font-semibold text-sm max-md:text-xs transition-all duration-200 ${
              currentWeek === week
                ? "transform scale-105"
                : "hover:transform hover:scale-102 opacity-70 hover:opacity-90"
            }`}
            style={{
              backgroundColor:
                currentWeek === week
                  ? dashboardTheme.colors.accent
                  : dashboardTheme.colors.cardBg,
              color:
                currentWeek === week
                  ? dashboardTheme.colors.activeText
                  : dashboardTheme.colors.textSecondary,
              fontFamily: fonts.serifAlt,
              border:
                currentWeek === week
                  ? `2px solid ${dashboardTheme.colors.accent}`
                  : `2px solid transparent`,
            }}
          >
            Week {week}
          </button>
        ))}
      </div>

      {/* Current Week Display */}
      

      <p
        className="mt-2 text-sm font-medium"
        style={{
          color: dashboardTheme.colors.textSecondary,
          fontFamily: fonts.playful,
        }}
      >
        {weekInfo[currentWeek].dates}
      </p>
    </motion.div>
  );
};
