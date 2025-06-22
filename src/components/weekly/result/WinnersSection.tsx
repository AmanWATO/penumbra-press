import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { WeeklyContestEntry } from "@/api/apiTypes";
import { useState, useEffect } from "react";
import WinnerCard from "./WinnerCard";
import { EntryPopup } from "./EntryPopup";

interface WinnersSectionProps {
  winners: WeeklyContestEntry[];
  expandedCards: Set<number>;
  onToggleExpansion: (id: number) => void;
}

const RANK_ORDER: Array<NonNullable<WeeklyContestEntry["spotlight_rank"]>> = [
  "FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH",
];

export const WinnersSection: React.FC<WinnersSectionProps> = ({
  winners,
  expandedCards,
  onToggleExpansion,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState<WeeklyContestEntry | null>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const orderedWinners = [...winners].sort((a, b) => {
    const aIndex = RANK_ORDER.indexOf(a.spotlight_rank ?? "NONE");
    const bIndex = RANK_ORDER.indexOf(b.spotlight_rank ?? "NONE");
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, orderedWinners.length - itemsPerPage);
  const hasOverflow = orderedWinners.length > itemsPerPage;

  useEffect(() => {
    if (!isAutoScrolling || !hasOverflow || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoScrolling, hasOverflow, maxIndex, isPaused]);

  const handlePopupOpen = (entry: WeeklyContestEntry) => {
    setSelectedEntry(entry);
    setIsPaused(true);
  };

  const handlePopupClose = () => {
    setSelectedEntry(null);
    setIsPaused(false);
  };

  return (
    <>
      <motion.div
        className="mb-12 md:mb-20 overflow-hidden rounded-2xl md:rounded-3xl"
        style={{
          background: dashboardTheme.colors.subtleGradient,
          backgroundColor: dashboardTheme.colors.manuscript,
          border: `1px solid ${dashboardTheme.colors.borderLight}`,
          boxShadow: dashboardTheme.colors.cardShadow,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="text-center py-6 md:py-12 px-4 md:px-0">
          <motion.div
            className="inline-flex items-center gap-2 md:gap-3 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div
              className="w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg md:text-2xl shadow-lg"
              style={{
                backgroundColor: dashboardTheme.colors.accent,
                color: dashboardTheme.colors.activeText,
              }}
            >
              🏆
            </div>
            <motion.h2
              className="text-2xl md:text-4xl font-bold"
              style={{
                color: dashboardTheme.colors.textPrimary,
                fontFamily: dashboardTheme.fonts.heading,
              }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Contest Champions
            </motion.h2>
          </motion.div>
          <motion.p
            className="text-sm md:text-lg max-w-2xl mx-auto"
            style={{ color: dashboardTheme.colors.textSecondary }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Celebrating the brilliant minds who brought extraordinary stories to life
          </motion.p>
        </div>

        <div className="px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
          <motion.div
            className="flex gap-4 md:gap-6 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {orderedWinners.map((entry, index) => (
              <motion.div
                key={entry.id}
                className="flex-shrink-0 w-full sm:w-[320px] sm:min-w-[320px]"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 150,
                  damping: 20,
                }}
              >
                <WinnerCard
                  entry={entry}
                  index={index}
                  isActive
                  onOpenPopup={handlePopupOpen}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {selectedEntry && <EntryPopup entry={selectedEntry} onClose={handlePopupClose} />}
    </>
  );
};
