
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { colors, fonts } from "@/styles/theme";
import { blogs } from "@/lib/blogs";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)));

  // Filter blogs based on search and tag
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${colors.softEggshell} 0%, ${colors.gray100} 50%, ${colors.parchment} 100%)`,
      }}
    >
      {/* Header */}
      <section
        className="py-20 relative overflow-hidden"
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
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
              style={{
                fontFamily: fonts.heading,
                color: colors.gray100,
              }}
            >
              Literary Chronicles
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
              style={{
                fontFamily: fonts.body,
                color: colors.gray200,
              }}
            >
              Explore the depths of literature, storytelling, and the written word
              through our collection of thoughtful articles and insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 rounded-full text-lg border-2 focus:outline-none focus:ring-2 transition-all duration-300"
                  style={{
                    borderColor: colors.gray400,
                    backgroundColor: colors.gray100,
                    color: colors.penumbraBlack,
                    fontFamily: fonts.body,
                  }}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: colors.gray600 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  !selectedTag ? "scale-105" : "hover:scale-105"
                }`}
                style={{
                  backgroundColor: !selectedTag ? colors.penumbraBlack : colors.gray300,
                  color: !selectedTag ? colors.gray100 : colors.penumbraBlack,
                  fontFamily: fonts.button,
                }}
              >
                All Topics
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedTag === tag ? "scale-105" : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: selectedTag === tag ? colors.gold : colors.gray300,
                    color: selectedTag === tag ? colors.penumbraBlack : colors.penumbraBlack,
                    fontFamily: fonts.button,
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <Link href={`/blog/${blog.slug}`}>
                  <div
                    className="rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white"
                    style={{
                      backgroundColor: colors.gray100,
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: colors.gray300,
                              color: colors.penumbraBlack,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3
                        className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-opacity-80 transition-all duration-300"
                        style={{
                          fontFamily: fonts.heading,
                          color: colors.penumbraBlack,
                        }}
                      >
                        {blog.title}
                      </h3>

                      {/* Excerpt */}
                      <p
                        className="text-sm leading-relaxed mb-4 line-clamp-3"
                        style={{
                          fontFamily: fonts.body,
                          color: colors.gray700,
                        }}
                      >
                        {blog.excerpt}
                      </p>

                      {/* Meta */}
                      <div
                        className="flex items-center justify-between text-xs"
                        style={{ color: colors.gray600 }}
                      >
                        <span>{blog.readTime}</span>
                        <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
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
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-2xl font-bold mb-4"
                style={{
                  fontFamily: fonts.heading,
                  color: colors.penumbraBlack,
                }}
              >
                No articles found
              </h3>
              <p
                style={{
                  fontFamily: fonts.body,
                  color: colors.gray700,
                }}
              >
                Try adjusting your search terms or selected tags.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
