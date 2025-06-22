import React from "react";
import { Trophy, Medal, Award, Star, User, MapPin, Eye } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";
import { extractTextContent } from "@/utils/Helper";

interface WinnerCardProps {
  entry: any;
  index: number;
  isActive: boolean;
  onOpenPopup: (entry: any) => void;
}

const getRankIcon = (rank: string | null) => {
  const iconProps = { className: "w-3 h-3 md:w-4 md:h-4" };
  const normalized = rank?.toUpperCase().trim();

  switch (normalized) {
    case "FIRST": return <Trophy {...iconProps} />;
    case "SECOND":
    case "THIRD": return <Medal {...iconProps} />;
    case "FOURTH":
    case "FIFTH": return <Star {...iconProps} />;
    default: return <Award {...iconProps} />;
  }
};

const getRankDisplayName = (rank: string | null, index: number) => {
  const normalized = rank?.toUpperCase().trim();
  const names: Record<string, string> = {
    FIRST: "1st Place",
    SECOND: "2nd Place",
    THIRD: "3rd Place",
    FOURTH: "4th Place",
    FIFTH: "5th Place",
  };
  return names[normalized || ""] || `${index + 1}${getOrdinalSuffix(index + 1)}`;
};

const getRankColors = (rank: string | null) => {
  const normalized = rank?.toUpperCase().trim();
  switch (normalized) {
    case "FIRST": return { bg: "#D4AF37", text: "#FFFFFF" };
    case "SECOND": return { bg: "#C0C0C0", text: "#FFFFFF" };
    case "THIRD": return { bg: "#CD7F32", text: "#FFFFFF" };
    case "FOURTH": return { bg: dashboardTheme.colors.info, text: "#FFFFFF" };
    case "FIFTH": return { bg: dashboardTheme.colors.success, text: "#FFFFFF" };
    default: return { bg: dashboardTheme.colors.accent, text: dashboardTheme.colors.activeText };
  }
};

const getOrdinalSuffix = (num: number) => {
  const j = num % 10, k = num % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
};

const WinnerCard: React.FC<WinnerCardProps> = ({ entry, index, onOpenPopup }) => {
  const text = extractTextContent(entry.content);
  const preview = text.length > 100 ? text.substring(0, 100) + "..." : text;
  const rankColors = getRankColors(entry.spotlight_rank);

  return (
    <div
      className="relative cursor-pointer group w-full md:w-auto md:flex-1 h-[400px] transition-transform duration-200 hover:scale-[1.02]"
      onClick={() => onOpenPopup(entry)}
    >
      <div
        className="w-full h-full rounded-xl overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: dashboardTheme.colors.cardBg,
          border: `1px solid ${dashboardTheme.colors.cardBorder}`,
          boxShadow: dashboardTheme.colors.cardShadow,
        }}
      >
        <div className="absolute top-3 left-3 z-20">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-semibold text-xs transition-transform duration-200 hover:scale-105"
            style={{ backgroundColor: rankColors.bg, color: rankColors.text }}
          >
            {getRankIcon(entry.spotlight_rank)}
            <span className="font-bold">{getRankDisplayName(entry.spotlight_rank, index)}</span>
          </div>
        </div>

        {entry.genre && (
          <div className="absolute top-3 right-3 z-20">
            <span className="px-2.5 py-1 rounded-full text-xs font-medium" style={{
              backgroundColor: dashboardTheme.colors.parchment,
              color: dashboardTheme.colors.textSecondary,
              border: `1px solid ${dashboardTheme.colors.borderLight}`,
            }}>
              {entry.genre}
            </span>
          </div>
        )}

        <div className="p-4 h-full flex flex-col">
          <div className="mt-8 mb-3">
            <h3 className="text-lg font-bold leading-tight line-clamp-2 group-hover:opacity-80 transition-opacity" style={{
              color: dashboardTheme.colors.textPrimary,
              fontFamily: dashboardTheme.fonts.heading,
            }}>
              {entry.title}
            </h3>
          </div>

          <div className="flex items-center justify-between mb-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: dashboardTheme.colors.accent }}>
                <User className="w-3 h-3" style={{ color: dashboardTheme.colors.activeText }} />
              </div>
              <span className="font-medium text-sm truncate" style={{ color: dashboardTheme.colors.textPrimary }}>
                {entry.author_name}
              </span>
            </div>
            {entry.city && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <MapPin className="w-3 h-3" style={{ color: dashboardTheme.colors.textTertiary }} />
                <span className="text-xs" style={{ color: dashboardTheme.colors.textTertiary }}>
                  {entry.city}
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 mb-4">
            <div className="p-3 rounded-lg h-full flex flex-col justify-between min-h-[160px]" style={{
              backgroundColor: dashboardTheme.colors.parchment,
              border: `1px solid ${dashboardTheme.colors.borderLight}`,
            }}>
              <p className="text-sm leading-relaxed flex-1" style={{
                color: dashboardTheme.colors.textSecondary,
                fontFamily: dashboardTheme.fonts.body,
                display: '-webkit-box',
                WebkitLineClamp: 6,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>
                {preview}
              </p>
              <div className="flex items-center gap-2 text-xs font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Eye className="w-3 h-3" style={{ color: dashboardTheme.colors.accent }} />
                <span style={{ color: dashboardTheme.colors.accent }}>Read Full Story</span>
              </div>
            </div>
          </div>

          {entry.judge_notes && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{
              backgroundColor: `${dashboardTheme.colors.warning}15`,
              border: `1px solid ${dashboardTheme.colors.warning}30`,
            }}>
              <Star className="w-3 h-3" style={{ color: dashboardTheme.colors.warning }} />
              <span className="text-xs font-medium" style={{ color: dashboardTheme.colors.warning }}>
                Note Available
              </span>
            </div>
          )}
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
          style={{
            background: `linear-gradient(to top, ${dashboardTheme.colors.accent}08, transparent)`,
          }}
        />
      </div>
    </div>
  );
};

export default WinnerCard;