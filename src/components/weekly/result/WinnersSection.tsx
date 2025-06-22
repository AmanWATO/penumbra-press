import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { WeeklyContestEntry } from "@/api/apiTypes";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WinnerCard from "./WinnerCard";

interface WinnersSectionProps {
  winners: WeeklyContestEntry[];
  expandedCards: Set<number>;
  onToggleExpansion: (id: number) => void;
}

const RANK_ORDER: Array<NonNullable<WeeklyContestEntry["spotlight_rank"]>> = [
  "FIRST",
  "SECOND",
  "THIRD",
  "FOURTH",
  "FIFTH",
];

export const WinnersSection: React.FC<WinnersSectionProps> = ({
  winners,
  expandedCards,
  onToggleExpansion,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const orderedWinners = [...winners].sort((a, b) => {
    const aRank = a.spotlight_rank ?? "NONE";
    const bRank = b.spotlight_rank ?? "NONE";

    if (aRank === bRank) return 0;

    const aIndex = RANK_ORDER.indexOf(aRank);
    const bIndex = RANK_ORDER.indexOf(bRank);
    
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < orderedWinners.length - 3;

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <motion.div
      className="mb-16 max-md:mb-12 py-12 px-6 rounded-2xl"
      style={{ backgroundColor: dashboardTheme.colors.manuscript }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          className="text-3xl max-md:text-2xl font-bold mb-3"
          style={{ color: dashboardTheme.colors.textPrimary }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🏆 Contest Winners
        </motion.h2>
        <motion.p
          className="text-base max-md:text-sm"
          style={{ color: dashboardTheme.colors.textSecondary }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Congratulations to our outstanding performers!
        </motion.p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ 
            backgroundColor: dashboardTheme.colors.cardBg,
            borderColor: dashboardTheme.colors.cardBorder,
            color: canScrollLeft ? dashboardTheme.colors.accent : dashboardTheme.colors.textMuted
          }}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ 
            backgroundColor: dashboardTheme.colors.cardBg,
            borderColor: dashboardTheme.colors.cardBorder,
            color: canScrollRight ? dashboardTheme.colors.accent : dashboardTheme.colors.textMuted
          }}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Cards Container */}
        <div className="overflow-hidden mx-12">
          <motion.div
            className="flex gap-6"
            animate={{
              x: -currentIndex * (320 + 24), // card width + gap
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {orderedWinners.map((entry, index) => (
              <WinnerCard
                key={entry.id}
                entry={entry}
                index={index}
                isActive={index >= currentIndex && index < currentIndex + 3}
              />
            ))}
          </motion.div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.max(0, orderedWinners.length - 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                backgroundColor: currentIndex === index 
                  ? dashboardTheme.colors.accent 
                  : dashboardTheme.colors.borderLight
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};