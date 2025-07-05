"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "@/styles/theme";
import ColorThief from "colorthief";
import { FaAmazon, FaBookOpen } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import { IoIosArrowForward } from "react-icons/io";
import { useTheme } from "@/context/ThemeProvider";
import { booksData } from "@/lib/books";

// Enhanced animation variants
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
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
      duration: 0.7,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
};

const genreButtonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 500,
    },
  },
  tap: { scale: 0.98 },
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      duration: 0.8,
    },
  },
};

function AuthorPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [bookColors, setBookColors] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [colorsLoaded, setColorsLoaded] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const theme = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth);
      setMouseY(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
                  color: colors.gray700,
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
                  color: colors.gray700,
                });
              }
            };

            img.onerror = () => {
              resolve({
                id: book.id,
                color: colors.gray700,
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
        console.error("Error in color extraction:", error);
        applyFallbackColors();
      }
    };

    const applyFallbackColors = () => {
      const fallbackColors = booksData.reduce((acc, book) => {
        acc[book.id] =
          book.genre === "Poetry"
            ? colors.softBeige
            : book.genre === "Collection"
            ? colors.deepTeal
            : colors.gray700;
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
    }, 3000);

    const minLoadingTime = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(minLoadingTime);
    };
  }, [colorsLoaded]);

  const genreColors = {
    Poetry: colors.softBeige,
    Prose: colors.deepSepia,
    Collection: colors.deepTeal,
    Anthology: colors.softEggshell,
    Essay: colors.gray700,
  };

  const filteredBooks =
    selectedGenre === "All"
      ? booksData
      : booksData.filter((book) => book.genre === selectedGenre);

  const availableGenres = [...new Set(booksData.map((book) => book.genre))];

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const gradientStyle = {
    background: `
      radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, 
        ${colors.cream}20 0%, 
        ${colors.parchment} 20%, 
        ${colors.softBeige} 40%, 
        ${colors.lightSepia} 70%, 
        ${colors.mediumSepia} 90%, 
        ${colors.darkSepia} 100%
      )
    `,
  };

  return (
    <motion.div
      className="min-h-screen py-12 max-md:py-6 pb-16 relative overflow-hidden"
      style={gradientStyle}
      animate={{
        background: `
          radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, 
            ${colors.cream}20 0%, 
            ${colors.parchment} 20%, 
            ${colors.softBeige} 40%, 
            ${colors.lightSepia} 70%, 
            ${colors.mediumSepia} 90%, 
            ${colors.darkSepia} 100%
          )
        `,
      }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center p-4 min-h-screen flex flex-col justify-center items-center"
          >
            <motion.div
              variants={loadingVariants}
              animate="animate"
              className="w-14 h-14 border-4 border-t-transparent rounded-full mx-auto mb-6"
              style={{ borderColor: colors.inkBrown }}
            />
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontFamily: theme.fonts.button,
                color: colors.inkBrown,
              }}
              className="text-xl font-semibold mb-2"
            >
              Curating Collection
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.4 }}
              style={{ color: colors.deepSepia }}
              className="text-sm"
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
            className="container mx-auto px-4 max-sm:px-3 relative z-10"
          >
            <motion.h1
              variants={titleVariants}
              className="text-4xl max-sm:text-3xl font-bold mb-10 max-sm:mb-8 text-center"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.text.primary,
              }}
            >
              Published Works
            </motion.h1>

            <motion.div
              className="flex justify-center mb-12 max-sm:mb-8 gap-3 max-sm:gap-2 flex-wrap max-sm:px-2"
              variants={containerVariants}
            >
              {["All", ...availableGenres].map((genre) => (
                <motion.button
                  key={genre}
                  variants={genreButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-5 max-sm:px-3 py-2.5 max-sm:py-2 rounded-md transition-all cursor-pointer text-sm max-sm:text-xs font-medium ${
                    selectedGenre === genre
                      ? "text-white shadow-md"
                      : "hover:shadow-sm"
                  }`}
                  style={{
                    backgroundColor:
                      selectedGenre === genre
                        ? colors.inkBrown
                        : `${colors.cream}90`,
                    color:
                      selectedGenre === genre ? colors.cream : colors.inkBrown,
                    border: `1px solid ${
                      selectedGenre === genre
                        ? colors.inkBrown
                        : `${colors.mediumSepia}30`
                    }`,
                    fontFamily: theme.fonts.playful,
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
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-sm:gap-6"
                >
                  {filteredBooks.map((book) => (
                    <motion.div
                      key={book.id}
                      variants={bookCardVariants}
                      whileHover="hover"
                      className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
                      style={{
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor:
                            bookColors[book.id] || colors.gray800,
                        }}
                        className="relative h-60 max-md:h-full max-sm:h-48 w-full overflow-hidden group"
                      >
                        {/* Enhanced gradient overlay for better text visibility */}
                        <div
                          className="absolute inset-0 z-10"
                          style={{
                            background: `linear-gradient(to bottom, 
                              rgba(0,0,0,0.1) 0%, 
                              rgba(0,0,0,0.2) 40%, 
                              rgba(0,0,0,0.4) 70%, 
                              ${
                                bookColors[book.id]
                                  ? `${bookColors[book.id]}CC`
                                  : "rgba(0,0,0,0.7)"
                              } 100%)`,
                          }}
                        />

                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          layout="fill"
                          className="object-contain object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 max-sm:p-3 z-20">
                          <motion.h2
                            className="text-xl max-sm:text-lg font-bold text-white mb-1"
                            style={{
                              textShadow:
                                "0 2px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)",
                              fontFamily: theme.fonts.serifAlt,
                            }}
                          >
                            {book.title}
                          </motion.h2>
                          <div className="flex justify-between items-center mt-1">
                            <span
                              className="text-sm max-sm:text-xs text-white font-medium"
                              style={{
                                textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                                fontFamily: theme.fonts.playful,
                              }}
                            >
                              {book.publicationYear}
                            </span>
                            <span
                              className="text-xs px-2 py-1 rounded-full font-medium"
                              style={{
                                backgroundColor: "rgba(255,255,255,0.25)",
                                backdropFilter: "blur(8px)",
                                color: "white",
                                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                                border: "1px solid rgba(255,255,255,0.2)",
                                fontFamily: theme.fonts.playful,
                              }}
                            >
                              {book.genre}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 max-sm:p-5 flex flex-col h-auto">
                        <motion.p
                          className="text-gray-600 mb-4 max-sm:mb-3 line-clamp-3 text-sm max-sm:text-xs leading-relaxed"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                          style={{
                            fontFamily: theme.fonts.math,
                          }}
                        >
                          {book.description}
                        </motion.p>

                        <div className="flex flex-col justify-between h-36 max-md:h-28 gap-3 max-sm:gap-2 mt-auto">
                          {/* Purchase Links */}
                          <div className="flex flex-col gap-2">
                            {book.availability?.amazon && (
                              <motion.a
                                href={book.availability.amazonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-4 max-sm:px-3 py-2.5 max-sm:py-2 bg-gray-50 rounded-lg transition-colors text-sm max-sm:text-xs font-medium"
                                style={{ color: colors.gray800 }}
                                whileHover={{
                                  backgroundColor: colors.gray100,
                                }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center gap-3 max-sm:gap-2">
                                  <FaAmazon
                                    size={16}
                                    color="#FF9900"
                                    className="max-sm:w-3 max-sm:h-3"
                                  />
                                  <span
                                    style={{
                                      fontFamily: theme.fonts.button,
                                    }}
                                  >
                                    Buy on Amazon
                                  </span>
                                </div>
                                <IoIosArrowForward
                                  size={14}
                                  className="max-sm:w-3 max-sm:h-3"
                                />
                              </motion.a>
                            )}

                            {book.availability?.flipkart && (
                              <motion.a
                                href={book.availability.flipkartLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-4 max-sm:px-3 py-2.5 max-sm:py-2 bg-gray-50 rounded-lg transition-colors text-sm max-sm:text-xs font-medium"
                                style={{ color: colors.gray800 }}
                                whileHover={{
                                  backgroundColor: colors.gray100,
                                }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="flex items-center gap-3 max-sm:gap-2">
                                  <SiFlipkart
                                    size={16}
                                    color="#F8D706"
                                    className="max-sm:w-3 max-sm:h-3"
                                  />
                                  <span
                                    style={{
                                      fontFamily: theme.fonts.button,
                                    }}
                                  >
                                    Buy on Flipkart
                                  </span>
                                </div>
                                <IoIosArrowForward
                                  size={14}
                                  className="max-sm:w-3 max-sm:h-3"
                                />
                              </motion.a>
                            )}
                          </div>

                          {/* Read More Button - Full Width with Space Between */}
                          <motion.button
                            className="flex items-center justify-between w-full px-4 max-sm:px-3 py-2.5 max-sm:py-2 rounded-lg transition-colors text-sm max-sm:text-xs font-medium mt-2"
                            style={{
                              backgroundColor:
                                bookColors[book.id] || colors.gray800,
                              color: "white",
                            }}
                            whileHover={{
                              backgroundColor: bookColors[book.id]
                                ? `${bookColors[book.id]}dd`
                                : colors.gray700,
                              scale: 1.02,
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              // Handle read more functionality
                              console.log(`Read more about ${book.title}`);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <FaBookOpen
                                size={14}
                                className="max-sm:w-3 max-sm:h-3"
                              />
                              <span
                                style={{
                                  fontFamily: theme.fonts.button,
                                }}
                              >
                                Read More
                              </span>
                            </div>
                            <IoIosArrowForward
                              size={14}
                              className="max-sm:w-3 max-sm:h-3"
                            />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 max-sm:py-12"
                >
                  <motion.div
                    className="w-24 h-24 max-sm:w-20 max-sm:h-20 mx-auto mb-6 max-sm:mb-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${colors.softBeige}40` }}
                  >
                    <FaBookOpen
                      size={32}
                      color={colors.mediumSepia}
                      className="max-sm:w-6 max-sm:h-6"
                    />
                  </motion.div>
                  <h3
                    className="text-xl max-sm:text-lg font-semibold mb-2"
                    style={{
                      color: colors.inkBrown,
                      fontFamily: theme.fonts.heading,
                    }}
                  >
                    No books found
                  </h3>
                  <p
                    className="text-sm max-sm:text-xs opacity-70 max-sm:px-4"
                    style={{ color: colors.deepSepia }}
                  >
                    No books match the selected genre. Try selecting a different
                    category.
                  </p>
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
