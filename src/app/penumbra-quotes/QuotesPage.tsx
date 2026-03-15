"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeProvider";
import { Quote } from "@/api/apiTypes";
import { fetchQuotes } from "@/api/apiService";
import QuoteModal from "@/components/quote-modal";
import { BookOpen, Feather, Sparkles } from "lucide-react";

// More vibrant but still sophisticated color palette
const cardAccentColors = [
  { bg: "rgba(196, 168, 130, 0.15)", border: "rgba(196, 168, 130, 0.35)", accent: "#C4A882", text: "#D4BA8C" }, // Warm Bronze
  { bg: "rgba(139, 156, 184, 0.15)", border: "rgba(139, 156, 184, 0.35)", accent: "#8B9CB8", text: "#A3B4CC" }, // Slate Blue
  { bg: "rgba(139, 168, 142, 0.15)", border: "rgba(139, 168, 142, 0.35)", accent: "#8BA88E", text: "#A3C0A6" }, // Sage Green
  { bg: "rgba(184, 138, 148, 0.15)", border: "rgba(184, 138, 148, 0.35)", accent: "#B88A94", text: "#CCA4AA" }, // Muted Rose
  { bg: "rgba(168, 152, 120, 0.15)", border: "rgba(168, 152, 120, 0.35)", accent: "#A89878", text: "#C0AC90" }, // Olive Taupe
  { bg: "rgba(155, 160, 179, 0.15)", border: "rgba(155, 160, 179, 0.35)", accent: "#9BA0B3", text: "#B3B8CB" }, // Charcoal Blue
];

// Helper to strip quotes from text
const stripQuotes = (text: string): string => {
  return text.replace(/^["']|["']$/g, '').trim();
};

// Get day-based indices for featured quotes
const getDayBasedIndices = (maxIndex: number, count: number): number[] => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  const indices: number[] = [];
  for (let i = 0; i < count; i++) {
    const index = (dayOfYear * (i + 1) * 7) % maxIndex;
    if (!indices.includes(index)) {
      indices.push(index);
    } else {
      // Find next available index
      for (let j = 0; j < maxIndex; j++) {
        if (!indices.includes(j)) {
          indices.push(j);
          break;
        }
      }
    }
  }
  return indices;
};

function QuotesPage() {
  const theme = useTheme();
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [selectedColorScheme, setSelectedColorScheme] = useState(cardAccentColors[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const getQuotes = async () => {
      try {
        const fetchedQuotes = await fetchQuotes();
        setQuotes(fetchedQuotes);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getQuotes();
  }, []);

  // Calculate featured quotes based on day
  const { bestOfRandom, topPicksOfDay, remainingQuotes } = useMemo(() => {
    if (quotes.length === 0) return { bestOfRandom: [], topPicksOfDay: [], remainingQuotes: [] };

    // Get 3 random best (changes daily)
    const bestIndices = getDayBasedIndices(quotes.length, 3);
    const bestOfRandom = bestIndices.map(i => quotes[i]);

    // Get 3 top picks of the day (different from best)
    const topPicksIndices = getDayBasedIndices(quotes.length, 3).map(i => (i + 5) % quotes.length);
    const topPicksOfDay = topPicksIndices.map(i => quotes[i]);

    // Get remaining quotes excluding the featured ones
    const featuredIndices = new Set([...bestIndices, ...topPicksIndices]);
    const remainingQuotes = quotes.filter((_, index) => !featuredIndices.has(index));

    return { bestOfRandom, topPicksOfDay, remainingQuotes };
  }, [quotes]);

  const openQuoteModal = useCallback((quote: Quote, colorScheme: typeof cardAccentColors[0]) => {
    setSelectedQuote(quote);
    setSelectedColorScheme(colorScheme);
    document.body.style.overflow = "hidden";
  }, []);

  const closeQuoteModal = useCallback(() => {
    setSelectedQuote(null);
    document.body.style.overflow = "auto";
  }, []);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 6, remainingQuotes.length));
  }, [remainingQuotes.length]);

  if (isLoading) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: "#1a1a1a" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col items-center gap-4 md:gap-6">
          <motion.div
            className="w-12 h-12 border-2 border-t-transparent rounded-full"
            style={{ borderColor: "#C4A882", borderTopColor: "transparent" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-sm tracking-wide"
            style={{ color: theme.colors.gray400, fontFamily: theme.fonts.body }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Gathering wisdom...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen relative overflow-hidden pt-12 md:pt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ backgroundColor: "#1a1a1a" }}
      >
        {/* Subtle background texture */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          {/* Soft gradient orbs */}
          <motion.div
            className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(196, 168, 130, 0.08) 0%, transparent 60%)`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              x: [0, 30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(139, 156, 184, 0.06) 0%, transparent 60%)`,
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              y: [0, -20, 0],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Header */}
        <header className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-10 z-10">
          {/* Badge */}
          <motion.div
            className="flex justify-center mb-4"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                backgroundColor: "rgba(196, 168, 130, 0.1)",
                border: "1px solid rgba(196, 168, 130, 0.25)",
              }}
            >
              <Feather className="w-4 h-4" style={{ color: "#C4A882" }} />
              <span
                className="text-xs font-medium tracking-wide uppercase"
                style={{ color: "#C4A882", fontFamily: theme.fonts.button }}
              >
                Curated Reflections
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-3 text-center tracking-tight"
            style={{ fontFamily: theme.fonts.heading }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span style={{ color: theme.colors.gray200 }}>Thoughtful </span>
            <span style={{ color: "#C4A882" }}>Archive</span>
          </motion.h1>

          {/* Stats */}
          <motion.div
            className="flex justify-center gap-10 mt-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {[
              { label: "Reflections", value: quotes.length },
              { label: "Themes", value: new Set(quotes.map(q => q.genre)).size },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-xl font-light tracking-wide"
                  style={{ color: "#C4A882", fontFamily: theme.fonts.heading }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs uppercase tracking-widest mt-1"
                  style={{ color: theme.colors.gray500, fontFamily: theme.fonts.button }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </header>

        {/* Best of - 3 Random (No Header) */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-10 z-10">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 md:gap-6"
          >
            {bestOfRandom.map((quote, index) => {
              const colorScheme = cardAccentColors[index % cardAccentColors.length];
              
              return (
                <motion.div
                  key={`best-${index}`}
                  className="group cursor-pointer rounded-lg p-6 relative overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  onClick={() => openQuoteModal(quote, colorScheme)}
                >
                  {/* Subtle top accent on hover */}
                  <div
                    className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: colorScheme.accent }}
                  />

                  {/* Genre tag */}
                  <div
                    className="inline-block px-2 py-0.5 rounded text-xs tracking-wide uppercase mb-4"
                    style={{
                      color: colorScheme.text,
                      fontFamily: theme.fonts.button,
                      border: `1px solid ${colorScheme.border}`,
                    }}
                  >
                    {quote.genre}
                  </div>

                  {/* Quote text */}
                  <p
                    className="text-base leading-relaxed mb-4"
                    style={{
                      color: theme.colors.gray100,
                      fontFamily: theme.fonts.math,
                    }}
                  >
                    &ldquo;{stripQuotes(quote.title)}&rdquo;
                  </p>

                  {/* Preview of explanation */}
                  <p
                    className="text-sm line-clamp-2 leading-relaxed"
                    style={{ color: theme.colors.gray400, fontFamily: theme.fonts.serifAlt }}
                  >
                    {quote.explanation}
                  </p>

                  {/* Read more indicator */}
                  <div
                    className="flex items-center gap-1.5 mt-4 opacity-0 group-hover:opacity-70 transition-opacity"
                    style={{ color: colorScheme.text }}
                  >
                    <span className="text-xs uppercase tracking-wide" style={{ fontFamily: theme.fonts.button }}>
                      Read
                    </span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Top Picks of the Day */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-10 z-10">
          {/* Section Header */}
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="w-4 h-4" style={{ color: "#C4A882" }} />
            <h2
              className="text-sm font-medium tracking-wide uppercase"
              style={{ color: "#C4A882", fontFamily: theme.fonts.button }}
            >
              Top Picks of the Day
            </h2>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "rgba(196, 168, 130, 0.2)" }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            {topPicksOfDay.map((quote, index) => {
              const colorScheme = cardAccentColors[(index + 3) % cardAccentColors.length];
              
              return (
                <motion.div
                  key={`top-${index}`}
                  className="group cursor-pointer rounded-lg p-6 relative overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  onClick={() => openQuoteModal(quote, colorScheme)}
                >
                  {/* Subtle top accent on hover */}
                  <div
                    className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: colorScheme.accent }}
                  />

                  {/* Genre tag */}
                  <div
                    className="inline-block px-2 py-0.5 rounded text-xs tracking-wide uppercase mb-4"
                    style={{
                      color: colorScheme.text,
                      fontFamily: theme.fonts.button,
                      border: `1px solid ${colorScheme.border}`,
                    }}
                  >
                    {quote.genre}
                  </div>

                  {/* Quote text */}
                  <p
                    className="text-base leading-relaxed mb-4"
                    style={{
                      color: theme.colors.gray100,
                      fontFamily: theme.fonts.math,
                    }}
                  >
                    &ldquo;{stripQuotes(quote.title)}&rdquo;
                  </p>

                  {/* Preview of explanation */}
                  <p
                    className="text-sm line-clamp-2 leading-relaxed"
                    style={{ color: theme.colors.gray400, fontFamily: theme.fonts.serifAlt }}
                  >
                    {quote.explanation}
                  </p>

                  {/* Read more indicator */}
                  <div
                    className="flex items-center gap-1.5 mt-4 opacity-0 group-hover:opacity-70 transition-opacity"
                    style={{ color: colorScheme.text }}
                  >
                    <span className="text-xs uppercase tracking-wide" style={{ fontFamily: theme.fonts.button }}>
                      Read
                    </span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* All Quotes Section */}
        <section className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-16 z-10">
          {/* Section Header */}
          <motion.div
            className="flex items-center gap-3 mb-5"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Feather className="w-4 h-4" style={{ color: "#8B9CB8" }} />
            <h2
              className="text-sm font-medium tracking-wide uppercase"
              style={{ color: "#8B9CB8", fontFamily: theme.fonts.button }}
            >
              Explore All
            </h2>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "rgba(139, 156, 184, 0.2)" }}
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {remainingQuotes.slice(0, visibleCount).map((quote, index) => {
              const colorScheme = cardAccentColors[index % cardAccentColors.length];
              
              return (
                <motion.div
                  key={`all-${index}`}
                  className="group cursor-pointer rounded-lg p-5 relative overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: colorScheme.bg,
                    border: `1px solid ${colorScheme.border}`,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.02, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                  onClick={() => openQuoteModal(quote, colorScheme)}
                >
                  {/* Subtle top accent on hover */}
                  <div
                    className="absolute top-0 left-4 right-4 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: colorScheme.accent }}
                  />

                  {/* Genre tag */}
                  <div
                    className="inline-block px-2 py-0.5 rounded text-xs tracking-wide uppercase mb-3"
                    style={{
                      color: colorScheme.text,
                      fontFamily: theme.fonts.button,
                      border: `1px solid ${colorScheme.border}`,
                    }}
                  >
                    {quote.genre}
                  </div>

                  {/* Quote text */}
                  <p
                    className="text-base leading-relaxed mb-3"
                    style={{
                      color: theme.colors.gray100,
                      fontFamily: theme.fonts.math,
                    }}
                  >
                    &ldquo;{stripQuotes(quote.title)}&rdquo;
                  </p>

                  {/* Preview of explanation */}
                  <p
                    className="text-sm line-clamp-2 leading-relaxed"
                    style={{ color: theme.colors.gray400, fontFamily: theme.fonts.serifAlt }}
                  >
                    {quote.explanation}
                  </p>

                  {/* Read more indicator */}
                  <div
                    className="flex items-center gap-1.5 mt-4 opacity-0 group-hover:opacity-70 transition-opacity"
                    style={{ color: colorScheme.text }}
                  >
                    <span className="text-xs uppercase tracking-wide" style={{ fontFamily: theme.fonts.button }}>
                      Read
                    </span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Load More Button */}
          {visibleCount < remainingQuotes.length && (
            <motion.div
              className="flex justify-center mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                onClick={loadMore}
                className="flex cursor-pointer items-center gap-2.5 px-6 py-3 rounded-lg font-medium"
                style={{
                  backgroundColor: "rgba(139, 156, 184, 0.1)",
                  border: "1px solid rgba(139, 156, 184, 0.25)",
                  color: "#8B9CB8",
                  fontFamily: theme.fonts.button,
                }}
                whileHover={{
                  backgroundColor: "rgba(139, 156, 184, 0.15)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm tracking-wide">
                  Explore More ({remainingQuotes.length - visibleCount} remaining)
                </span>
              </motion.button>
            </motion.div>
          )}
        </section>

        {/* Footer */}
        <footer className="py-10 pt-5 px-4 text-center relative z-10">
          <motion.p
            className="text-sm md:text-lg tracking-wide"
            style={{ color: theme.colors.gray600, fontFamily: theme.fonts.body }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Curated with intention by{" "}
            <span style={{ color: "#C4A882" }}>Aman Srivastava</span>
          </motion.p>
        </footer>

        <QuoteModal 
          selectedQuote={selectedQuote} 
          onClose={closeQuoteModal} 
          colorScheme={selectedColorScheme}
        />
      </motion.div>
    </AnimatePresence>
  );
}

export default QuotesPage;