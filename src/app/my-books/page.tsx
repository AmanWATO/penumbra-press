"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { colors } from "@/styles/theme";
import ColorThief from "colorthief";
import { FaAmazon } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import { useTheme } from "@/context/ThemeProvider";

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

export default function AuthorBooksPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [bookColors, setBookColors] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [colorsLoaded, setColorsLoaded] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

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
    }, 5000); // 5 second fallback

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

  return (
    <div
      className="min-h-screen py-10 max-md:py-5 max-md:pb-10 pb-20"
      style={{ backgroundColor: colors?.parchment }}
    >
      {isLoading ? (
        <div
          style={{ backgroundColor: colors?.parchment }}
          className="text-center p-4 "
        >
          <div className="w-10 h-10 border-4 border-[#1d1d1d] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3
            style={{
              fontFamily: theme.fonts.button,
            }}
            className="text-xl font-semibold text-[#1d1d1d] mb-2"
          >
            Loading Books
          </h3>
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <h1
            data-aos="fade-down"
            className="text-3xl font-bold mb-8 text-center"
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.text.primary,
            }}
          >
            Published Works
          </h1>

          <div className="flex justify-center mb-10 space-x-4 flex-wrap">
            {["All", ...Object.keys(genreColors)].map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-[8px] transition-all cursor-pointer duration-300 mb-2 ${
                  selectedGenre === genre
                    ? "bg-[#1d1d1d] text-[#f0ebe0]"
                    : "bg-[#f1efe2] text-[#1d1d1d] hover:bg-[#dfdcd0]"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  data-aos="fade-up"
                  data-aos-delay={book.id * 100}
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                  style={{
                    borderRight: `8px solid ${
                      bookColors[book.id] || "#808080"
                    }`,
                    boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px ${
                      bookColors[book.id] || "#808080"
                    }50`,
                  }}
                >
                  <div
                    className="relative h-48 w-full"
                    style={{
                      backgroundColor: bookColors[book.id] || "#f0f0f0",
                    }}
                  >
                    <Image
                      src={book.coverImage}
                      alt={book.title}
                      layout="fill"
                      objectFit="contain"
                      className="absolute inset-0"
                    />
                  </div>
                  <div
                    className="text-white px-3 py-4 h-20"
                    style={{
                      backgroundColor: bookColors[book.id] || "#808080",
                    }}
                  >
                    <h2 className="text-xl font-bold">{book.title}</h2>
                    <p className="text-sm">
                      {book.genre} | {book.publicationYear}
                    </p>
                  </div>
                  <div className="px-6 flex flex-col items-center justify-between py-4">
                    <p className="text-[#232128] mb-4">{book.description}</p>

                    <div className="w-full mb-4 flex items-center gap-2">
                      <h3 className="text-[#1d1d1d]0 font-semibold mb-2">
                        Buy Now:
                      </h3>
                      <div className="flex gap-4 flex-wrap">
                        {book.availability?.amazon && (
                          <a
                            href={book.availability.amazonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-[6px] bg-white border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors w-full md:w-auto justify-center text-sm"
                            style={{ borderColor: colors.mediumSepia }}
                          >
                            <FaAmazon size={18} color={colors.moonGray} />
                          </a>
                        )}

                        {book.availability?.flipkart && (
                          <a
                            href={book.availability.flipkartLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-[6px] bg-white border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors w-full md:w-auto justify-center text-sm"
                            style={{ borderColor: colors.mediumSepia }}
                          >
                            <SiFlipkart size={18} color={"#F8D706"} />
                          </a>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => console.log("object")}
                      style={{
                        fontFamily: theme.fonts.body,
                        color: theme.text.light,
                      }}
                      className="block w-full text-center px-4 py-2 bg-[#5d5a4e]  rounded-sm hover:bg-[#7d7a6e] transition-colors cursor-pointer"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div data-aos="fade-up" className="p-4 text-center">
              <h2
                className="text-2xl font-bold mb-4"
                style={{ color: colors.unavailable }}
              >
                Currently Unavailable
              </h2>

              {availableGenres.length > 1 && (
                <div className="mt-4">
                  <p className="mb-3 text-[#232128]">
                    Explore books available in these genres:
                  </p>
                  <ul className="list-disc list-inside text-left max-w-md mx-auto">
                    {availableGenres.map((genre) => (
                      <li key={genre} className="mb-2 text-[#232128]">
                        <button
                          onClick={() => setSelectedGenre(genre)}
                          className="font-medium hover:underline cursor-pointer"
                        >
                          {genre}
                        </button>
                        <span className="text-sm text-gray-600 ml-2">
                          (
                          {
                            booksData.filter((book) => book.genre === genre)
                              .length
                          }{" "}
                          {booksData.filter((book) => book.genre === genre)
                            .length === 1
                            ? "book"
                            : "books"}
                          )
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedGenre("All")}
                    className="mt-6 px-6 py-2 bg-[#5d5a4e] text-white rounded hover:bg-[#7d7a6e] transition-colors"
                  >
                    View All Books
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
