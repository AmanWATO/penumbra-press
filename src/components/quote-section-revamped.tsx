'use client'

import { useState, useEffect } from "react";
import { colors, fonts } from "@/styles/theme";
import { Quote } from "@/api/apiTypes";
import { fetchQuotes } from "@/api/apiService";
import { motion } from "framer-motion";
import { Quote as QuoteIcon, Sparkles } from "lucide-react";

export default function QuoteSectionRevamped() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const fetchQuoteData = async () => {
      const today = new Date();
      const dateString = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
      const dateNumber = parseInt(dateString);

      const quotes = await fetchQuotes();
      const quoteIndex = dateNumber % quotes.length;

      setQuote(quotes[quoteIndex]);
    };

    fetchQuoteData();
  }, []);

  if (!quote) return null;

  return (
    <section
      className="relative w-full py-24 px-5 md:px-8 lg:px-16 overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${colors.deepSepia} 0%, ${colors.inkBrown} 50%, ${colors.penumbraBlack} 100%)` 
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 rounded-full bg-amber-400 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-400 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Badge */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span
              className="text-sm font-semibold text-white"
              style={{ fontFamily: fonts.button }}
            >
              Daily Inspiration
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl mb-12 font-bold text-center"
          style={{ color: colors.cream, fontFamily: fonts.heading }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Quote of the Day
        </motion.h2>

        {/* Quote Card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {/* Quote Icon Decoration */}
          <motion.div
            className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-2xl"
            initial={{ rotate: -180, scale: 0 }}
            whileInView={{ rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
          >
            <QuoteIcon className="w-10 h-10 text-white" />
          </motion.div>

          {/* Main Card */}
          <div 
            className="backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border relative overflow-hidden"
            style={{
              backgroundColor: `${colors.white}15`,
              borderColor: `${colors.white}30`,
            }}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10">
              {/* Quote Text */}
              <motion.blockquote
                className="text-2xl md:text-3xl lg:text-4xl font-serif italic mb-8 leading-relaxed"
                style={{ color: colors.cream, fontFamily: fonts.math }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.7 }}
              >
                <span className="text-amber-400 text-5xl leading-none">&ldquo;</span>
                {quote.title}
                <span className="text-amber-400 text-5xl leading-none">&rdquo;</span>
              </motion.blockquote>

              {/* Divider */}
              <motion.div
                className="relative h-px w-full my-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${colors.gold}, transparent)`,
                  }}
                />
              </motion.div>

              {/* Explanation */}
              <motion.p
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: colors.gray200, fontFamily: fonts.body }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                {quote.explanation}
              </motion.p>
            </div>

            {/* Decorative corner elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-bl-3xl" />
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-amber-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
