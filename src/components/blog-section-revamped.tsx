"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { blogs } from "@/lib/blogs";

export default function BlogSectionRevamped() {
  const theme = useTheme();

  return (
    <section
      id="insights"
      className="py-24"
      style={{ backgroundColor: theme.background.primary }}
    >
      <div className="container mx-auto px-5">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.text.primary,
            }}
          >
            Insights & Musings
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{
              fontFamily: theme.fonts.body,
              color: theme.text.secondary,
            }}
          >
            Thoughts on writing, creativity, and the stories that shape us.
          </p>
        </motion.div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={`/insights/${post.slug}`}>
                <div className="group h-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                  <div
                    className="relative w-full h-48"
                    style={{ backgroundColor: theme.colors.gray200 }}
                  >
                    <Image
                      src={post.imageUrl}
                      alt={`Featured image for ${post.title}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p
                      className="text-sm font-semibold mb-2"
                      style={{
                        color: theme.colors.gold,
                        fontFamily: theme.fonts.button,
                      }}
                    >
                      {post.tags[0]}
                    </p>
                    <h3
                      className="text-xl font-bold mb-3 flex-grow"
                      style={{
                        fontFamily: theme.fonts.heading,
                        color: theme.text.primary,
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-base mb-4 line-clamp-3"
                      style={{
                        fontFamily: theme.fonts.body,
                        color: theme.colors.gray700,
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      className="mt-auto text-md font-bold inline-flex items-center gap-2"
                      style={{
                        color: theme.colors.deepSepia,
                        fontFamily: theme.fonts.button,
                      }}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link href="/insights">
            <motion.button
              className="px-8 py-4 cursor-pointer rounded-full font-semibold text-lg border-2"
              style={{
                borderColor: theme.colors.deepSepia,
                color: theme.colors.deepSepia,
                fontFamily: theme.fonts.button,
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: theme.colors.deepSepia,
                color: theme.colors.white,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              View All Insights
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
