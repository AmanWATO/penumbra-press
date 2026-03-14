"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Book, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { booksData as books } from "@/lib/books";

export default function BooksShowcaseRevamped() {
  const theme = useTheme();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleNext = () => {
    setFeaturedIndex((prev) => (prev + 1) % books.length);
  };

  const handlePrev = () => {
    setFeaturedIndex((prev) => (prev - 1 + books.length) % books.length);
  };

  useEffect(() => {
    if (isHovering) return;

    const autoScroll = setInterval(() => {
      handleNext();
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(autoScroll);
  }, [isHovering, featuredIndex]);

  const featuredBook = books[featuredIndex];

  return (
    <section
      id="books"
      className="relative py-16 overflow-hidden"
      style={{ backgroundColor: theme.background.dark }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container mx-auto px-5 z-10 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-3xl md:text-5xl font-bold mb-2"
            style={{ fontFamily: theme.fonts.heading, color: theme.text.light }}
          >
            From My Desk to Your Hands
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ fontFamily: theme.fonts.body, color: theme.text.light }}
          >
            A curated selection of my published works. Find your next favorite
            story.
          </p>
        </motion.div>

        {/* Book Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 max-md:gap-8 items-center">
          {/* Featured Book Image */}
          <motion.div
            className="relative flex justify-center items-center"
            key={featuredBook.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={featuredBook.coverImage}
              alt={`Cover of ${featuredBook.title}`}
              width={320}
              height={400}
              className="rounded-lg shadow-2xl object-cover"
              style={{ boxShadow: `0 25px 50px -12px ${theme.colors.gold}40` }}
            />
          </motion.div>

          {/* Featured Book Details */}
          <motion.div
            key={featuredBook.id + "-details"}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3
              className="text-4xl font-bold mb-3 bg-clip-text text-transparent"
              style={{
                fontFamily: theme.fonts.heading,
                backgroundImage: `linear-gradient(to right, ${theme.colors.gold}, ${theme.colors.darkSepia})`,
              }}
            >
              {featuredBook.title}
            </h3>
            <p className="text-lg mb-6 line-clamp-5" style={{ color: theme.text.light, fontFamily: theme.fonts.body }}>
              {featuredBook.description}
            </p>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" style={{ color: theme.colors.gold }} />
                <span className="text-sm font-medium" style={{ color: theme.text.light, fontFamily: theme.fonts.body }}>
                  {featuredBook.genre}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" style={{ color: theme.colors.gold }} />
                <span className="text-sm font-medium" style={{ color: theme.text.light, fontFamily: theme.fonts.body }}>
                  {featuredBook.publicationYear}
                </span>
              </div>
            </div>

            <Link href="/my-books">
              <motion.button
                className="group relative px-8 py-4 rounded-full font-semibold text-lg overflow-hidden"
                style={{
                  backgroundColor: theme.background.secondary,
                  color: theme.text.primary,
                  fontFamily: theme.fonts.button,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Learn More
                  <Book className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${theme.colors.gold}, ${theme.colors.deepSepia})`,
                  }}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <motion.button
            onClick={handlePrev}
            className="p-3 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft style={{ color: theme.text.light }} />
          </motion.button>

          <div className="flex gap-3">
            {books.map((_, index) => (
              <button key={index} onClick={() => setFeaturedIndex(index)}>
                <motion.div
                  className="h-2.5 rounded-full"
                  initial={{ width: 20 }}
                  animate={{
                    width: index === featuredIndex ? 40 : 20,
                    backgroundColor:
                      index === featuredIndex
                        ? theme.colors.gold
                        : theme.colors.gray600,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </button>
            ))}
          </div>

          <motion.button
            onClick={handleNext}
            className="p-3 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight style={{ color: theme.text.light }} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
