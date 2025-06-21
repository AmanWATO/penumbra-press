"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { colors, fonts } from "@/styles/theme";
import ColorThief from "colorthief";
import { FaAmazon } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import { useTheme } from "@/context/ThemeProvider";
import { booksData } from "@/lib/books";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const bookCardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration: 0.6,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
    },
  },
};

const genreButtonVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: -30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 25,
      duration: 0.8,
    },
  },
};

function AuthorPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [bookColors, setBookColors] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [colorsLoaded, setColorsLoaded] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    const extractColors = async () => {
      try {
        if (typeof window === "undefined") return;

        const colorThief = new ColorThief();
        const colorPromises = booksData.map(async (book) => {
          return new Promise<{ id: number; color: string }>((resolve) => {
            const img = new window.Image();
            img.crossOrigin = "Anonymous";
            img.src = book.coverImage;

            if (img.complete) {
              try {
                const [r, g, b] = colorThief.getColor(img);
                resolve({
                  id: book.id,
                  color: `rgb(${r},${g},${b})`,
                });
              } catch (error) {
                resolve({
                  id: book.id,
                  color: colors.mediumSepia,
                });
              }
              return;
            }

            img.onload = () => {
              try {
                const [r, g, b] = colorThief.getColor(img);
                resolve({
                  id: book.id,
                  color: `rgb(${r},${g},${b})`,
                });
              } catch (error) {
                resolve({
                  id: book.id,
                  color: colors.mediumSepia,
                });
              }
            };

            img.onerror = () => {
              resolve({
                id: book.id,
                color: colors.mediumSepia,
              });
            };
          });
        });

        const extractedColors = await Promise.all(colorPromises);
        const colorMap = extractedColors.reduce(
          (acc: { [key: number]: string }, item) => {
            acc[item.id] = item.color;
            return acc;
          },
          {} as { [key: number]: string }
        );

        setBookColors(colorMap);
        setColorsLoaded(true);
      } catch (error) {
        applyFallbackColors();
      }
    };

    const applyFallbackColors = () => {
      const fallbackColors = booksData.reduce((acc, book) => {
        acc[book.id] = colors.mediumSepia;
        return acc;
      }, {} as { [key: number]: string });

      setBookColors(fallbackColors);
      setColorsLoaded(true);
    };

    extractColors();

    const timeoutId = setTimeout(() => {
      if (!colorsLoaded) {
        applyFallbackColors();
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [colorsLoaded]);

  useEffect(() => {
    if (colorsLoaded) {
      const hideLoader = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(hideLoader);
    }
  }, [colorsLoaded]);

  const filteredBooks =
    selectedGenre === "All"
      ? booksData
      : booksData.filter((book) => book.genre === selectedGenre);

  const availableGenres = [...new Set(booksData.map((book) => book.genre))];

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen py-8 md:py-16 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.cream} 0%, ${colors.softEggshell} 25%, ${colors.parchment} 50%, ${colors.lightSepia} 75%, ${colors.mediumSepia} 100%)`,
      }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute top-20 left-4 md:left-10 w-32 h-32 md:w-64 md:h-64 rounded-full opacity-6 blur-3xl"
        style={{ backgroundColor: colors.deepTeal }}
      />
      <div
        className="absolute bottom-20 right-4 md:right-10 w-40 h-40 md:w-96 md:h-96 rounded-full opacity-6 blur-3xl"
        style={{ backgroundColor: colors.purple }}
      />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col justify-center items-center px-4"
          >
            <motion.div
              variants={loadingVariants}
              animate="animate"
              className="w-12 h-12 md:w-16 md:h-16 border-4 border-t-transparent rounded-full mb-6"
              style={{ borderColor: colors.inkBrown }}
            />
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: fonts.heading,
                color: colors.inkBrown,
              }}
              className="text-lg md:text-xl font-semibold mb-2 text-center"
            >
              Curating Literary Collection
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ 
                color: colors.deepSepia,
                fontFamily: fonts.body,
              }}
              className="text-sm text-center"
            >
              Preparing your reading journey...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          >
            <motion.h1
              variants={titleVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12 text-center"
              style={{
                fontFamily: fonts.heading,
                color: colors.penumbraBlack,
              }}
            >
              Published Works
            </motion.h1>

            {/* Genre Filter Buttons */}
            <motion.div
              className="flex justify-center mb-8 md:mb-12 gap-2 md:gap-4 flex-wrap px-2"
              variants={containerVariants}
            >
              {["All", ...availableGenres].map((genre) => (
                <motion.button
                  key={genre}
                  variants={genreButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 mb-2 ${
                    selectedGenre === genre
                      ? "shadow-lg scale-105"
                      : "hover:shadow-md"
                  }`}
                  style={{
                    backgroundColor:
                      selectedGenre === genre
                        ? colors.inkBrown
                        : colors.cream,
                    color:
                      selectedGenre === genre
                        ? colors.cream
                        : colors.inkBrown,
                    border: `2px solid ${
                      selectedGenre === genre
                        ? colors.inkBrown
                        : colors.mediumSepia
                    }40`,
                    fontFamily: fonts.button,
                  }}
                >
                  {genre}
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              {filteredBooks.length > 0 ? (
                <motion.div
                  key={selectedGenre}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
                >
                  {filteredBooks.map((book) => (
                    <motion.div
                      key={book.id}
                      variants={bookCardVariants}
                      whileHover="hover"
                      className="group"
                    >
                      <div
                        className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col"
                        style={{
                          backgroundColor: colors.cream,
                          border: `1px solid ${colors.gray300}`,
                          boxShadow: `0 8px 25px ${bookColors[book.id] || colors.mediumSepia}20, 0 4px 6px rgba(0, 0, 0, 0.1)`,
                        }}
                      >
                        {/* Book Cover */}
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            style={{
                              background: `linear-gradient(to bottom, transparent 70%, ${bookColors[book.id] || colors.mediumSepia}20)`,
                            }}
                          />
                        </div>

                        {/* Book Info */}
                        <div
                          className="p-3 md:p-4 text-white flex-shrink-0"
                          style={{
                            backgroundColor: bookColors[book.id] || colors.mediumSepia,
                          }}
                        >
                          <h2
                            className="text-sm md:text-base lg:text-lg font-bold leading-tight mb-1"
                            style={{ fontFamily: fonts.heading }}
                          >
                            {book.title}
                          </h2>
                          <p className="text-xs opacity-90">
                            {book.genre} | {book.publicationYear}
                          </p>
                        </div>

                        {/* Book Details */}
                        <div className="p-3 md:p-4 flex flex-col flex-grow">
                          <p
                            className="text-xs md:text-sm leading-relaxed mb-3 md:mb-4 flex-grow"
                            style={{ 
                              color: colors.gray700,
                              fontFamily: fonts.body,
                            }}
                          >
                            {book.description.length > 100
                              ? book.description.substring(0, 100) + "..."
                              : book.description}
                          </p>

                          {/* Purchase Links */}
                          <div className="space-y-2 md:space-y-3">
                            <h3
                              className="text-xs md:text-sm font-semibold"
                              style={{ 
                                color: colors.inkBrown,
                                fontFamily: fonts.button,
                              }}
                            >
                              Available on:
                            </h3>
                            <div className="flex gap-2">
                              {book.availability?.amazon && (
                                <motion.a
                                  href={book.availability.amazonLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center p-2 md:p-3 rounded-lg border-2 transition-all duration-300"
                                  style={{ 
                                    borderColor: colors.gray300,
                                    backgroundColor: colors.gray100,
                                  }}
                                  whileHover={{
                                    scale: 1.05,
                                    backgroundColor: colors.gray200,
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FaAmazon size={16} color={colors.gray800} />
                                </motion.a>
                              )}

                              {book.availability?.flipkart && (
                                <motion.a
                                  href={book.availability.flipkartLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center p-2 md:p-3 rounded-lg border-2 transition-all duration-300"
                                  style={{ 
                                    borderColor: colors.gray300,
                                    backgroundColor: colors.gray100,
                                  }}
                                  whileHover={{
                                    scale: 1.05,
                                    backgroundColor: colors.gray200,
                                  }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <SiFlipkart size={16} color="#F8D706" />
                                </motion.a>
                              )}
                            </div>
                          </div>

                          {/* Learn More Button */}
                          <motion.button
                            onClick={() => console.log("Learn more clicked")}
                            className="mt-3 md:mt-4 w-full py-2 md:py-3 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300"
                            style={{
                              backgroundColor: colors.penumbraBlack,
                              color: colors.cream,
                              fontFamily: fonts.button,
                            }}
                            whileHover={{
                              backgroundColor: colors.gray800,
                              scale: 1.02,
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Learn More
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12 md:py-20 px-4"
                >
                  <motion.h2
                    className="text-xl md:text-2xl font-bold mb-4"
                    style={{ 
                      color: colors.penumbraBlack,
                      fontFamily: fonts.heading,
                    }}
                  >
                    No books found in this genre
                  </motion.h2>
                  <motion.p
                    className="text-sm md:text-base mb-6"
                    style={{ 
                      color: colors.gray700,
                      fontFamily: fonts.body,
                    }}
                  >
                    Try selecting a different genre or view all books.
                  </motion.p>
                  <motion.button
                    onClick={() => setSelectedGenre("All")}
                    className="px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                    style={{
                      backgroundColor: colors.inkBrown,
                      color: colors.cream,
                      fontFamily: fonts.button,
                    }}
                    whileHover={{
                      backgroundColor: colors.deepSepia,
                      scale: 1.05,
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All Books
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AuthorPage;