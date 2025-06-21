
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { colors, fonts } from "@/styles/theme";
import { Blog, getRecentBlogs } from "@/lib/blogs";

interface BlogPostPageProps {
  blog: Blog;
}

export default function BlogPostPage({ blog }: BlogPostPageProps) {
  const recentBlogs = getRecentBlogs(3).filter(b => b.id !== blog.id);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${colors.softEggshell} 0%, ${colors.gray100} 50%, ${colors.parchment} 100%)`,
      }}
    >
      {/* Header */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center mb-8 font-medium transition-colors duration-300 hover:opacity-70"
              style={{
                color: colors.penumbraBlack,
                fontFamily: fonts.body,
              }}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Articles
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hero Image and Title */}
      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            {/* Hero Image */}
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: colors.gold,
                    color: colors.penumbraBlack,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{
                fontFamily: fonts.heading,
                color: colors.penumbraBlack,
              }}
            >
              {blog.title}
            </h1>

            {/* Meta Info */}
            <div
              className="flex flex-wrap items-center gap-4 pb-8 border-b"
              style={{
                borderColor: colors.gray400,
                color: colors.gray600,
                fontFamily: fonts.body,
              }}
            >
              <span>{blog.readTime}</span>
              <span>•</span>
              <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div
              className="prose prose-lg max-w-none"
              style={{
                fontFamily: fonts.body,
                color: colors.gray800,
              }}
            >
              {blog.content.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-lg leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  style={{
                    fontFamily: fonts.body,
                    color: colors.gray800,
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Share Section */}
            <motion.div
              className="mt-16 pt-8 border-t"
              style={{ borderColor: colors.gray400 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{
                  fontFamily: fonts.heading,
                  color: colors.penumbraBlack,
                }}
              >
                Share this article
              </h3>
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: colors.penumbraBlack,
                    color: colors.gray100,
                    fontFamily: fonts.button,
                  }}
                >
                  Share
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {recentBlogs.length > 0 && (
        <section
          className="py-20"
          style={{
            backgroundColor: colors.penumbraBlack,
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2
                className="text-3xl font-bold text-center mb-12"
                style={{
                  fontFamily: fonts.heading,
                  color: colors.gray100,
                }}
              >
                More Articles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {recentBlogs.map((relatedBlog, index) => (
                  <motion.div
                    key={relatedBlog.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <Link href={`/blog/${relatedBlog.slug}`}>
                      <div className="group">
                        <div className="relative h-48 rounded-xl overflow-hidden mb-4">
                          <Image
                            src={relatedBlog.imageUrl}
                            alt={relatedBlog.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <h3
                          className="text-lg font-bold mb-2 group-hover:opacity-80 transition-opacity duration-300"
                          style={{
                            fontFamily: fonts.heading,
                            color: colors.gray100,
                          }}
                        >
                          {relatedBlog.title}
                        </h3>
                        <p
                          className="text-sm line-clamp-2"
                          style={{
                            fontFamily: fonts.body,
                            color: colors.gray300,
                          }}
                        >
                          {relatedBlog.excerpt}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
