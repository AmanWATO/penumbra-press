"use client";
import { useState, useEffect } from "react";
import theme from "@/styles/theme";
import { penumbrapennedQuotes } from "@/config/quotes";

export const QuoteSection = () => {
  const [quote, setQuote] = useState<{
    quote: string;
    explanation: string;
  } | null>(null);

  useEffect(() => {
    const today = new Date();
    const dateString = `${today.getFullYear()}${today.getMonth()}${today.getDate()}`;
    const dateNumber = parseInt(dateString);

    const quoteIndex = dateNumber % penumbrapennedQuotes.length;
    setQuote(penumbrapennedQuotes[quoteIndex]);
  }, []);

  if (!quote) return null;

  return (
    <section
      className="w-full py-16 px-4 md:px-8 lg:px-16"
      style={{ backgroundColor: theme.colors.deepSepia }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2
            className={`text-2xl md:text-3xl mb-8 font-bold ${theme.fonts.heading}`}
            style={{ color: theme.colors.cream }}
          >
            Quote of the Day
          </h2>
          <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-lg">
            <p
              className={`text-xl md:text-2xl italic mb-4 leading-relaxed ${theme.fonts.heading}`}
              style={{ color: theme.colors.cream }}
            >
              {`"${quote.quote}"`}
            </p>
            <div
              className="h-px w-16 mx-auto my-6"
              style={{ backgroundColor: theme.colors.lightSepia }}
            ></div>
            <p
              className={`text-sm md:text-base ${theme.fonts.body}`}
              style={{ color: theme.colors.lightSepia }}
            >
              {quote.explanation}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
