"use client";
import { useState, useEffect } from "react";
import theme from "@/styles/theme";
import { penumbrapennedQuotes } from "@/config/quotes";

export default function QuotesPage() {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else if (window.innerWidth < 1024) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const createMasonryLayout = () => {
    const result: { quote: string; explanation: string }[][] = Array.from(
      { length: columns },
      () => []
    );

    penumbrapennedQuotes.forEach((quote, index) => {
      const columnIndex = index % columns;
      result[columnIndex].push(quote);
    });

    return result;
  };

  const masonryColumns = createMasonryLayout();

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.deepSepia }}
    >
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1
          className={`text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 ${theme.fonts.heading}`}
          style={{ color: theme.colors.cream }}
        >
          {`Penumbra's Thoughtful Archive`}
        </h1>

        <p
          className={`text-xs md:text-sm lg:text-lg font-medium text-center mb-16 ${theme.fonts.body}`}
          style={{ color: theme.colors.parchment }}
        >
          {`If you are here, take a pause, reflect on the words you scan through your eyes, dive into it's own dimension and relive it!`}
        </p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {masonryColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex-1 flex flex-col gap-6">
              {column.map((quote, quoteIndex) => {
                const height = 200 + ((quoteIndex * 17) % 150);

                return (
                  <div
                    key={quoteIndex}
                    className="rounded-lg p-6 shadow-lg transition-all duration-300 hover:transform hover:scale-[1.02]"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(8px)",
                      minHeight: `${height}px`,
                    }}
                  >
                    <p
                      className={`text-lg md:text-xl italic mb-4 leading-relaxed ${theme.fonts.heading}`}
                      style={{ color: theme.colors.cream }}
                    >
                      {`"${quote.quote}"`}
                    </p>
                    <div
                      className="h-px w-16 my-4"
                      style={{ backgroundColor: theme.colors.lightSepia }}
                    ></div>
                    <p
                      className={`text-sm ${theme.fonts.body}`}
                      style={{ color: theme.colors.lightSepia }}
                    >
                      {quote.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
