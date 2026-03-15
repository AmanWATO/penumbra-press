'use client'

import { useState, useEffect } from "react";
import { colors, fonts } from "@/styles/theme";
import { Quote } from "@/api/apiTypes";
import { fetchQuotes } from "@/api/apiService";
import { motion } from "framer-motion";
import { Quote as QuoteIcon, Feather, ArrowRight } from "lucide-react";
import Link from "next/link";

// Helper to strip quotes
const stripQuotes = (text: string): string => {
  return text.replace(/^["']|["']$/g, '').trim();
};

export default function QuoteSectionRevamped() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchQuoteData = async () => {
      try {
        const allQuotes = await fetchQuotes();
        // Get 3 random quotes
        const shuffled = [...allQuotes].sort(() => Math.random() - 0.5);
        setQuotes(shuffled.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      }
    };

    fetchQuoteData();
  }, []);

  if (quotes.length === 0) return null;

  return (
    <section
      className="relative w-full py-12 md:py-16 overflow-hidden"
      style={{ backgroundColor: colors.gray100 }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${colors.gold}20` }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${colors.deepSepia}15` }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-center mb-5">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                backgroundColor: `${colors.deepSepia}10`,
                border: `1px solid ${colors.deepSepia}20`,
              }}
            >
              <Feather className="w-4 h-4" style={{ color: colors.deepSepia }} />
              <span
                className="text-xs font-medium tracking-wide uppercase"
                style={{ color: colors.deepSepia, fontFamily: fonts.button }}
              >
                Curated Reflections
              </span>
            </div>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-1"
            style={{ color: colors.darkGray, fontFamily: fonts.heading }}
          >
            Thoughtful Moments
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: colors.gray600, fontFamily: fonts.body }}
          >
            A glimpse into contemplations preserved in digital ink
          </p>
        </motion.div>

        {/* Quote Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-6 flex flex-col flex-grow">
                {/* Quote icon and genre */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${colors.deepSepia}10`,
                      color: colors.deepSepia,
                      fontFamily: fonts.button,
                    }}
                  >
                    {quote.genre}
                  </div>
                  <QuoteIcon
                    className="w-5 h-5 opacity-20 group-hover:opacity-40 transition-opacity"
                    style={{ color: colors.deepSepia }}
                  />
                </div>

                {/* Quote text */}
                <p
                  className="text-lg leading-relaxed mb-4 flex-grow"
                  style={{ color: colors.darkGray, fontFamily: fonts.math }}
                >
                  &ldquo;{stripQuotes(quote.title)}&rdquo;
                </p>

                {/* Explanation preview */}
                <p
                  className="text-sm line-clamp-3 mb-4"
                  style={{ color: colors.gray600, fontFamily: fonts.body }}
                >
                  {quote.explanation}
                </p>

                {/* Divider */}
                <div
                  className="h-px my-4"
                  style={{ backgroundColor: colors.gray200 }}
                />

             
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link href="/penumbra-quotes">
            <motion.button
              className="px-8 py-3 rounded-full cursor-pointer font-semibold text-lg border-2"
              style={{
                borderColor: colors.deepSepia,
                color: colors.deepSepia,
                fontFamily: fonts.button,
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: colors.deepSepia,
                color: colors.white,
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Explore All Quotes
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}