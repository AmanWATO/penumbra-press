"use client";

import { useState, useEffect } from "react";
import theme, { colors, fonts } from "@/styles/theme";
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


  if (!quote) return null;

  return (
    <section
      className="w-full py-16 px-5 max-md:py-12 md:px-8 lg:px-16"
      style={{ backgroundColor: colors.white }}
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className={`text-2xl md:text-3xl mb-8 max-md:mb-5 font-bold`}
          style={{ color: colors.nightBlue, fontFamily: fonts.heading }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Quote of the Day
        </motion.h2>

        <motion.div
          className=" backdrop-blur-sm p-4 md:p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            backgroundColor: colors.darkGray,
          }}
        >
          <motion.p
            className={`text-xl md:text-2xl italic mb-4 max-md:mb-2 leading-relaxed`}
            style={{ color: colors.gray100, fontFamily: fonts.math }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            {`"${quote.title}"`}
          </motion.p>

          <motion.div
            className="h-px w-16 mx-auto my-6 max-md:my-3"
            style={{ backgroundColor: theme.colors.lightSepia }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          ></motion.div>

          <motion.p
            className={`text-sm md:text-base `}
            style={{ color: colors.gray200, fontFamily: fonts.math }}
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
