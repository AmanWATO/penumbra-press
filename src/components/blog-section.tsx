
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { colors, fonts } from "@/styles/theme";
import { blogs } from "@/lib/blogs";

export default function BlogSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogs.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blogs.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blogs.length) % blogs.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.softEggshell} 0%, ${colors.gray100} 50%, ${colors.parchment} 100%)`,
      }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-10 blur-2xl"
        style={{ backgroundColor: colors.deepTeal }}
      />
      <div
        className="absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: colors.purple }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl sm:text-5xl font-bold mb-6"
            style={{
              fontFamily: fonts.heading,
              color: colors.penumbraBlack,
            }}
          >
            Literary Insights
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{
              color: colors.gray700,
            }}
          >
            Dive deep into the world of literature, writing, and storytelling
            through thought-provoking articles and insights.
          </p>
          <div
            className="mt-6 h-1 rounded-full max-w-24 mx-auto"
            style={{
              background: `linear-gradient(90deg, ${colors.deepSepia}, ${colors.gold})`,
            }}
          />
        </motion.div>

        {/* Blog Slideshow */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={blogs[currentSlide].imageUrl}
                    alt={blogs[currentSlide].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="max-w-4xl">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex flex-wrap gap-2 mb-4"
                      >
                        {blogs[currentSlide].tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                              color: colors.gray100,
                              backdropFilter: "blur(10px)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                      
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-2xl md:text-4xl font-bold mb-4"
                        style={{
                          fontFamily: fonts.heading,
                          color: colors.gray100,
                        }}
                      >
                        {blogs[currentSlide].title}
                      </motion.h3>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-lg md:text-xl mb-6 max-w-3xl"
                        style={{
                          fontFamily: fonts.body,
                          color: colors.gray200,
                        }}
                      >
                        {blogs[currentSlide].excerpt}
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex items-center gap-4 mb-6"
                      >
                        <span
                          className="text-sm"
                          style={{ color: colors.gray300 }}
                        >
                          {blogs[currentSlide].readTime}
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: colors.gray300 }}
                        >
                          {new Date(blogs[currentSlide].publishedAt).toLocaleDateString()}
                        </span>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                      >
                        <Link
                          href={`/blog/${blogs[currentSlide].slug}`}
                          className="inline-flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                          style={{
                            backgroundColor: colors.gold,
                            color: colors.penumbraBlack,
                            fontFamily: fonts.button,
                          }}
                        >
                          Read Article
                          <svg
                            className="ml-2 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              color: colors.gray100,
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              color: colors.gray100,
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 gap-3">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "scale-125" : "hover:scale-110"
                }`}
                style={{
                  backgroundColor: index === currentSlide ? colors.gold : colors.gray400,
                }}
              />
            ))}
          </div>
        </div>

        {/* View All Blogs Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: colors.penumbraBlack,
              color: colors.gray100,
              fontFamily: fonts.button,
            }}
          >
            View All Articles
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
