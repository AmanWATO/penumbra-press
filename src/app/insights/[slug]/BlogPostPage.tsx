"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { colors, fonts } from "@/styles/theme";
import { Blog, getRecentBlogs } from "@/lib/blogs";
import Head from "next/head";

interface BlogPostPageProps {
  blog: Blog;
}

export default function BlogPostPage({ blog }: BlogPostPageProps) {
  const recentBlogs = getRecentBlogs(3).filter((b) => b.id !== blog.id);

  // Function to render HTML content properly
  const renderContent = (content: string) => {
    // Split content into paragraphs and process each one
    const paragraphs = content
      .split("\n\n")
      .filter((paragraph) => paragraph.trim());

    return paragraphs.map((paragraph, index) => {
      let processedParagraph = paragraph.trim();

      // Handle different markdown/HTML elements
      if (processedParagraph.startsWith("# ")) {
        // H1 heading
        return (
          <motion.h1
            key={index}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 mt-12 first:mt-0 leading-tight"
            style={{
              fontFamily: fonts.heading,
              color: colors.penumbraBlack,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
          >
            {processedParagraph.replace("# ", "")}
          </motion.h1>
        );
      }

      if (processedParagraph.startsWith("## ")) {
        // H2 heading
        return (
          <motion.h2
            key={index}
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 mt-10 first:mt-0 leading-tight"
            style={{
              fontFamily: fonts.heading,
              color: colors.penumbraBlack,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
          >
            {processedParagraph.replace("## ", "")}
          </motion.h2>
        );
      }

      if (processedParagraph.startsWith("### ")) {
        // H3 heading
        return (
          <motion.h3
            key={index}
            className="text-lg sm:text-xl md:text-2xl font-bold mb-3 mt-8 first:mt-0 leading-tight"
            style={{
              fontFamily: fonts.heading,
              color: colors.penumbraBlack,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
          >
            {processedParagraph.replace("### ", "")}
          </motion.h3>
        );
      }

      // Handle bold text **text**
      processedParagraph = processedParagraph.replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-bold" style="color: ' +
          colors.penumbraBlack +
          '">$1</strong>'
      );

      // Handle italic text *text*
      processedParagraph = processedParagraph.replace(
        /\*(.*?)\*/g,
        '<em class="italic">$1</em>'
      );

      // Handle links [text](url)
      processedParagraph = processedParagraph.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="font-medium hover:opacity-70 transition-opacity duration-300 underline underline-offset-2" style="color: ' +
          colors.deepTeal +
          '">$1</a>'
      );

      // Handle inline code `code`
      processedParagraph = processedParagraph.replace(
        /`([^`]+)`/g,
        '<code class="px-2 py-1 rounded text-sm font-mono" style="background-color: ' +
          colors.gray200 +
          "; color: " +
          colors.penumbraBlack +
          '">$1</code>'
      );

      // Regular paragraph
      return (
        <motion.p
          key={index}
          className="text-base sm:text-lg leading-relaxed mb-6 text-justify"
          style={{
            fontFamily: fonts.body,
            color: colors.gray800,
            lineHeight: "1.8",
          }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
          dangerouslySetInnerHTML={{ __html: processedParagraph }}
        />
      );
    });
  };

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={`Penumbra Penned, blog, ${blog.title}, ${blog.tags?.join(
            ", "
          )}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:published_time" content={blog.publishedAt} />
        <meta name="author" content="Aman Srivastava" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              datePublished: blog.publishedAt,
              description: blog.excerpt,
              author: {
                "@type": "Person",
                name: "Aman Srivastava",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://penumbrapenned.com/insights/${blog.slug}`,
              },
            }),
          }}
        />
      </Head>
      <div
        className="min-h-screen"
        style={{
          background: `linear-gradient(135deg, ${colors.softEggshell} 0%, ${colors.gray100} 50%, ${colors.parchment} 100%)`,
        }}
      >
        {/* Header */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/insights"
                className="inline-flex items-center mb-6 sm:mb-8 font-medium text-sm sm:text-base transition-all duration-300 hover:opacity-70 hover:translate-x-[-4px]"
                style={{
                  color: colors.penumbraBlack,
                  fontFamily: fonts.body,
                }}
              >
                <motion.svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ x: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </motion.svg>
                Back to Articles
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Hero Image and Title */}
        <section className="pb-8 sm:pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              {/* Hero Image */}
              <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 shadow-2xl">
                <Image
                  src={blog.imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Floating content on image for mobile */}
                <div className="absolute bottom-4 left-4 right-4 sm:hidden">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {blog.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                        style={{
                          backgroundColor: `${colors.gold}90`,
                          color: colors.penumbraBlack,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags - Desktop */}
              <div className="hidden sm:flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
                {blog.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: colors.gold,
                      color: colors.penumbraBlack,
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              {/* Tags - Mobile */}
              <div className="flex sm:hidden flex-wrap gap-2 mb-4">
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
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
                style={{
                  fontFamily: fonts.heading,
                  color: colors.penumbraBlack,
                }}
              >
                {blog.title}
              </h1>

              {/* Meta Info */}
              <div
                className="flex flex-wrap items-center gap-3 sm:gap-4 pb-6 sm:pb-8 border-b text-sm sm:text-base"
                style={{
                  borderColor: colors.gray300,
                  color: colors.gray600,
                  fontFamily: fonts.body,
                }}
              >
                <div className="flex items-center">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-medium">{blog.readTime}</span>
                </div>
                <span className="opacity-60">•</span>
                <div className="flex items-center">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16 sm:pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="prose prose-lg max-w-none">
                {renderContent(blog.content)}
              </div>

              {/* Share Section */}
              <motion.div
                className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t"
                style={{ borderColor: colors.gray300 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h3
                  className="text-lg sm:text-xl font-bold mb-4"
                  style={{
                    fontFamily: fonts.heading,
                    color: colors.penumbraBlack,
                  }}
                >
                  Share this article
                </h3>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <motion.button
                    className="flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300"
                    style={{
                      backgroundColor: colors.penumbraBlack,
                      color: colors.gray100,
                      fontFamily: fonts.button,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: blog.title,
                          text: blog.excerpt,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                      }
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
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                    Share
                  </motion.button>

                  <motion.button
                    className="flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-sm sm:text-base transition-all duration-300"
                    style={{
                      backgroundColor: colors.gold,
                      color: colors.penumbraBlack,
                      fontFamily: fonts.button,
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      // You could add a toast notification here
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
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy Link
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Related Articles */}
        {recentBlogs.length > 0 && (
          <section
            className="py-16 sm:py-20"
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
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12"
                  style={{
                    fontFamily: fonts.heading,
                    color: colors.gray100,
                  }}
                >
                  More Articles
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                  {recentBlogs.map((relatedBlog, index) => (
                    <motion.div
                      key={relatedBlog.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -8 }}
                    >
                      <Link href={`/insights/${relatedBlog.slug}`}>
                        <div className="group h-full">
                          <div className="relative h-40 sm:h-48 rounded-xl overflow-hidden mb-4">
                            <Image
                              src={relatedBlog.imageUrl}
                              alt={relatedBlog.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <h3
                            className="text-base sm:text-lg font-bold mb-2 group-hover:opacity-80 transition-opacity duration-300 line-clamp-2"
                            style={{
                              fontFamily: fonts.heading,
                              color: colors.gray100,
                            }}
                          >
                            {relatedBlog.title}
                          </h3>
                          <p
                            className="text-sm sm:text-base line-clamp-2 leading-relaxed"
                            style={{
                              fontFamily: fonts.body,
                              color: colors.gray300,
                            }}
                          >
                            {relatedBlog.excerpt}
                          </p>
                          <div
                            className="mt-3 text-xs sm:text-sm opacity-70"
                            style={{ color: colors.gray400 }}
                          >
                            {relatedBlog.readTime} •{" "}
                            {new Date(
                              relatedBlog.publishedAt
                            ).toLocaleDateString()}
                          </div>
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
    </>
  );
}
