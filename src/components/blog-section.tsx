"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { colors, fonts } from "@/styles/theme";
import { blogs } from "@/lib/blogs";

export default function ModernBlogSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  useEffect(() => {

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % blogs.length;
        setDirection(1);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleSlideChange = (index: number) => {
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  // Parallax slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  // Staggered text animation
  const textVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay * 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  // Indicator animation variants
  const indicatorVariants = {
    inactive: {
      scale: 1,
      opacity: 0.5,
      transition: { duration: 0.3 },
    },
    active: {
      scale: 1.4,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.cream} 0%, ${colors.softEggshell} 50%, ${colors.parchment} 100%)`,
      }}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 md:w-48 md:h-48 rounded-full opacity-5"
          style={{ backgroundColor: colors.deepTeal }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 md:w-56 md:h-56 rounded-full opacity-5"
          style={{ backgroundColor: colors.purple }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-20 h-20 md:w-28 md:h-28 rounded-full opacity-3"
          style={{ backgroundColor: colors.gold }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with enhanced animation */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{
              fontFamily: fonts.heading,
              color: colors.penumbraBlack,
              textShadow: `0 2px 4px ${colors.penumbraBlack}10`,
            }}
          >
            Literary Insights
          </motion.h2>

          <motion.p
            className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed text-center"
            style={{
              color: colors.gray700,
              fontFamily: fonts.body,
              textShadow: `0 1px 2px ${colors.penumbraBlack}05`,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dive deep into the world of literature, writing, and storytelling
            through thought-provoking articles and insights.
          </motion.p>

          <motion.div
            className="mt-6 h-1 w-20 mx-auto rounded-full"
            style={{
              background: `linear-gradient(90deg, ${colors.deepSepia}, ${colors.gold})`,
            }}
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 80, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
          />
        </motion.div>

        {/* Parallax Slider Container */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-[400px] sm:h-[480px] md:h-[520px] lg:h-[580px] overflow-hidden rounded-2xl md:rounded-3xl">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <div
                  className="relative w-full h-full group cursor-pointer"
                  style={{
                    boxShadow: `0 20px 60px ${colors.penumbraBlack}20, 0 8px 24px ${colors.gray600}15`,
                  }}
                  onClick={() =>
                    window.open(`/insights/${blogs[activeIndex].slug}`, "_blank")
                  }
                >
                  {/* Image with parallax effect */}
                  <div className="relative w-full h-full overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <Image
                        src={blogs[activeIndex].imageUrl}
                        alt={blogs[activeIndex].title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                      />
                    </motion.div>

                    {/* Enhanced gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(135deg, ${colors.penumbraBlack}85 0%, ${colors.penumbraBlack}20 35%, ${colors.penumbraBlack}10 65%, ${colors.penumbraBlack}90 100%)`,
                      }}
                    />
                  </div>

                  {/* Content overlay with perfect text shadows */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12">
                    <div className="max-w-4xl">
                      {/* Tags with enhanced styling */}
                      <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        className="flex flex-wrap gap-2 sm:gap-3 mb-4"
                      >
                        {blogs[activeIndex].tags
                          .slice(0, 3)
                          .map((tag, index) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md"
                              style={{
                                backgroundColor: `${colors.cream}90`,
                                color: colors.penumbraBlack,
                                textShadow: `0 1px 2px ${colors.penumbraBlack}20`,
                                boxShadow: `0 2px 8px ${colors.penumbraBlack}15`,
                              }}
                            >
                              {tag}
                            </motion.span>
                          ))}
                      </motion.div>

                      {/* Title with perfect shadow */}
                      <motion.h3
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight"
                        style={{
                          fontFamily: fonts.heading,
                          color: colors.cream,
                          textShadow: `0 2px 8px ${colors.penumbraBlack}60, 0 4px 16px ${colors.penumbraBlack}40`,
                        }}
                      >
                        {blogs[activeIndex].title}
                      </motion.h3>

                      {/* Excerpt with shadow */}
                      <motion.p
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                        className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 leading-relaxed line-clamp-2 md:line-clamp-3"
                        style={{
                          color: colors.gray200,
                          fontFamily: fonts.body,
                          textShadow: `0 1px 4px ${colors.penumbraBlack}70, 0 2px 8px ${colors.penumbraBlack}50`,
                        }}
                      >
                        {blogs[activeIndex].excerpt}
                      </motion.p>

                      {/* Meta info with shadow */}
                      <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={4}
                        className="flex items-center gap-3 sm:gap-4 mb-6 text-xs sm:text-sm"
                        style={{
                          color: colors.gray300,
                          textShadow: `0 1px 3px ${colors.penumbraBlack}60`,
                        }}
                      >
                        <span className="font-medium">
                          {blogs[activeIndex].readTime}
                        </span>
                        <span className="opacity-70">•</span>
                        <span>
                          {new Date(
                            blogs[activeIndex].publishedAt
                          ).toLocaleDateString()}
                        </span>
                      </motion.div>

                      {/* Enhanced CTA Button */}
                      <motion.div
                        variants={textVariants}
                        initial="hidden"
                        animate="visible"
                        custom={5}
                      >
                        <Link
                          href={`/insights/${blogs[activeIndex].slug}`}
                          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                          style={{
                            backgroundColor: colors.gold,
                            color: colors.penumbraBlack,
                            fontFamily: fonts.button,
                            boxShadow: `0 4px 16px ${colors.gold}40, 0 2px 8px ${colors.penumbraBlack}20`,
                            textShadow: `0 1px 2px ${colors.penumbraBlack}20`,
                          }}
                        >
                          Read Article
                          <motion.svg
                            className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            whileHover={{ x: 3 }}
                            transition={{ duration: 0.2 }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M9 5l7 7-7 7"
                            />
                          </motion.svg>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Navigation Indicators */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-10">
            {blogs.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleSlideChange(index)}
                className="relative p-2 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  variants={indicatorVariants}
                  animate={index === activeIndex ? "active" : "inactive"}
                  className="relative"
                >
                  <div
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                      index === activeIndex ? "ring-2 ring-offset-2" : ""
                    }`}
                    style={{
                      backgroundColor:
                        index === activeIndex ? colors.gold : colors.gray400,
                      boxShadow:
                        index === activeIndex
                          ? `0 0 0 3px ${colors.gold}30, 0 2px 8px ${colors.penumbraBlack}20`
                          : `0 1px 3px ${colors.penumbraBlack}10`,
                    }}
                  />
                  {/* Active indicator pulse */}
                  {index === activeIndex && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: colors.gold }}
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </motion.div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Enhanced View All Link */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Link
            href="/insights"
            className="inline-flex items-center px-8 sm:px-10 py-4 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              backgroundColor: colors.penumbraBlack,
              color: colors.cream,
              fontFamily: fonts.button,
              boxShadow: `0 8px 24px ${colors.penumbraBlack}30, 0 4px 12px ${colors.penumbraBlack}20`,
              textShadow: `0 1px 2px ${colors.penumbraBlack}30`,
            }}
          >
            View All Articles
            <motion.svg
              className="ml-2 w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </motion.svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
