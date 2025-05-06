"use client";
import { useState, useEffect } from "react";
import theme from "@/styles/theme";
import { penumbrapennedQuotes } from "@/config/quotes";
import { X } from "lucide-react";
import Head from "next/head";

type Quote = {
  quote: string;
  explanation: string;
};

function QuotesPage() {
  <Head>
    <title>Penumbra Quotes - Unveil Your Inner Light</title>
    <meta
      name="description"
      content="A curated collection of powerful quotes from the Penumbra community."
    />
    <meta
      name="keywords"
      content="Penumbra, quotes, creative writing, inspirational quotes, community writing"
    />
    <meta property="og:title" content="Penumbra Quotes" />
    <meta
      property="og:description"
      content="A curated collection of powerful quotes from the Penumbra community."
    />
    <meta
      property="og:url"
      content={`${process.env.NEXT_WEB_URL}/penumbra-quotes`}
    />
    <meta property="og:type" content="website" />
    <meta name="robots" content="index, follow" />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Penumbra Quotes",
          url: `${process.env.NEXT_WEB_URL}/penumbra-quotes`,
          description:
            "A curated collection of powerful quotes from the Penumbra community.",
        }),
      }}
    />
  </Head>;

  const [columns, setColumns] = useState(3);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

    setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const createMasonryLayout = () => {
    const result = Array.from(
      { length: columns },
      () => [] as Array<{ quote: string; explanation: string }>
    );

    penumbrapennedQuotes.forEach((quote, index) => {
      const columnIndex = index % columns;
      result[columnIndex].push(quote);
    });

    return result;
  };

  const masonryColumns = createMasonryLayout();

  const quotesTheme = theme.sections.quotes;

  const openQuoteModal = (quote: Quote) => {
    setSelectedQuote(quote);
    document.body.style.overflow = "hidden";
  };

  const closeQuoteModal = () => {
    setSelectedQuote(null);
    document.body.style.overflow = "auto";
  };

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: quotesTheme.background }}
      >
        <div className="flex flex-col items-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
            style={{
              borderColor: `${quotesTheme.text} transparent ${quotesTheme.text} transparent`,
            }}
          ></div>
          <p className="mt-4 text-lg" style={{ color: quotesTheme.text }}>
            Loading wisdom...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: quotesTheme.background }}
    >
      {/* Enhanced gradient background */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-gradient-radial from-transparent via-transparent to-transparent"
        style={{
          background: `
            radial-gradient(circle at 10% 10%, ${quotesTheme.decorativeElements}, transparent 40%),
            radial-gradient(circle at 90% 90%, ${quotesTheme.decorativeElements}, transparent 40%),
            radial-gradient(circle at 50% 50%, ${quotesTheme.accent}, transparent 60%)
          `,
        }}
      ></div>

      {/* Header with stylized look */}
      <header className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: "url('/api/placeholder/1200/300')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(8px)",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
            style={{ color: quotesTheme.text }}
          >
            <span className="inline-block transform -rotate-2">{`Penumbra's`}</span>{" "}
            <span className="inline-block transform rotate-1">Thoughtful</span>{" "}
            <span className="inline-block transform -rotate-1">Archive</span>
          </h1>

          <div
            className="w-32 h-1 mx-auto my-6"
            style={{ backgroundColor: quotesTheme.accent }}
          ></div>

          <p
            className="text-sm md:text-base lg:text-lg italic max-w-xl mx-auto"
            style={{ color: quotesTheme.subtext }}
          >
            {`"If you are here, take a pause, reflect on the words you scan
            through your eyes, dive into its own dimension and relive it!"`}
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {masonryColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex-1 flex flex-col gap-8">
              {column.map((quote, quoteIndex) => {
                const rotationDeg =
                  ((columnIndex * 3 + quoteIndex * 7) % 5) - 2;
                const baseHeight = 220 + ((quoteIndex * 31) % 130);

                return (
                  <div
                    key={`quote-${columnIndex}-${quoteIndex}`}
                    className="rounded-lg p-6 md:p-8 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                    style={{
                      backgroundColor: quotesTheme.cardBackground,
                      backdropFilter: "blur(12px)",
                      minHeight: `${baseHeight}px`,
                      transform: `rotate(${rotationDeg}deg)`,
                      borderLeft: `4px solid ${quotesTheme.accent}`,
                    }}
                    onClick={() => openQuoteModal(quote)}
                  >
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div
                          className="mb-4 text-xs tracking-widest uppercase opacity-60"
                          style={{ color: quotesTheme.quoteNumber }}
                        >
                          Reflection{" "}
                          {columnIndex * column.length + quoteIndex + 1}
                        </div>

                        <p
                          className="text-lg md:text-xl lg:text-2xl italic leading-relaxed mb-4"
                          style={{ color: quotesTheme.text }}
                        >
                          {`"${quote.quote}"`}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="h-px flex-grow"
                            style={{ backgroundColor: quotesTheme.divider }}
                          ></div>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: quotesTheme.divider }}
                          ></div>
                        </div>

                        <p
                          className="text-sm italic"
                          style={{ color: quotesTheme.explanation }}
                        >
                          {quote.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </main>

      {/* Modal for displaying full quote */}
      {selectedQuote && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Modal Backdrop */}
          <div
            className="absolute inset-0 bg-[#17171750] backdrop-blur-xs"
            onClick={closeQuoteModal}
          ></div>

          {/* Modal Content */}
          <div className="relative max-w-2xl w-full mx-4 rounded-lg shadow-2xl animate-fadeIn bg-white">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={closeQuoteModal}
            >
              <X size={20} color="#000000" />
            </button>

            <div className="p-6 md:p-8">
              {/* Simple colored header */}
              <div
                className="h-2 w-full rounded-t-lg absolute top-0 left-0"
                style={{ backgroundColor: quotesTheme.accent }}
              ></div>

              {/* Main quote text */}
              <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed mt-4 mb-6 text-gray-800">
                {`"${selectedQuote.quote}"`}
              </p>

              {/* Simple divider */}
              <hr className="my-6 border-gray-200" />

              {/* Explanation with clear typography */}
              <div>
                <h3 className="text-lg mb-3 font-medium text-gray-800">
                  Reflection
                </h3>
                <p className="text-base text-gray-600">
                  {selectedQuote.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer with author signature */}
      <footer className="pb-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <p
            className="text-sm opacity-70 mb-2"
            style={{ color: quotesTheme.subtext }}
          >
            Crafted with passion by
          </p>

          <div
            className="text-xl font-bold"
            style={{ color: quotesTheme.text }}
          >
            ~ Aman Srivastava ~
          </div>
        </div>
      </footer>

      {/* Adding a custom style for modal animation */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default QuotesPage;
