"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { colors, fonts } from "@/styles/theme";
import { FaAmazon, FaBookOpen } from "react-icons/fa";
import { SiFlipkart } from "react-icons/si";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";
import { booksData } from "@/lib/books";

function AuthorPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [expandedBook, setExpandedBook] = useState<number | null>(null);

  const availableGenres = [...new Set(booksData.map((book) => book.genre))];

  const filteredBooks =
    selectedGenre === "All"
      ? booksData
      : booksData.filter((book) => book.genre === selectedGenre);

  return (
    <section style={{ backgroundColor: colors.gray100 }} className="w-screen">
      <div
        className="mb-8 md:mb-10  pt-12 pb-12 md:pt-16 md:pb-10 flex flex-col justify-center items-center  w-full "
        style={{
          background: `linear-gradient(135deg, ${colors.penumbraBlack} 0%, ${colors.nightBlue} 100%)`,
        }}
      >
        <h1
          className="text-3xl sm:text-4xl md:text-5xl text-center font-bold mb-4"
          style={{
            fontFamily: fonts.heading,
            color: colors.gray100,
          }}
        >
          Published Works
        </h1>
        <p
          className="text-base sm:text-lg md:text-xl leading-relaxed text-center max-w-2xl"
          style={{
            fontFamily: fonts.body,
            color: colors.gray200,
          }}
        >
          Explore the depths of literature, storytelling, and the written word
          through our collection of published works.
        </p>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Section */}
        <section className="mb-8 md:mb-10">
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center gap-3">
              <span
                className="text-base font-medium"
                style={{
                  fontFamily: fonts.body,
                  color: colors.gray700,
                }}
              >
                Showing {filteredBooks.length} book
                {filteredBooks.length !== 1 ? "s" : ""}
              </span>
              {selectedGenre !== "All" && (
                <motion.span
                  className="px-3 py-1 cursor-pointer rounded-full text-xs md:text-sm font-medium"
                  style={{
                    backgroundColor: colors.lightSepia,
                    color: colors.penumbraBlack,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedGenre}
                </motion.span>
              )}
            </div>

            {/* Genre Buttons */}
            <div className="flex gap-2">
              {["All", ...availableGenres].map((genre) => (
                <motion.button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className="px-4 py-2 cursor-pointer rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor:
                      selectedGenre === genre
                        ? colors.penumbraBlack
                        : colors.cream,
                    color:
                      selectedGenre === genre
                        ? colors.cream
                        : colors.penumbraBlack,
                    fontFamily: fonts.body,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {genre}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Books Grid - Unique Split Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGenre}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-0"
          >
            {filteredBooks.map((book, index) => {
              const isExpanded = expandedBook === book.id;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`flex flex-col ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } border-b last:border-b-0`}
                  style={{
                    borderColor: colors.gray300,
                  }}
                >
                  {/* Book Cover Section */}
                  <div
                    className="w-full lg:w-2/5 p-6 lg:p-10 flex items-center justify-center"
                    style={{
                      backgroundColor: isEven
                        ? `${colors.deepSepia}08`
                        : `${colors.penumbraBlack}08`,
                    }}
                  >
                    <motion.div
                      className="relative w-48 md:w-56 lg:w-64 flex-shrink-0"
                      whileHover={{ y: -8, rotate: isEven ? 2 : -2 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="relative rounded-lg overflow-hidden shadow-xl"
                        style={{ aspectRatio: "2/3" }}
                      >
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          fill
                          className="object-cover"
                        />
                        {/* Genre badge */}
                        <div
                          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: colors.deepSepia,
                            color: colors.cream,
                            fontFamily: fonts.button,
                          }}
                        >
                          {book.genre}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Book Details Section */}
                  <div className="flex-1 p-6 lg:p-10 flex flex-col justify-center">
                    <h2
                      className="text-xl md:text-2xl font-bold mb-3"
                      style={{
                        color: colors.penumbraBlack,
                        fontFamily: fonts.heading,
                      }}
                    >
                      {book.title}
                    </h2>

                    <p
                      className="text-sm md:text-base leading-relaxed mb-4"
                      style={{ color: colors.gray700, fontFamily: fonts.body }}
                    >
                      {isExpanded
                        ? book.description
                        : `${book.description.slice(0, 160)}...`}
                    </p>

                    <button
                      onClick={() =>
                        setExpandedBook(isExpanded ? null : book.id)
                      }
                      className="text-sm font-medium mb-5 flex items-center gap-1.5 self-start"
                      style={{
                        color: colors.deepSepia,
                        fontFamily: fonts.button,
                      }}
                    >
                      {isExpanded ? "Show Less" : "Read More"}
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                      />
                    </button>

                    {/* Meta Info */}
                    <div
                      className="flex items-center gap-4 mb-5 text-sm"
                      style={{ color: colors.gray500 }}
                    >
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span style={{ fontFamily: fonts.body }}>
                          {book.publicationYear}
                        </span>
                      </div>
                    </div>

                    {/* Purchase Links */}
                    <div className="flex flex-wrap gap-3">
                      {book.availability?.amazon && (
                        <a
                          href={book.availability.amazonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-md"
                          style={{
                            backgroundColor: colors.penumbraBlack,
                            color: colors.cream,
                            fontFamily: fonts.button,
                          }}
                        >
                          <FaAmazon size={16} />
                          Amazon
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}

                      {book.availability?.flipkart && (
                        <a
                          href={book.availability.flipkartLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-md"
                          style={{
                            backgroundColor: colors.white,
                            color: colors.penumbraBlack,
                            border: `1px solid ${colors.gray300}`,
                            fontFamily: fonts.button,
                          }}
                        >
                          <SiFlipkart size={16} />
                          Flipkart
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredBooks.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaBookOpen
              size={48}
              className="mx-auto mb-4 opacity-30"
              style={{ color: colors.deepSepia }}
            />
            <p style={{ color: colors.gray600, fontFamily: fonts.body }}>
              No books found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default AuthorPage;
