import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { WeeklyContestEntry } from "@/api/apiTypes";
import { useState, useEffect } from "react";
import WinnerCard from "./WinnerCard";
import { EntryPopup } from "./EntryPopup";
import { ChevronLeft, ChevronRight, Crown, Medal, Award } from "lucide-react";

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

const podiumVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

const floatingVariants = {
  float: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const WinnersSection: React.FC<WinnersSectionProps> = ({
  winners,
  expandedCards,
  onToggleExpansion,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedEntry, setSelectedEntry] = useState<WeeklyContestEntry | null>(
    null
  );
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const orderedWinners = [...winners].sort((a, b) => {
    const aIndex = RANK_ORDER.indexOf(a.spotlight_rank ?? "NONE");
    const bIndex = RANK_ORDER.indexOf(b.spotlight_rank ?? "NONE");
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  const topThree = orderedWinners.slice(0, 3);
  const remainingWinners = orderedWinners.slice(3);

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

  const maxIndex = Math.max(0, remainingWinners.length - itemsPerPage);
  const hasOverflow = remainingWinners.length > itemsPerPage;

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const getRankIcon = (rank: string | null) => {
    const normalized = rank?.toUpperCase().trim();
    switch (normalized) {
      case "FIRST":
        return <Crown className="w-6 h-6" />;
      case "SECOND":
        return <Medal className="w-6 h-6" />;
      case "THIRD":
        return <Medal className="w-6 h-6" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <>
      <motion.div
        className="mb-10 md:mb-20"
        initial="hidden"
        animate="visible"
        variants={podiumVariants}
      >
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-6 md:mb-10 px-5"
          variants={cardVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            variants={floatingVariants}
            animate="float"
          >
            <div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${dashboardTheme.colors.accent}, #ff6b6b)`,
                color: dashboardTheme.colors.activeText,
              }}
            >
              <Crown className="w-8 h-8 md:w-10 md:h-10" />
            </div>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
            style={{ fontFamily: dashboardTheme.fonts.heading }}
            variants={cardVariants}
          >
            The Gilded Quill
          </motion.h2>

          <motion.p
            className="text-base md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: dashboardTheme.colors.textSecondary }}
            variants={cardVariants}
          >
            Celebrating the extraordinary storytellers who captivated hearts and
            minds with their remarkable creations
          </motion.p>
        </motion.div>

        {/* Podium Section for Top 3 */}
        {topThree.length > 0 && (
          <motion.div className="mb-10 md:mb-16" variants={cardVariants}>
            <div className="max-w-6xl mx-auto px-4">
              <div className="hidden md:flex justify-center items-end gap-8 mb-8">
                {topThree[1] && (
                  <motion.div
                    className="flex flex-col items-center"
                    variants={cardVariants}
                    whileHover={{ y: -10 }}
                  >
                    <WinnerCard
                      entry={topThree[1]}
                      index={1}
                      isActive
                      onOpenPopup={handlePopupOpen}
                      isPodium
                    />
                  </motion.div>
                )}

                {/* First Place */}
                {topThree[0] && (
                  <motion.div
                    className="flex flex-col items-center"
                    variants={cardVariants}
                    whileHover={{ y: -15 }}
                  >
                    <WinnerCard
                      entry={topThree[0]}
                      index={0}
                      isActive
                      onOpenPopup={handlePopupOpen}
                      isPodium
                    />
                  </motion.div>
                )}

                {/* Third Place */}
                {topThree[2] && (
                  <motion.div
                    className="flex flex-col items-center"
                    variants={cardVariants}
                    whileHover={{ y: -8 }}
                  >
                    <WinnerCard
                      entry={topThree[2]}
                      index={2}
                      isActive
                      onOpenPopup={handlePopupOpen}
                      isPodium
                    />
                  </motion.div>
                )}
              </div>

              {/* Mobile Top 3 */}
              <div className="md:hidden space-y-6">
                {topThree.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    variants={cardVariants}
                    className="relative"
                  >
                    <WinnerCard
                      entry={entry}
                      index={index}
                      isActive
                      onOpenPopup={handlePopupOpen}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Remaining Winners Carousel */}
        {remainingWinners.length > 0 && (
          <motion.div
            className="relative"
            style={{
              background: `linear-gradient(135deg, ${dashboardTheme.colors.subtleGradient}, ${dashboardTheme.colors.manuscript})`,
              borderRadius: "24px",
              border: `1px solid ${dashboardTheme.colors.borderLight}`,
              boxShadow: dashboardTheme.colors.cardShadow,
            }}
            variants={cardVariants}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="text-center py-8 px-4">
              <h3
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{
                  color: dashboardTheme.colors.textPrimary,
                  fontFamily: dashboardTheme.fonts.heading,
                }}
              >
                Outstanding Achievements
              </h3>
              <p
                className="text-sm md:text-base"
                style={{ color: dashboardTheme.colors.textSecondary }}
              >
                Recognizing exceptional creativity and storytelling excellence
              </p>
            </div>

            <div className="px-4 md:px-8 max-w-7xl mx-auto overflow-hidden pb-8">
              <div className="relative">
                <motion.div
                  className="flex gap-4 md:gap-6 transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${
                      currentIndex * (100 / itemsPerPage)
                    }%)`,
                  }}
                >
                  {remainingWinners.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      className="flex-shrink-0"
                      style={{ width: `${100 / itemsPerPage}%` }}
                      variants={cardVariants}
                    >
                      <WinnerCard
                        entry={entry}
                        index={index + 3}
                        isActive
                        onOpenPopup={handlePopupOpen}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Pagination Dots */}
              {hasOverflow && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: maxIndex + 1 }, (_, i) => (
                    <motion.button
                      key={i}
                      className="w-3 h-3 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor:
                          i === currentIndex
                            ? dashboardTheme.colors.accent
                            : dashboardTheme.colors.borderLight,
                      }}
                      onClick={() => setCurrentIndex(i)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      {selectedEntry && (
        <EntryPopup entry={selectedEntry} onClose={handlePopupClose} />
      )}
    </>
  );
};
