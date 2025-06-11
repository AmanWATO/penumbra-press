"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import theme from "@/styles/theme";
import { Quote } from "@/api/apiTypes";
import { fetchQuotes } from "@/api/apiService";
import QuoteModal from "@/components/quote-modal";

function QuotesPage() {
  const [columns, setColumns] = useState(3);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState<Quote[][]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Optimized mouse tracking with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    });
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth < 640) {
      setColumns(1);
    } else if (window.innerWidth < 1024) {
      setColumns(2);
    } else {
      setColumns(3);
    }
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, [handleResize, handleMouseMove]);

  useEffect(() => {
    const getAndLayoutQuotes = async () => {
      try {
        const quotes = await fetchQuotes();
        const masonry = createMasonryLayout(quotes);
        setLayout(masonry);
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
        setIsLoading(false);
      }
    };

    if (!isLoading) {
      getAndLayoutQuotes();
    }
  }, [columns, isLoading]);

  const createMasonryLayout = useCallback(
    (quotes: Quote[]): Quote[][] => {
      const result = Array.from({ length: columns }, () => [] as Quote[]);

      quotes.forEach((quote, index) => {
        const columnIndex = index % columns;
        result[columnIndex].push(quote);
      });

      return result;
    },
    [columns]
  );

  const quotesTheme = theme.sections.quotes;

  const openQuoteModal = useCallback((quote: Quote) => {
    setSelectedQuote(quote);
    document.body.style.overflow = "hidden";
  }, []);

  const closeQuoteModal = useCallback(() => {
    setSelectedQuote(null);
    document.body.style.overflow = "auto";
  }, []);

  // Memoized background style for performance
  const backgroundStyle = useMemo(
    () => ({
      background: `
      radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${
        quotesTheme.decorativeElements
      }40, transparent 50%),
      radial-gradient(circle at ${100 - mousePosition.x}% ${
        100 - mousePosition.y
      }%, ${quotesTheme.decorativeElements}20, transparent 60%)
    `,
    }),
    [mousePosition.x, mousePosition.y, quotesTheme.decorativeElements]
  );

  // Animation variants
  const loadingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.05,
      },
    },
  };

  const headerVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const titleWordVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    }),
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  if (isLoading) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen"
        style={{ background: quotesTheme.background }}
        variants={loadingVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center">
          <motion.div
            className="w-16 h-16 border-4 border-t-transparent rounded-full"
            style={{
              borderColor: `${quotesTheme.accent} transparent ${quotesTheme.accent} transparent`,
            }}
            variants={spinnerVariants}
            animate="animate"
          />
          <motion.p
            className="mt-4 text-lg"
            style={{ color: quotesTheme.text }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading wisdom...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen relative overflow-hidden"
        style={{ background: quotesTheme.background }}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Optimized dynamic background */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none"
          style={{
            ...backgroundStyle,
            y: backgroundY,
          }}
        />

        <motion.header
          className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center"
          variants={headerVariants}
          style={{
            y: headerY,
            opacity: headerOpacity,
          }}
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
              style={{ color: quotesTheme.text }}
              variants={headerVariants}
            >
              <motion.span
                className="inline-block"
                variants={titleWordVariants}
                whileHover={{
                  scale: 1.05,
                  color: quotesTheme.accent,
                  transition: { duration: 0.2 },
                }}
              >
                {`Penumbra's`}
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                variants={titleWordVariants}
                whileHover={{
                  scale: 1.05,
                  color: quotesTheme.accent,
                  transition: { duration: 0.2 },
                }}
              >
                Thoughtful
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                variants={titleWordVariants}
                whileHover={{
                  scale: 1.05,
                  color: quotesTheme.accent,
                  transition: { duration: 0.2 },
                }}
              >
                Archive
              </motion.span>
            </motion.h1>

            <motion.div
              className="w-32 h-1 mx-auto my-6"
              style={{ backgroundColor: quotesTheme.accent }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            />

            <motion.p
              className="text-sm md:text-base lg:text-lg italic max-w-xl mx-auto"
              style={{ color: quotesTheme.subtext }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {`"If you are here, take a pause, reflect on the words you scan
              through your eyes, dive into its own dimension and relive it!"`}
            </motion.p>
          </div>
        </motion.header>

        <motion.main
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {layout.map((column, columnIndex) => (
              <motion.div
                key={columnIndex}
                className="flex-1 flex flex-col gap-8"
                initial={{ x: columnIndex % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.2 + columnIndex * 0.1,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                {column.map((quote, quoteIndex) => {
                  const baseHeight = 220 + ((quoteIndex * 31) % 130);

                  return (
                    <motion.div
                      key={`quote-${columnIndex}-${quoteIndex}`}
                      className="rounded-lg p-6 md:p-8 cursor-pointer shadow-lg relative overflow-hidden backdrop-blur-sm"
                      style={{
                        backgroundColor: quotesTheme.cardBackground,
                        minHeight: `${baseHeight}px`,
                        borderLeft: `4px solid ${quotesTheme.accent}`,
                        border: `1px solid rgba(255, 255, 255, 0.1)`,
                      }}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      whileTap="tap"
                      custom={columnIndex * 3 + quoteIndex}
                      onClick={() => openQuoteModal(quote)}
                      layout
                    >
                      <div className="flex flex-col h-full justify-between relative z-10">
                        <div>
                          <motion.div
                            className="mb-4 text-xs tracking-widest uppercase opacity-60"
                            style={{ color: quotesTheme.quoteNumber }}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0.6, x: 0 }}
                            transition={{
                              delay:
                                0.4 + (columnIndex * 3 + quoteIndex) * 0.05,
                            }}
                          >
                            {quote?.genre}
                          </motion.div>

                          <motion.p
                            className="text-lg md:text-xl lg:text-2xl italic leading-relaxed mb-4"
                            style={{ color: quotesTheme.text }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay:
                                0.5 + (columnIndex * 3 + quoteIndex) * 0.05,
                            }}
                          >
                            {`"${quote.title}"`}
                          </motion.p>
                        </div>

                        <div className="mt-auto">
                          <motion.div
                            className="flex items-center gap-3 mb-3"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                              delay:
                                0.6 + (columnIndex * 3 + quoteIndex) * 0.05,
                            }}
                          >
                            <div
                              className="h-px flex-grow"
                              style={{ backgroundColor: quotesTheme.divider }}
                            />
                            <motion.div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: quotesTheme.accent }}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 2,
                              }}
                            />
                          </motion.div>

                          <motion.p
                            className="text-sm italic"
                            style={{ color: quotesTheme.explanation }}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay:
                                0.7 + (columnIndex * 3 + quoteIndex) * 0.05,
                            }}
                          >
                            {quote.explanation}
                          </motion.p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ))}
          </div>
        </motion.main>

        <motion.footer
          className="pb-8 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <motion.p
              className="text-sm opacity-70 mb-2"
              style={{ color: quotesTheme.subtext }}
              whileHover={{ opacity: 1, scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              Crafted with passion by
            </motion.p>

            <motion.div
              className="text-xl font-bold"
              style={{ color: quotesTheme.text }}
              whileHover={{
                scale: 1.05,
                color: quotesTheme.accent,
              }}
              transition={{ duration: 0.2 }}
            >
              ~ Aman Srivastava ~
            </motion.div>
          </div>
        </motion.footer>

        <QuoteModal selectedQuote={selectedQuote} onClose={closeQuoteModal} />
      </motion.div>
    </AnimatePresence>
  );
}

export default QuotesPage;
