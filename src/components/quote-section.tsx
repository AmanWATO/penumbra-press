"use client";

import { useState, useEffect } from "react";
import theme from "@/styles/theme";
import { Quote } from "@/api/apiTypes";
import { fetchQuotes } from "@/api/apiService";
import { motion } from "framer-motion";

export const QuoteSection = () => {
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

  const quotesTheme = theme.sections.quotes;

  if (!quote) return null;

  return (
    <section
      className="w-full py-16 px-4 md:px-8 lg:px-16"
      style={{ backgroundColor: quotesTheme.background }}
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className={`text-2xl md:text-3xl mb-8 font-bold ${theme.fonts.heading}`}
          style={{ color: quotesTheme.text }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Quote of the Day
        </motion.h2>

        <motion.div
          className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.p
            className={`text-xl md:text-2xl italic mb-4 leading-relaxed ${theme.fonts.heading}`}
            style={{ color: quotesTheme.text }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {`"${quote.title}"`}
          </motion.p>

          <motion.div
            className="h-px w-16 mx-auto my-6"
            style={{ backgroundColor: theme.colors.lightSepia }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          ></motion.div>

          <motion.p
            className={`text-sm md:text-base ${theme.fonts.body}`}
            style={{ color: quotesTheme.subtext }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {quote.explanation}
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default QuoteSection;
