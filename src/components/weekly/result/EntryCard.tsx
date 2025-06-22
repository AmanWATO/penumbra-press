import React from "react";
import { motion } from "framer-motion";
import { MapPin, Eye, EyeOff } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";
import { extractTextContent } from "@/utils/Helper";
import { truncateText } from "@/utils/cardUtils";

interface EntryCardProps {
  entry: any;
  index: number;
  isExpanded: boolean;
  onToggleExpansion: (id: number) => void;
}

export const EntryCard: React.FC<EntryCardProps> = ({
  entry,
  index,
  isExpanded,
  onToggleExpansion,
}) => {
  const plainTextContent = extractTextContent(entry.content);
  const displayContent = isExpanded
    ? plainTextContent
    : truncateText(entry.content);

  return (
    <motion.div
      className="p-6 rounded-xl transition-all duration-300 hover:scale-105"
      style={{
        backgroundColor: dashboardTheme.colors.cardBg,
        border: `1px solid ${dashboardTheme.colors.cardBorder}`,
        boxShadow: dashboardTheme.colors.cardShadow,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <h3
        className="text-lg font-bold mb-3"
        style={{ color: dashboardTheme.colors.textPrimary }}
      >
        {entry.title}
      </h3>

      <div className="flex items-center space-x-4 mb-4 text-sm">
        <span
          className="font-medium"
          style={{ color: dashboardTheme.colors.textSecondary }}
        >
          by {entry.author_name}
        </span>
        <div className="flex items-center space-x-1">
          <MapPin
            className="w-4 h-4"
            style={{ color: dashboardTheme.colors.textTertiary }}
          />
          <span
            style={{ color: dashboardTheme.colors.textTertiary }}
          >
            {entry.city}
          </span>
        </div>
      </div>

      <span
        className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4"
        style={{
          backgroundColor: `${dashboardTheme.colors.textTertiary}20`,
          color: dashboardTheme.colors.textSecondary,
        }}
      >
        {entry.genre}
      </span>

      <p
        className="leading-relaxed text-sm mb-4"
        style={{ color: dashboardTheme.colors.textSecondary }}
      >
        {displayContent}
      </p>

      {plainTextContent.length > 200 && (
        <button
          onClick={() => onToggleExpansion(entry.id)}
          className="flex items-center space-x-1 text-sm font-medium"
          style={{ color: dashboardTheme.colors.accent }}
        >
          {isExpanded ? (
            <>
              <EyeOff className="w-4 h-4" />
              <span>Show Less</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span>Read More</span>
            </>
          )}
        </button>
      )}
    </motion.div>
  );
};