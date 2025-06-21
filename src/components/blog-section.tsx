
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
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blogs.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blogs.length) % blogs.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 12000);
  };

  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${colors.cream} 0%, ${colors.softEggshell} 30%, ${colors.parchment} 70%, ${colors.lightSepia} 100%)`,
      }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute top-16 left-8 w-24 h-24 md:w-40 md:h-40 rounded-full opacity-8 blur-2xl"
        style={{ backgroundColor: colors.deepTeal }}
      />
      <div
        className="absolute bottom-16 right-8 w-32 h-32 md:w-56 md:h-56 rounded-full opacity-8 blur-3xl"
        style={{ backgroundColor: colors.purple }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
            style={{
              fontFamily: fonts.heading,
              color: colors.penumbraBlack,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Literary Insights
          </motion.h2>
          <motion.p
            className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{
              color: colors.gray700,
              fontFamily: fonts.body,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Dive deep into the world of literature, writing, and storytelling
            through thought-provoking articles and insights.
          </motion.p>
          <motion.div
            className="mt-6 h-1 rounded-full max-w-24 mx-auto"
            style={{
              background: `linear-gradient(90deg, ${colors.deepSepia}, ${colors.gold})`,
            }}
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          />
        </motion.div>

        {/* Blog Slideshow */}
        <motion.div
          className="relative max-w-6xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div 
            className="relative h-[450px] md:h-[550px] lg:h-[600px] rounded-2xl overflow-hidden"
            style={{
              boxShadow: `0 20px 60px ${colors.gray800}20, 0 8px 25px ${colors.gray600}15`,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94] 
                }}
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
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${colors.penumbraBlack}60 0%, transparent 40%, transparent 60%, ${colors.penumbraBlack}70 100%)`,
                    }}
                  />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
                    <div className="max-w-4xl">
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-wrap gap-2 mb-3 md:mb-4"
                      >
                        {blogs[currentSlide].tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                            style={{
                              backgroundColor: `${colors.cream}80`,
                              color: colors.penumbraBlack,
                              backdropFilter: "blur(10px)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                      
                      <motion.h3
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="text-xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 leading-tight"
                        style={{
                          fontFamily: fonts.heading,
                          color: colors.cream,
                        }}
                      >
                        {blogs[currentSlide].title}
                      </motion.h3>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-sm md:text-lg lg:text-xl mb-4 md:mb-6 max-w-3xl leading-relaxed"
                        style={{
                          fontFamily: fonts.body,
                          color: colors.gray200,
                        }}
                      >
                        {blogs[currentSlide].excerpt}
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="flex items-center gap-4 mb-4 md:mb-6"
                      >
                        <span
                          className="text-xs md:text-sm"
                          style={{ color: colors.gray300 }}
                        >
                          {blogs[currentSlide].readTime}
                        </span>
                        <span
                          className="text-xs md:text-sm"
                          style={{ color: colors.gray300 }}
                        >
                          {new Date(blogs[currentSlide].publishedAt).toLocaleDateString()}
                        </span>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      >
                        <Link
                          href={`/blog/${blogs[currentSlide].slug}`}
                          className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
                          style={{
                            backgroundColor: colors.gold,
                            color: colors.penumbraBlack,
                            fontFamily: fonts.button,
                          }}
                        >
                          Read Article
                          <svg
                            className="ml-2 w-3 h-3 md:w-4 md:h-4"
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
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: `${colors.cream}90`,
              backdropFilter: "blur(10px)",
              color: colors.penumbraBlack,
              border: `1px solid ${colors.gray300}`,
            }}
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: `${colors.cream}90`,
              backdropFilter: "blur(10px)",
              color: colors.penumbraBlack,
              border: `1px solid ${colors.gray300}`,
            }}
          >
            <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-6 md:mt-8 gap-2 md:gap-3">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "scale-125" : "hover:scale-110"
                }`}
                style={{
                  backgroundColor: index === currentSlide ? colors.gold : colors.gray400,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* View All Blogs Link */}
        <motion.div
          className="text-center mt-10 md:mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center px-6 md:px-8 py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: colors.penumbraBlack,
              color: colors.cream,
              fontFamily: fonts.button,
            }}
          >
            View All Articles
            <svg
              className="ml-2 w-3 h-3 md:w-4 md:h-4"
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
