import React from "react";
import { motion } from "framer-motion";
import { MapPin, Eye, EyeOff } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";
import { extractTextContent } from "@/utils/Helper";
import { getRankCardStyle, getRankDisplayName, getRankIcon, truncateText } from "@/utils/cardUtils";

interface WinnerCardProps {
  entry: any;
  index: number;
  isExpanded: boolean;
  onToggleExpansion: (id: number) => void;
}

export const WinnerCard: React.FC<WinnerCardProps> = ({
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
      className="p-6 transition-all duration-300 hover:scale-105"
      style={getRankCardStyle(index)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center space-x-2 mb-4">
        {getRankIcon(entry.spotlight_rank)}
        <span
          className="font-bold text-lg"
          style={{ color: dashboardTheme.colors.textPrimary }}
        >
          {getRankDisplayName(entry.spotlight_rank, index)}
        </span>
      </div>

      <h3
        className="text-xl font-bold mb-3"
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
          backgroundColor: `${dashboardTheme.colors.accent}20`,
          color: dashboardTheme.colors.accent,
        }}
      >
        {entry.genre}
      </span>

      <div className="mb-4">
        <p
          className="leading-relaxed whitespace-pre-wrap"
          style={{ color: dashboardTheme.colors.textSecondary }}
        >
          {displayContent}
        </p>

        {plainTextContent.length > 200 && (
          <button
            onClick={() => onToggleExpansion(entry.id)}
            className="mt-3 flex items-center space-x-1 text-sm font-medium"
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
      </div>

      {entry.judge_notes && (
        <div
          className="border-t pt-4"
          style={{ borderColor: dashboardTheme.colors.border }}
        >
          <h4
            className="font-semibold mb-2"
            style={{ color: dashboardTheme.colors.accent }}
          >
            Notes:
          </h4>
          <p
            className="text-sm italic"
            style={{ color: dashboardTheme.colors.textTertiary }}
          >
            {extractTextContent(entry.judge_notes)}
          </p>
        </div>
      )}
    </motion.div>
  );
};