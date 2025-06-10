import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Theme } from "@/types/weekly-challenge";
import { dashboardTheme } from "@/styles/theme";

interface ThemeCardProps {
  theme: Theme;
  index: number;
  onSelect: (theme: Theme) => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, index, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer h-full"
      onClick={() => onSelect(theme)}
    >
      <motion.div
        className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border h-full flex flex-col"
        style={{
          borderColor: dashboardTheme.colors.border,
          boxShadow: dashboardTheme.colors.cardShadow,
        }}
        whileHover={{
          boxShadow: dashboardTheme.colors.cardHover,
        }}
      >
        {/* Icon */}
        <motion.div
          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r ${theme.color} flex items-center justify-center mb-6 mx-auto shadow-lg`}
          whileHover={{
            scale: 1.1,
            rotate: 10,
            transition: { type: "spring", stiffness: 300 },
          }}
        >
          <span className="text-2xl sm:text-3xl">{theme.icon}</span>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="text-xl sm:text-2xl font-bold mb-4 text-center"
          style={{
            color: dashboardTheme.colors.textPrimary,
            fontFamily: dashboardTheme.fonts.heading,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        >
          {theme.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-center mb-6 flex-grow"
          style={{
            color: dashboardTheme.colors.textSecondary,
            fontFamily: dashboardTheme.fonts.body,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        >
          {theme.description}
        </motion.p>

        {/* Prompt */}
        <motion.div
          className="rounded-lg p-4 mb-6"
          style={{ backgroundColor: dashboardTheme.colors.parchment }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
        >
          <p
            className="text-sm font-medium mb-2"
            style={{
              color: dashboardTheme.colors.textPrimary,
              fontFamily: dashboardTheme.fonts.accent,
            }}
          >
            Writing Prompt:
          </p>
          <p
            className="text-sm italic leading-relaxed"
            style={{
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body,
            }}
          >
            {`"${theme.prompt}"`}
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex items-center justify-center mt-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
        >
          <motion.div
            className="flex items-center group-hover:translate-x-2 transition-transform duration-300"
            whileHover={{ x: 4 }}
          >
            <span
              className="font-medium mr-2 text-sm sm:text-base"
              style={{
                color: dashboardTheme.colors.accent,
                fontFamily: dashboardTheme.fonts.accent,
              }}
            >
              Choose This Theme
            </span>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight
                className="w-4 h-4 sm:w-5 sm:h-5"
                style={{ color: dashboardTheme.colors.accent }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeCard;
