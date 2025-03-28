"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { colors } from "@/styles/theme";
import ColorThief from "colorthief";

const booksData = [
  {
    id: 1,
    title: "Grace In The Ether",
    genre: "Poetry",
    coverImage: "/book1.jpg",
    description:
      "“Grace in the Ether”, is a book written with a care for those who are lost in their bustling lives and fail to notice the grace that fleets around. This book is a probe of such subtle wonder that graces our lives- whether we deserve it or not because that’s what it’s kindness.",
    publicationYear: 2024,
  },
  {
    id: 2,
    title: "The Jumbled Flow",
    genre: "Collection",
    coverImage: "/book2.jpg",
    description: "Have you ever noticed how thoughts rarely arrive in a straight line? They mostly weave, collide, and drift — much like life itself. The Jumbled Flow was born from this very nature, a collection of poems spanning five years of wandering through emotions, reflections, and the intricate dance of human connections.",
    publicationYear: 2025,
  },
  {
    id: 3,
    title: "When The Sky Meets The Sea of Souls",
    genre: "Poetry",
    coverImage: "/book3.png",
    description: "Love is both a whisper and a storm, a quiet ache and a force that shapes us. When the Sky Meets the Sea of Souls is my poetic odyssey — 49 moments of love in its rawest forms. From self-discovery to healing, from the depth of solitude to the luminous unity of souls, this collection explores the spaces where love lives",
    publicationYear: 2025,
  },
];

export default function AuthorBooksPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [bookColors, setBookColors] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    // Extract dominant colors from book covers
    const extractColors = async () => {
      const colorThief = new ColorThief();
      const colorPromises = booksData.map(async (book) => {
        return new Promise<{ id: number; color: string }>((resolve) => {
          const img = new window.Image();
          img.crossOrigin = "Anonymous";
          img.src = book.coverImage;
          img.onload = () => {
            const [r, g, b] = colorThief.getColor(img);
            resolve({
              id: book.id,
              color: `rgb(${r},${g},${b})`,
            });
          };
        });
      });

      const extractedColors = await Promise.all(colorPromises);
      const colorMap = extractedColors.reduce(
        (acc: { [key: number]: string }, item) => {
          acc[item.id] = item.color;
          return acc;
        },
        {} as { [key: number]: string }
      );

      setBookColors(colorMap);
    };

    extractColors();
  }, []);

  const genreColors = {
    Poetry: colors.softBeige,
    Prose: colors.deepSepia,
    Collection: colors.deepTeal,
    Anthology: colors.softEggshell,
    Essay: colors.gray700,
  };

  const filteredBooks =
    selectedGenre === "All"
      ? booksData
      : booksData.filter((book) => book.genre === selectedGenre);

  return (
    <div
      className="min-h-screen py-10"
      style={{ backgroundColor: colors?.gray100 }}
    >
      <div className="container mx-auto px-4">
        <h1
          data-aos="fade-down"
          className="text-4xl font-bold text-center mb-8 text-gray-800"
        >
          Published Works
        </h1>

        <div className="flex justify-center mb-10 space-x-4">
          {["All", ...Object.keys(genreColors)].map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                selectedGenre === genre
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              data-aos="fade-up"
              data-aos-delay={book.id * 100}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
              style={{
                borderRight: `8px solid ${bookColors[book.id]}`,
                boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px ${
                  bookColors[book.id]
                }50`,
              }}
            >
              <div
                className="relative h-48 w-full"
                style={{
                  backgroundColor: bookColors[book.id],
                }}
              >
                <Image
                  src={book.coverImage}
                  alt={book.title}
                  layout="fill"
                  objectFit="contain"
                  className="absolute inset-0"
                />
              </div>
              <div
                className="text-white px-3 py-4 h-20"
                style={{
                  backgroundColor: bookColors[book.id],
                }}
              >
                <h2 className="text-xl font-bold">{book.title}</h2>
                <p className="text-sm">
                  {book.genre} | {book.publicationYear}
                </p>
              </div>
              <div className="px-6 flex flex-col items-center justify-between py-4 ">
                <p className="text-gray-600 mb-4">{book.description}</p>
                <button
                  onClick={() => console.log("object")}
                  className="block w-full text-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
