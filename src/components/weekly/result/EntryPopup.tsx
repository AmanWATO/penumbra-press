import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";
import { extractTextContent } from "@/utils/Helper";
import { WeeklyContestEntry } from "@/api/apiTypes";

interface EntryPopupProps {
  entry: WeeklyContestEntry;
  onClose: () => void;
  
}

export const EntryPopup: React.FC<EntryPopupProps> = ({ entry, onClose }) => {
  const plainTextContent = extractTextContent(entry.content);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 max-md:p-5"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 max-md:p-4"
          style={{
            backgroundColor: dashboardTheme.colors.cardBg,
            border: `1px solid ${dashboardTheme.colors.cardBorder}`,
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Close Button */}
          <div className="flex justify-between items-start mb-1 max-md:mb-0">
            <h1
              className="text-3xl max-md:text-2xl font-bold pr-4"
              style={{ color: dashboardTheme.colors.textPrimary }}
            >
              {entry.title}
            </h1>
            <button
              onClick={onClose}
              className="p-2 rounded-full cursor-pointer hover:bg-opacity-20 transition-colors"
              style={{ 
                backgroundColor: `${dashboardTheme.colors.textTertiary}10`,
                color: dashboardTheme.colors.textSecondary 
              }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Author Name */}
          <div className="mb-4">
            <span
              className="text-lg font-medium"
              style={{ color: dashboardTheme.colors.textSecondary }}
            >
              by {entry.author_name}
            </span>
          </div>

          {/* Content */}
          <div className="mb-6">
            <div
              className="prose prose-lg max-w-none whitespace-pre-wrap"
              style={{ color: dashboardTheme.colors.textSecondary }}
            >
              {plainTextContent}
            </div>
          </div>

          {/* Judge's Note (if available) */}
          {entry.judge_notes && (
            <div
              className="border-t pt-4"
              style={{ borderColor: dashboardTheme.colors.cardBorder }}
            >
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: dashboardTheme.colors.textPrimary }}
              >
                Note:
              </h3>
              <div
                className="p-4 max-md:p-3 rounded-lg"
                style={{ 
                  backgroundColor: `${dashboardTheme.colors.accent}10`,
                  border: `1px solid ${dashboardTheme.colors.accent}30`
                }}
              >
                <p
                  className="leading-relaxed max-md:leading-[140%] max-md:text-sm"
                  style={{ color: dashboardTheme.colors.textSecondary }}
                >
                  {entry.judge_notes}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};