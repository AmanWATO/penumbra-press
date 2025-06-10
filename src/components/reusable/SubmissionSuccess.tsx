import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Theme } from "@/types/weekly-challenge";
import { dashboardTheme } from "@/styles/theme";

interface SubmissionSuccessProps {
  selectedTheme: Theme;
  onBack: () => void;
}

export const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({
  selectedTheme,
  onBack,
}) => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: dashboardTheme.colors.primary }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="max-w-md w-full text-center p-8 rounded-2xl shadow-xl"
        style={{
          backgroundColor: dashboardTheme.colors.cardBg,
          boxShadow: dashboardTheme.colors.cardShadow,
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <CheckCircle
            className="w-16 h-16 mx-auto mb-6"
            style={{ color: dashboardTheme.colors.success }}
          />
        </motion.div>

        <motion.h2
          className="text-2xl font-bold mb-4"
          style={{
            color: dashboardTheme.colors.textPrimary,
            fontFamily: dashboardTheme.fonts.heading,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Submission Successful!
        </motion.h2>

        <motion.p
          className="mb-8"
          style={{
            color: dashboardTheme.colors.textSecondary,
            fontFamily: dashboardTheme.fonts.body,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {`Thank you for your submission to "${selectedTheme.title}". 
          We'll review your entry and announce winners soon!`}
        </motion.p>

        <motion.button
          onClick={onBack}
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300"
          style={{
            backgroundColor: dashboardTheme.colors.accent,
            color: "white",
            fontFamily: dashboardTheme.fonts.accent,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Submit Another Entry
        </motion.button>
      </motion.div>
    </motion.div>
  );
};