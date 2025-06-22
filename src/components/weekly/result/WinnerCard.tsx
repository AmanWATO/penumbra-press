import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy, Medal, Award, Star, User, MapPin } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";
import { extractTextContent } from "@/utils/Helper";

interface WinnerCardProps {
  entry: any;
  index: number;
  isActive: boolean;
}

interface WinnersSectionProps {
  winners: any[];
  expandedCards: Set<number>;
  onToggleExpansion: (id: number) => void;
}

const RANK_ORDER = ["FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH"];

const getRankIcon = (rank: string | null, index: number) => {
  const iconProps = { className: "w-4 h-4" };
  
  if (!rank) return <Award {...iconProps} />;
  
  const normalizedRank = String(rank).toUpperCase().trim();
  
  switch (normalizedRank) {
    case 'FIRST':
      return <Trophy {...iconProps} />;
    case 'SECOND':
    case 'THIRD':
      return <Medal {...iconProps} />;
    default:
      return <Star {...iconProps} />;
  }
};

const getRankDisplayName = (rank: string | null, index: number): string => {
  if (!rank) return `${index + 1}${getOrdinalSuffix(index + 1)} Place`;

  const normalizedRank = String(rank).toUpperCase().trim();
  const rankNames: { [key: string]: string } = {
    FIRST: "1st Place",
    SECOND: "2nd Place",
    THIRD: "3rd Place",
    FOURTH: "4th Place",
    FIFTH: "5th Place",
  };

  return rankNames[normalizedRank] || `${index + 1}${getOrdinalSuffix(index + 1)} Place`;
};

const getOrdinalSuffix = (num: number): string => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || "th";
};

const WinnerCard: React.FC<WinnerCardProps> = ({ entry, index, isActive }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const plainTextContent = extractTextContent(entry.content);
  const shouldTruncate = plainTextContent.length > 300;
  const displayContent = showFullContent || !shouldTruncate 
    ? plainTextContent 
    : plainTextContent.substring(0, 300) + "...";

  return (
    <motion.div
      className="flex-shrink-0 w-80 bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-300"
      style={{
        borderColor: dashboardTheme.colors.cardBorder,
        boxShadow: isActive ? dashboardTheme.colors.cardHover : dashboardTheme.colors.cardShadow,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Header with rank */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div 
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: dashboardTheme.colors.accent,
              color: dashboardTheme.colors.activeText
            }}
          >
            {getRankIcon(entry.spotlight_rank, index)}
            <span>{getRankDisplayName(entry.spotlight_rank, index)}</span>
          </div>
          
          {entry.genre && (
            <span 
              className="px-2 py-1 rounded text-xs font-medium"
              style={{ 
                backgroundColor: dashboardTheme.colors.tertiary,
                color: dashboardTheme.colors.textSecondary
              }}
            >
              {entry.genre}
            </span>
          )}
        </div>

        <h3 
          className="text-lg font-semibold mb-3 line-clamp-2"
          style={{ color: dashboardTheme.colors.textPrimary }}
        >
          {entry.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" style={{ color: dashboardTheme.colors.textTertiary }} />
            <span 
              className="text-sm font-medium"
              style={{ color: dashboardTheme.colors.textSecondary }}
            >
              {entry.author_name}
            </span>
          </div>
          
          {entry.city && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: dashboardTheme.colors.textTertiary }} />
              <span 
                className="text-sm"
                style={{ color: dashboardTheme.colors.textTertiary }}
              >
                {entry.city}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        <div 
          className="p-4 rounded-lg border"
          style={{ 
            backgroundColor: dashboardTheme.colors.secondary,
            borderColor: dashboardTheme.colors.borderLight
          }}
        >
          <p 
            className="text-sm leading-relaxed whitespace-pre-wrap"
            style={{ color: dashboardTheme.colors.textSecondary }}
          >
            {displayContent}
          </p>
          
          {shouldTruncate && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="mt-2 text-sm font-medium hover:underline transition-colors"
              style={{ color: dashboardTheme.colors.accent }}
            >
              {showFullContent ? "Show Less" : "Read More"}
            </button>
          )}
        </div>
      </div>

      {/* Judge Notes */}
      {entry.judge_notes && (
        <div className="px-6 pb-6">
          <div 
            className="p-3 rounded-lg border"
            style={{ 
              backgroundColor: dashboardTheme.colors.tertiary,
              borderColor: dashboardTheme.colors.borderLight
            }}
          >
            <h4 
              className="font-medium mb-1 text-sm"
              style={{ color: dashboardTheme.colors.textPrimary }}
            >
              Judge Notes:
            </h4>
            <p 
              className="text-xs italic"
              style={{ color: dashboardTheme.colors.textTertiary }}
            >
              {extractTextContent(entry.judge_notes)}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WinnerCard