"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "@/styles/theme";
import ColorThief from "colorthief";
import { FaAmazon } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import { useTheme } from "@/context/ThemeProvider";
import Head from "next/head";

const booksData = [
  {
    id: 1,
    title: "Grace In The Ether",
    genre: "Poetry",
    coverImage: "/book1.jpg",
    description:
      "Grace in the Ether, is a book written with a care for those who are lost in their bustling lives and fail to notice the grace that fleets around. This book is a probe of such subtle wonder that graces our lives- whether we deserve it or not because that's what it's kindness.",
    publicationYear: 2024,
    availability: {
      amazon: true,
      flipkart: true,
      amazonLink: "https://amzn.in/d/cfwFYBC",
      flipkartLink:
        "https://www.flipkart.com/grace-in-the-ether/p/itm3c127bbdbda7c?pid=9798894751412&lid=LSTBOK9798894751412P2YEUF&marketplace=FLIPKART&q=grace+in+the+ether&store=bks&srno=s_1_2&otracker=AS_QueryStore_OrganicAutoSuggest_1_14_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_14_na_na_na&fm=organic&iid=e25c3f35-efbc-425b-a708-69d275abb3be.9798894751412.SEARCH&ppt=hp&ppn=homepage&ssid=iph3gz7v9c0000001743357020378&qH=7405fb0126ddf153",
    },
  },
  {
    id: 2,
    title: "The Jumbled Flow",
    genre: "Collection",
    coverImage: "/book2.jpg",
    description:
      "Have you ever noticed how thoughts rarely arrive in a straight line? They mostly weave, collide, and drift — much like life itself. The Jumbled Flow was born from this very nature, a collection of poems spanning five years of wandering through emotions, reflections, and the intricate dance of human connections.",
    publicationYear: 2025,
    availability: {
      amazon: true,
      flipkart: true,
      amazonLink: "https://amzn.in/d/52NYNx1",
      flipkartLink:
        "https://www.flipkart.com/the-jumbled-flow/p/itmb57205713680f?pid=9789370462380&lid=LSTBOK9789370462380XP5YIV&marketplace=FLIPKART&q=The+jumbled+flow&store=search.flipkart.com&srno=s_1_1&otracker=search&otracker1=search&fm=organic&iid=5f44759e-e41d-4a1e-81c0-12b87c9847f9.9789370462380.SEARCH&ppt=pp&ppn=pp&ssid=g93258mxnk0000001743357061773&qH=2ae3bdb1fc65d920",
    },
  },
  {
    id: 3,
    title: "When The Sky Meets The Sea of Souls",
    genre: "Poetry",
    coverImage: "/book3.png",
    description:
      "Love is both a whisper and a storm, a quiet ache and a force that shapes us. When the Sky Meets the Sea of Souls is my poetic odyssey — 49 moments of love in its rawest forms. From self-discovery to healing, from the depth of solitude to the luminous unity of souls, this collection explores the spaces where love lives",
    publicationYear: 2025,
    availability: {
      amazon: true,
      flipkart: false,
      amazonLink: "https://amzn.in/d/2CNR8BG",
    },
  },
];

// Unique animation variants
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const bookCardVariants = {
  hidden: {
    opacity: 0,
    rotateY: -90,
    z: -100,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    z: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
  hover: {
    y: -20,
    rotateY: 5,
    rotateX: 5,
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
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
      damping: 15,
    },
  },
  hover: {
    scale: 1.1,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
      duration: 1,
    },
  },
};

function AuthorBooksPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [bookColors, setBookColors] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [colorsLoaded, setColorsLoaded] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  const theme = useTheme();

  // Mouse tracking for gradient effect
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
                console.error(
                  "Error extracting color from loaded image:",
                  error
                );
                resolve({
                  id: book.id,
                  color: "rgb(120,120,120)",
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
                console.error("Error extracting color:", error);
                resolve({
                  id: book.id,
                  color: "rgb(120,120,120)",
                });
              }
            };

            img.onerror = () => {
              console.error("Error loading image:", book.coverImage);
              resolve({
                id: book.id,
                color: "rgb(120,120,120)",
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
            ? "rgb(148,129,111)"
            : book.genre === "Collection"
            ? "rgb(66,123,122)"
            : "rgb(80,80,80)";
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

    const minLoadingTime = setTimeout(() => {
      if (colorsLoaded) {
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(minLoadingTime);
    };
  }, [colorsLoaded]);

  useEffect(() => {
    if (colorsLoaded) {
      const hideLoader = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(hideLoader);
    }
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

  // Loading animation variants
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

  const gradientStyle = {
    background: `
      radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, 
        ${colors.cream}40 0%, 
        ${colors.parchment} 15%, 
        ${colors.softBeige} 35%, 
        ${colors.lightSepia} 60%, 
        ${colors.mediumSepia} 85%, 
        ${colors.darkSepia} 100%
      )
    `,
  };

  return (
    <>
      <Head>
        <title>{`Published Works - Author's Books Collection`}</title>
        <meta
          name="description"
          content="Discover a collection of published books including poetry, collections, and more by the author."
        />
        <meta
          name="keywords"
          content="books, poetry, collection, published works, author books, Grace In The Ether, The Jumbled Flow, When The Sky Meets The Sea of Souls"
        />
        <meta
          property="og:title"
          content="Published Works - Author's Books Collection"
        />
        <meta
          property="og:description"
          content="Discover a collection of published books including poetry, collections, and more by the author."
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_WEB_URL}/my-books`}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Published Works - Author's Books Collection",
              url: `${process.env.NEXT_WEB_URL}/my-books`,
              description:
                "Discover a collection of published books including poetry, collections, and more by the author.",
              mainEntity: {
                "@type": "ItemList",
                itemListElement: booksData.map((book, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Book",
                    name: book.title,
                    yearPublished: book.publicationYear.toString(),
                    genre: book.genre,
                    description: book.description,
                  },
                })),
              },
            }),
          }}
        />
      </Head>

      <motion.div
        className="min-h-screen py-10 max-md:py-5 max-md:pb-10 pb-20 relative overflow-hidden"
        style={gradientStyle}
        animate={{
          background: `
            radial-gradient(circle at ${mouseX * 100}% ${mouseY * 100}%, 
              ${colors.cream}40 0%, 
              ${colors.parchment} 15%, 
              ${colors.softBeige} 35%, 
              ${colors.lightSepia} 60%, 
              ${colors.mediumSepia} 85%, 
              ${colors.darkSepia} 100%
            )
          `,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Floating background elements */}

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
                className="w-16 h-16 border-4 border-t-transparent rounded-full mx-auto mb-6"
                style={{ borderColor: colors.inkBrown }}
              />
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontFamily: theme.fonts.button,
                  color: colors.inkBrown,
                }}
                className="text-xl font-semibold mb-2"
              >
                Curating Literary Collection
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
              className="container mx-auto px-4 relative z-10"
            >
              <motion.h1
                variants={titleVariants}
                className="text-3xl font-bold mb-8 text-center"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.text.primary,
                  textShadow: `2px 2px 4px ${colors.cream}50`,
                }}
              >
                Published Works
              </motion.h1>

              <motion.div
                className="flex justify-center mb-10 space-x-4 flex-wrap"
                variants={containerVariants}
              >
                {["All", ...Object.keys(genreColors)].map((genre) => (
                  <motion.button
                    key={genre}
                    variants={genreButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2 rounded-[8px] transition-all cursor-pointer duration-300 mb-2 backdrop-blur-sm ${
                      selectedGenre === genre
                        ? "text-white shadow-lg"
                        : "hover:shadow-md"
                    }`}
                    style={{
                      backgroundColor:
                        selectedGenre === genre
                          ? colors.inkBrown
                          : `${colors.cream}80`,
                      color:
                        selectedGenre === genre
                          ? colors.cream
                          : colors.inkBrown,
                      border: `2px solid ${
                        selectedGenre === genre
                          ? colors.inkBrown
                          : colors.mediumSepia
                      }50`,
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {filteredBooks.map((book) => (
                      <motion.div
                        key={book.id}
                        variants={bookCardVariants}
                        whileHover="hover"
                        className="bg-white rounded-lg overflow-hidden shadow-lg backdrop-blur-sm"
                        style={{
                          borderRight: `8px solid ${
                            bookColors[book.id] || "#808080"
                          }`,
                          boxShadow: `0 10px 25px -5px ${
                            bookColors[book.id] || "#808080"
                          }30, 0 4px 6px -1px rgba(0, 0, 0, 0.1)`,
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <motion.div
                          className="relative h-48 w-full overflow-hidden"
                          style={{
                            backgroundColor: bookColors[book.id] || "#f0f0f0",
                          }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Image
                            src={book.coverImage}
                            alt={book.title}
                            layout="fill"
                            objectFit="contain"
                            className="absolute inset-0"
                          />
                        </motion.div>

                        <motion.div
                          className="text-white px-3 py-4 h-20"
                          style={{
                            backgroundColor: bookColors[book.id] || "#808080",
                          }}
                          whileHover={{
                            boxShadow: `inset 0 0 20px rgba(255,255,255,0.1)`,
                          }}
                        >
                          <motion.h2
                            className="text-xl font-bold"
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {book.title}
                          </motion.h2>
                          <p className="text-sm">
                            {book.genre} | {book.publicationYear}
                          </p>
                        </motion.div>

                        <div className="px-6 flex flex-col items-center justify-between py-4">
                          <motion.p
                            className="mb-4"
                            style={{ color: colors.nightBlue }}
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {book.description}
                          </motion.p>

                          <div className="w-full mb-4 flex items-center gap-2">
                            <h3
                              className="font-semibold mb-2"
                              style={{ color: colors.inkBrown }}
                            >
                              Buy Now:
                            </h3>
                            <div className="flex gap-4 flex-wrap">
                              {book.availability?.amazon && (
                                <motion.a
                                  href={book.availability.amazonLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-[6px] bg-white border-2 rounded-md transition-colors w-full md:w-auto justify-center text-sm"
                                  style={{ borderColor: colors.mediumSepia }}
                                  whileHover={{
                                    scale: 1.05,
                                    boxShadow: `0 5px 15px ${colors.mediumSepia}30`,
                                  }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <FaAmazon size={18} color={colors.moonGray} />
                                </motion.a>
                              )}

                              {book.availability?.flipkart && (
                                <motion.a
                                  href={book.availability.flipkartLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-[6px] bg-white border-2 rounded-md transition-colors w-full md:w-auto justify-center text-sm"
                                  style={{ borderColor: colors.mediumSepia }}
                                  whileHover={{
                                    scale: 1.05,
                                    boxShadow: `0 5px 15px ${colors.mediumSepia}30`,
                                  }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <SiFlipkart size={18} color={"#F8D706"} />
                                </motion.a>
                              )}
                            </div>
                          </div>

                          <motion.button
                            onClick={() => console.log("Learn more clicked")}
                            style={{
                              fontFamily: theme.fonts.body,
                              backgroundColor: colors.gray800,
                              color: theme.text.light,
                            }}
                            className="block w-full text-center px-4 py-2 rounded-sm transition-all cursor-pointer"
                            whileHover={{
                              backgroundColor: colors.gray700,
                              scale: 1.02,
                              boxShadow: `0 5px 15px ${colors.gray800}40`,
                            }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Learn More
                          </motion.button>
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
                    className="p-4 text-center"
                  >
                    <motion.h2
                      className="text-2xl font-bold mb-4"
                      style={{ color: colors.unavailable }}
                      animate={{
                        textShadow: [
                          `0 0 5px ${colors.unavailable}40`,
                          `0 0 10px ${colors.unavailable}60`,
                          `0 0 5px ${colors.unavailable}40`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Currently Unavailable
                    </motion.h2>

                    {availableGenres.length > 1 && (
                      <motion.div
                        className="mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="mb-3" style={{ color: colors.nightBlue }}>
                          Explore books available in these genres:
                        </p>
                        <ul className="list-disc list-inside text-left max-w-md mx-auto">
                          {availableGenres.map((genre, index) => (
                            <motion.li
                              key={genre}
                              className="mb-2"
                              style={{ color: colors.nightBlue }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.5 }}
                            >
                              <motion.button
                                onClick={() => setSelectedGenre(genre)}
                                className="font-medium hover:underline cursor-pointer"
                                whileHover={{
                                  scale: 1.05,
                                  color: colors.deepSepia,
                                }}
                              >
                                {genre}
                              </motion.button>
                              <span
                                className="text-sm ml-2"
                                style={{ color: colors.gray600 }}
                              >
                                (
                                {
                                  booksData.filter(
                                    (book) => book.genre === genre
                                  ).length
                                }{" "}
                                {booksData.filter(
                                  (book) => book.genre === genre
                                ).length === 1
                                  ? "book"
                                  : "books"}
                                )
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                        <motion.button
                          onClick={() => setSelectedGenre("All")}
                          className="mt-6 px-6 py-2 text-white rounded transition-colors"
                          style={{ backgroundColor: colors.gray800 }}
                          whileHover={{
                            backgroundColor: colors.gray700,
                            scale: 1.05,
                            boxShadow: `0 5px 15px ${colors.gray800}40`,
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View All Books
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default AuthorBooksPage;
