"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { colors, fonts } from "@/styles/theme";
import { blogs } from "@/lib/blogs";

export default function BlogPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

  // Filter blogs based on selected tag
  const filteredBlogs = blogs.filter((blog) => {
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    return matchesTag;
  });

  // Close filter when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTagSelect = (tag: string | null) => {
    setSelectedTag(tag);
    setIsFilterOpen(false);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${colors.softEggshell} 0%, ${colors.gray100} 50%, ${colors.parchment} 100%)`,
      }}
    >
      {/* Header */}
      <section
        className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.penumbraBlack} 0%, ${colors.nightBlue} 100%)`,
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{
                fontFamily: fonts.heading,
                color: colors.gray100,
              }}
            >
              Literary Insights
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto px-4"
              style={{
                fontFamily: fonts.body,
                color: colors.gray200,
              }}
            >
              Explore the depths of literature, storytelling, and the written
              word through our collection of thoughtful articles and insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="text-sm font-medium"
                  style={{
                    fontFamily: fonts.body,
                    color: colors.gray700,
                  }}
                >
                  Showing {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''}
                </span>
                {selectedTag && (
                  <motion.span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: colors.lightSepia,
                      color: colors.penumbraBlack,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {selectedTag}
                  </motion.span>
                )}
              </div>

              {/* Filter Button */}
              <div className="relative" ref={filterRef}>
                <motion.button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 hover:shadow-sm"
                  style={{
                    backgroundColor: colors.cream,
                    color: colors.penumbraBlack,
                    border: `1px solid ${colors.gray300}`,
                    fontFamily: fonts.body,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
                    />
                  </svg>
                  <span className="text-sm font-medium">Filter</span>
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isFilterOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.button>

                {/* Filter Popup */}
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-64 rounded-xl shadow-2xl border z-50 overflow-hidden"
                      style={{
                        backgroundColor: colors.cream,
                        border: `1px solid ${colors.gray300}`,
                      }}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4">
                        <h3
                          className="text-sm font-semibold mb-3"
                          style={{
                            fontFamily: fonts.heading,
                            color: colors.penumbraBlack,
                          }}
                        >
                          Filter by Category
                        </h3>

                        {/* All Articles Option */}
                        <motion.button
                          onClick={() => handleTagSelect(null)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 mb-1 ${
                            !selectedTag ? "font-medium" : "font-normal"
                          }`}
                          style={{
                            backgroundColor: !selectedTag ? colors.lightSepia : "transparent",
                            color: colors.penumbraBlack,
                          }}
                          whileHover={{
                            backgroundColor: !selectedTag ? colors.lightSepia : colors.gray200,
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span>All Articles</span>
                            <span
                              className="text-xs"
                              style={{ color: colors.gray600 }}
                            >
                              {blogs.length}
                            </span>
                          </div>
                        </motion.button>

                        {/* Divider */}
                        <div
                          className="h-px my-2"
                          style={{ backgroundColor: colors.gray300 }}
                        />

                        {/* Tag Options */}
                        <div className="max-h-48 overflow-y-auto">
                          {allTags.map((tag) => {
                            const tagCount = blogs.filter((blog) =>
                              blog.tags.includes(tag)
                            ).length;

                            return (
                              <motion.button
                                key={tag}
                                onClick={() => handleTagSelect(tag)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 mb-1 ${
                                  selectedTag === tag ? "font-medium" : "font-normal"
                                }`}
                                style={{
                                  backgroundColor: selectedTag === tag ? colors.gold : "transparent",
                                  color: colors.penumbraBlack,
                                }}
                                whileHover={{
                                  backgroundColor: selectedTag === tag ? colors.gold : colors.gray200,
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <span>{tag}</span>
                                  <span
                                    className="text-xs"
                                    style={{ color: colors.gray600 }}
                                  >
                                    {tagCount}
                                  </span>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group h-full"
              >
                <Link href={`/insights/${blog.slug}`} className="block h-full">
                  <div
                    className="rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 sm:hover:-translate-y-2 bg-white h-full flex flex-col"
                    style={{
                      backgroundColor: colors.cream,
                      border: `1px solid ${colors.gray300}`,
                    }}
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to bottom, transparent 60%, ${colors.penumbraBlack}10)`,
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: colors.lightSepia,
                              color: colors.penumbraBlack,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: colors.gray400,
                              color: colors.gray700,
                            }}
                          >
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 line-clamp-2 group-hover:text-opacity-80 transition-all duration-300 flex-shrink-0"
                        style={{
                          fontFamily: fonts.heading,
                          color: colors.penumbraBlack,
                        }}
                      >
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p
                        className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 flex-grow"
                        style={{
                          fontFamily: fonts.body,
                          color: colors.gray700,
                        }}
                      >
                        {blog.excerpt}
                      </p>

                      {/* Meta */}
                      <div
                        className="flex items-center justify-between text-xs mt-auto pt-2 sm:pt-3 border-t flex-shrink-0"
                        style={{
                          color: colors.gray600,
                          borderColor: colors.gray300,
                        }}
                      >
                        <span style={{ fontFamily: fonts.body }}>
                          {blog.readTime}
                        </span>
                        <span style={{ fontFamily: fonts.body }}>
                          {new Date(blog.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* No Results */}
          {filteredBlogs.length === 0 && (
            <motion.div
              className="text-center py-12 sm:py-16 md:py-20 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-xl sm:text-2xl font-bold mb-4"
                style={{
                  fontFamily: fonts.heading,
                  color: colors.penumbraBlack,
                }}
              >
                No articles found
              </h3>
              <p
                className="text-sm sm:text-base"
                style={{
                  fontFamily: fonts.body,
                  color: colors.gray700,
                }}
              >
                Try selecting a different category to explore our articles.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}