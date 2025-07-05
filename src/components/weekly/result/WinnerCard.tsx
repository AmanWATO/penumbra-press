import React from "react";
import {
  Trophy,
  Medal,
  Award,
  Star,
  User,
  MapPin,
  Eye,
  Crown,
  Sparkles,
} from "lucide-react";
import { dashboardTheme, fonts } from "@/styles/theme";
import { extractTextContent } from "@/utils/Helper";
import { motion } from "framer-motion";

interface WinnerCardProps {
  entry: any;
  index: number;
  isActive: boolean;
  onOpenPopup: (entry: any) => void;
  isPodium?: boolean;
}

const getRankIcon = (rank: string | null) => {
  const iconProps = { className: "w-4 h-4 md:w-5 md:h-5" };
  const normalized = rank?.toUpperCase().trim();

  switch (normalized) {
    case "FIRST":
      return <Crown {...iconProps} />;
    case "SECOND":
      return <Medal {...iconProps} />;
    case "THIRD":
      return <Medal {...iconProps} />;
    case "FOURTH":
    case "FIFTH":
      return <Star {...iconProps} />;
    default:
      return <Award {...iconProps} />;
  }
};

const getRankDisplayName = (rank: string | null, index: number) => {
  const normalized = rank?.toUpperCase().trim();
  const names: Record<string, string> = {
    FIRST: "Champion",
    SECOND: "Runner-up",
    THIRD: "Third Place",
    FOURTH: "4th Place",
    FIFTH: "5th Place",
  };
  return (
    names[normalized || ""] || `${index + 1}${getOrdinalSuffix(index + 1)}`
  );
};

const getRankColors = (rank: string | null) => {
  const normalized = rank?.toUpperCase().trim();
  switch (normalized) {
    case "FIRST":
      return {
        bg: "linear-gradient(135deg, #FFD700, #FFA500)",
        text: "#FFFFFF",
        glow: "0 0 10px rgba(255, 215, 0, 0.2)",
      };
    case "SECOND":
      return {
        bg: "linear-gradient(135deg, #C0C0C0, #808080)",
        text: "#FFFFFF",
        glow: "0 0 10px rgba(192, 192, 192, 0.2)",
      };
    case "THIRD":
      return {
        bg: "linear-gradient(135deg, #CD7F32, #8B4513)",
        text: "#FFFFFF",
        glow: "0 0 10px rgba(205, 127, 50, 0.2)",
      };
    case "FOURTH":
      return {
        bg: `linear-gradient(135deg, ${dashboardTheme.colors.info}, #3B82F6)`,
        text: "#FFFFFF",
        glow: "0 0 10px rgba(59, 130, 246, 0.3)",
      };
    case "FIFTH":
      return {
        bg: `linear-gradient(135deg, ${dashboardTheme.colors.success}, #10B981)`,
        text: "#FFFFFF",
        glow: "0 0 10px rgba(16, 185, 129, 0.3)",
      };
    default:
      return {
        bg: `linear-gradient(135deg, ${dashboardTheme.colors.accent}, #8B5CF6)`,
        text: dashboardTheme.colors.activeText,
        glow: "0 0 10px rgba(139, 92, 246, 0.3)",
      };
  }
};

const getOrdinalSuffix = (num: number) => {
  const j = num % 10,
    k = num % 100;
  if (j === 1 && k !== 11) return "st";
  if (j === 2 && k !== 12) return "nd";
  if (j === 3 && k !== 13) return "rd";
  return "th";
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const hoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const WinnerCard: React.FC<WinnerCardProps> = ({
  entry,
  index,
  onOpenPopup,
  isPodium = false,
}) => {
  const text = extractTextContent(entry.content);
  const preview = text.length > 120 ? text.substring(0, 120) + "..." : text;
  const rankColors = getRankColors(entry.spotlight_rank);
  const isTopThree = index < 3;

  return (
    <motion.div
      className={`relative cursor-pointer group w-full ${
        isPodium ? "max-w-sm mx-auto" : ""
      } `}
      onClick={() => onOpenPopup(entry)}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <motion.div
        className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden relative"
        style={{
          backgroundColor: dashboardTheme.colors.cardBg,
          border: `2px solid ${
            isTopThree ? "transparent" : dashboardTheme.colors.cardBorder
          }`,
          background: isTopThree
            ? `linear-gradient(135deg, ${dashboardTheme.colors.cardBg}, ${dashboardTheme.colors.parchment})`
            : dashboardTheme.colors.cardBg,
          boxShadow: isTopThree
            ? `${dashboardTheme.colors.cardShadow}, ${rankColors.glow}`
            : dashboardTheme.colors.cardShadow,
        }}
        variants={hoverVariants}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${dashboardTheme.colors.accent}08, transparent, ${dashboardTheme.colors.accent}05)`,
          }}
        />

        <div className="absolute top-3 left-3 z-20">
          <motion.div
            className="flex items-center gap-[6px] px-3 py-2 max-md:gap-1 rounded-md font-bold text-sm shadow-lg"
            style={{
              background: rankColors.bg,
              color: rankColors.text,
              boxShadow: rankColors.glow,
            }}
            whileHover={{ scale: 1.05 }}
            animate={
              isTopThree
                ? {
                    boxShadow: [
                      rankColors.glow,
                      `${rankColors.glow}, 0 0 30px ${rankColors.text}20`,
                    ],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            {getRankIcon(entry.spotlight_rank)}
            <span
              style={{
                fontFamily: fonts.playful,
              }}
              className="font-bold max-md:text-xs"
            >
              {getRankDisplayName(entry.spotlight_rank, index)}
            </span>
          </motion.div>
        </div>

        {/* Genre Badge */}
        {entry.genre && (
          <div className="absolute top-3 right-3 z-20">
            <motion.span
              className="px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm"
              style={{
                backgroundColor: `${dashboardTheme.colors.parchment}ee`,
                color: dashboardTheme.colors.textSecondary,
                border: `1px solid ${dashboardTheme.colors.borderLight}`,
                fontFamily: fonts.button,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {entry.genre}
            </motion.span>
          </div>
        )}

        {/* Main Content */}
        <div className="p-4 md:p-5 h-full flex flex-col">
          {/* Title Section */}
          <div className="mt-10 max-md:mb-2 mb-4">
            <motion.h3
              className={`font-bold leading-tight line-clamp-2 group-hover:text-opacity-90 transition-all duration-300 ${
                isTopThree ? "text-lg md:text-xl" : "text-base md:text-lg"
              }`}
              style={{
                color: dashboardTheme.colors.textPrimary,
                fontFamily: fonts.dashboardHeading,
              }}
              whileHover={{ scale: 1.01 }}
            >
              {entry.title}
            </motion.h3>
          </div>

          {/* Author and Location */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ x: 2 }}
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: dashboardTheme.colors.accent }}
              >
                <User
                  className="w-3.5 h-3.5"
                  style={{ color: dashboardTheme.colors.activeText }}
                />
              </div>
              <span
                className="font-medium text-sm truncate"
                style={{
                  color: dashboardTheme.colors.textPrimary,
                  fontFamily: fonts.serifAlt,
                }}
              >
                {entry.author_name}
              </span>
            </motion.div>

            {entry.city && (
              <motion.div
                className="flex items-center gap-1 flex-shrink-0"
                whileHover={{ x: -2 }}
              >
                <MapPin
                  className="w-3 h-3"
                  style={{ color: dashboardTheme.colors.textTertiary }}
                />
                <span
                  className="text-xs"
                  style={{
                    color: dashboardTheme.colors.textTertiary,
                    fontFamily: fonts.math,
                  }}
                >
                  {entry.city}
                </span>
              </motion.div>
            )}
          </div>

          <div className="flex-1 mb-4">
            <motion.div
              className={`p-4 max-md:p-3 max-md:pb-6 rounded-lg h-fit flex flex-col`}
              style={{
                backgroundColor: dashboardTheme.colors.parchment,
                border: `1px solid ${dashboardTheme.colors.borderLight}`,
              }}
              whileHover={{
                backgroundColor: `${dashboardTheme.colors.parchment}dd`,
                scale: 1.01,
              }}
            >
              <p
                className={`leading-relaxed flex-1 ${
                  isTopThree ? "text-sm" : "text-xs md:text-sm"
                }`}
                style={{
                  color: dashboardTheme.colors.textSecondary,
                  fontFamily: fonts.math,

                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {preview}
              </p>

              <motion.div
                className="flex items-center gap-2 max-md:-mt-1 text-xs font-medium mt-3 group-hover:opacity-100 transition-all duration-300"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
              >
                <Eye
                  className="w-3 h-3"
                  style={{ color: dashboardTheme.colors.accent }}
                />
                <span
                  style={{
                    color: dashboardTheme.colors.accent,
                    fontFamily: fonts.button,
                  }}
                >
                  Read Full Story
                </span>
              </motion.div>
            </motion.div>
          </div>

          {entry.judge_notes && (
            <motion.div
              className="flex items-center gap-2 px-3 py-2 rounded-sm"
              style={{
                backgroundColor: `${dashboardTheme.colors.warning}15`,
                border: `1px solid ${dashboardTheme.colors.warning}30`,
              }}
              whileHover={{ scale: 1.02 }}
              animate={{
                backgroundColor: [
                  `${dashboardTheme.colors.warning}15`,
                  `${dashboardTheme.colors.warning}25`,
                  `${dashboardTheme.colors.warning}15`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star
                className="w-3 h-3"
                style={{ color: dashboardTheme.colors.warning }}
              />
              <span
                className="text-xs font-medium"
                style={{
                  color: dashboardTheme.colors.warning,
                  fontFamily: fonts.playful,
                }}
              >
                Note Available
              </span>
            </motion.div>
          )}
        </div>

        {/* Hover Overlay Effect */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
          style={{
            background: `linear-gradient(to top, ${dashboardTheme.colors.accent}12, transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default WinnerCard;
