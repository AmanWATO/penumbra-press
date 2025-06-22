import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import { WeekData } from "@/types/weekly-challenge";
import { dashboardTheme } from "@/styles/theme";
import Link from "next/link";

interface WeeklyChallengeHeaderProps {
  currentWeek: WeekData;
}

const WeeklyChallengeHeader: React.FC<WeeklyChallengeHeaderProps> = ({
  currentWeek,
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="border-b backdrop-blur-sm"
      style={{
        backgroundColor: dashboardTheme.colors.cardBg,
        borderColor: dashboardTheme.colors.border,
        boxShadow: dashboardTheme.colors.cardShadow,
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-4 py-4 sm:py-6">
        <div className="flex max-md:flex-col max-md:items-start max-md:w-full flex-row items-center justify-between gap-4">
          <motion.div
            className="flex items-center space-x-3 max-md:space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-lg flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Trophy className="w-6 h-6 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            <div>
              <h1
                className="text-xl sm:text-2xl lg:text-3xl font-bold"
                style={{
                  color: dashboardTheme.colors.textPrimary,
                  fontFamily: dashboardTheme.fonts.heading,
                }}
              >
                Ink Rite Banner
              </h1>
              <p
                className="text-xs sm:text-sm mt-1 opacity-80"
                style={{
                  color: dashboardTheme.colors.textSecondary,
                  fontFamily: dashboardTheme.fonts.body,
                }}
              >
                Penumbra Prologue Contest
              </p>
            </div>
          </motion.div>

          <motion.div
            className="text-right max-md:text-right max-md:self-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p
              className="font-medium text-sm sm:text-base"
              style={{
                color: dashboardTheme.colors.accent,
                fontFamily: dashboardTheme.fonts.accent,
              }}
            >
              {currentWeek.week}
            </p>
            <p
              className="text-xs sm:text-sm mt-1 opacity-80 italic"
              style={{
                color: dashboardTheme.colors.textSecondary,
                fontFamily: dashboardTheme.fonts.body,
              }}
            >
              Max 3 entries per participant
            </p>
          </motion.div>
        </div>

        <motion.div
          className="mt-4 flex max-md:w-full max-md:justify-end sm:justify-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/weekly-results">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className=" text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold shadow-sm transition-colors flex items-center gap-1 cursor-pointer"
              style={{
                fontFamily: dashboardTheme.fonts.accent,
                backgroundColor: dashboardTheme.colors.error,
              }}
            >
              <span>View Weekly Results</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default WeeklyChallengeHeader;
