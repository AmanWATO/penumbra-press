import React from "react";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { BookProps, books } from "@/lib/utils";
import { colors } from "@/styles/theme";
import Image from "next/image";

function BookCard({ book, index }: { book: BookProps; index: number }) {
  return (
    <div
      className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full group cursor-pointer transform hover:scale-105"
      style={{
        backgroundColor: colors.cream,
        animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
      }}
    >
      <div className="p-6 pb-0">
        <div
          className="rounded-2xl overflow-hidden aspect-[4/5] relative mb-6 group-hover:scale-105 transition-transform duration-500"
          style={{
            background: `linear-gradient(135deg, ${colors.softEggshell}, ${colors.parchment})`,
          }}
        >
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(to top, ${colors.darkGray}33, transparent)`,
            }}
          />
        </div>

        <h3
          className="text-xl font-bold mb-3 leading-tight"
          style={{
            color: colors.darkGray,
            animation: `fadeIn 0.8s ease-out ${0.3 + index * 0.1}s both`,
          }}
        >
          {book.title}
        </h3>

        <p
          className="text-sm mb-6 leading-relaxed"
          style={{
            color: colors.gray700,
            animation: `fadeIn 0.8s ease-out ${0.4 + index * 0.1}s both`,
          }}
        >
          {book.description.length > 150
            ? book.description.substring(0, 150) + "..."
            : book.description}
        </p>
      </div>

      <div className="p-6 pt-0">
        <button
          className="w-full py-3 px-6 rounded-2xl font-semibold text-center flex items-center justify-center gap-2 transition-all duration-300 group/btn transform hover:scale-105 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${colors.deepSepia}, ${colors.inkBrown})`,
            color: colors.cream,
          }}
          onMouseEnter={(e) => {
            (
              e.target as HTMLButtonElement
            ).style.background = `linear-gradient(135deg, ${colors.inkBrown}, ${colors.moonGray})`;
          }}
          onMouseLeave={(e) => {
            (
              e.target as HTMLButtonElement
            ).style.background = `linear-gradient(135deg, ${colors.deepSepia}, ${colors.inkBrown})`;
          }}
        >
          Read More
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
}

function ComingSoonCard() {
  return (
    <div
      className="border-2 border-dashed rounded-3xl flex items-center justify-center text-center p-8 h-full min-h-[500px] group cursor-pointer transform hover:scale-105 transition-all duration-500"
      style={{
        background: `linear-gradient(135deg, ${colors.softEggshell}, ${colors.lightSepia})`,
        borderColor: colors.mediumSepia,
        animation: `fadeInUp 0.6s ease-out 0.4s both`,
      }}
    >
      <div>
        <div
          className="mb-6 animate-bounce"
          style={{
            animation: "sparkleFloat 4s ease-in-out infinite",
          }}
        >
          <Sparkles
            className="w-16 h-16 mx-auto"
            style={{ color: colors.deepSepia }}
          />
        </div>

        <h4
          className="font-bold text-2xl mb-3"
          style={{
            color: colors.darkGray,
            animation: `fadeIn 0.8s ease-out 0.6s both`,
          }}
        >
          Coming Soon
        </h4>

        <p
          className="leading-relaxed max-w-xs mx-auto"
          style={{
            color: colors.gray700,
            animation: `fadeIn 0.8s ease-out 0.7s both`,
          }}
        >
          More stories await beyond the horizon. New literary journeys are being
          crafted with love and passion.
        </p>

        <div
          className="mt-6 h-1 rounded-full max-w-24 mx-auto"
          style={{
            background: `linear-gradient(90deg, ${colors.deepSepia}, ${colors.gold})`,
            animation: `expandWidth 2s ease-out 1s both`,
          }}
        />
      </div>
    </div>
  );
}

export default function BooksSection() {
  return (
    <section
      className="py-20 min-h-screen relative overflow-hidden"
      id="books"
      style={{
        background: `radial-gradient(ellipse at center, ${colors.softBeige} 0%, ${colors.gray100} 25%, ${colors.parchment} 50%, ${colors.lightSepia} 75%, ${colors.mediumSepia} 100%)`,
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: colors.deepTeal }}
      />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: colors.purple }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div
          className="text-center mb-16"
          style={{ animation: "fadeInUp 0.8s ease-out both" }}
        >
          <div
            className="inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-sm"
            style={{
              backgroundColor: `${colors.cream}CC`,
              animation: "scaleIn 0.6s ease-out 0.2s both",
            }}
          >
            <BookOpen className="w-5 h-5" style={{ color: colors.deepSepia }} />
            <span
              className="text-sm font-medium"
              style={{ color: colors.deepSepia }}
            >
              Literary Collection
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{
              color: colors.darkGray,
              animation: "fadeIn 0.8s ease-out 0.3s both",
            }}
          >
            Latest Literary Journeys
          </h2>

          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{
              color: colors.gray700,
              animation: "fadeIn 0.8s ease-out 0.4s both",
            }}
          >
            Discover stories that touch the soul, crafted with passion and meant
            to inspire. Each book is a journey through emotions, thoughts, and
            the beautiful complexity of human experience.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {books.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))}
          <ComingSoonCard />
        </div>

        {/* Bottom CTA */}
        {/* <div
          className="text-center mt-16"
          style={{ animation: "fadeInUp 0.6s ease-out 0.8s both" }}
        >
          <button
            className="font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto transform hover:scale-105 active:scale-95"
            style={{
              background: `linear-gradient(135deg, ${colors.deepSepia}, ${colors.inkBrown})`,
              color: colors.cream,
            }}
            onMouseEnter={(e) => {
              (
                e.target as HTMLButtonElement
              ).style.background = `linear-gradient(135deg, ${colors.inkBrown}, ${colors.moonGray})`;
            }}
            onMouseLeave={(e) => {
              (
                e.target as HTMLButtonElement
              ).style.background = `linear-gradient(135deg, ${colors.deepSepia}, ${colors.inkBrown})`;
            }}
          >
            Explore All Books
            <ArrowRight className="w-5 h-5" />
          </button>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes sparkleFloat {
          0%,
          100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(10deg) scale(1.1);
          }
          75% {
            transform: rotate(-10deg) scale(1.1);
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
