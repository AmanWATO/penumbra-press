import { useTheme } from "@/context/ThemeProvider";
import { BookCard } from "./book-card";
import { ComingSoonCard } from "./coming-soon";
import { colors } from "@/styles/theme";

interface BookProps {
  id: number;
  title: string;
  coverImage: string;
  description: string;
  link: string;
}

const books: BookProps[] = [
  {
    id: 1,
    title: "When The Sky Meets The Sea of Souls",
    coverImage: "/book3.png",
    description:
      "Love is both a whisper and a storm, a quiet ache and a force that shapes us. When the Sky Meets the Sea of Souls is my poetic odyssey — 49 moments of love in its rawest forms. From self-discovery to healing, from the depth of solitude to the luminous unity of souls, this collection explores the spaces where love lives",
    link: "/",
  },
  {
    id: 2,
    title: "The Jumbled Flow",
    coverImage: "/book2.jpg",
    description:
      "Have you ever noticed how thoughts rarely arrive in a straight line? They mostly weave, collide, and drift — much like life itself. The Jumbled Flow was born from this very nature, a collection of poems spanning five years of wandering through emotions, reflections, and the intricate dance of human connections.",
    link: "/",
  },
];

export function BooksSection() {
  const theme = useTheme();

  return (
    <section
      className="py-10 pb-20 max-md:pv-10 max-md:py-6 "
      style={{ backgroundColor: colors.gray300 }}
      id="books"
    >
      <div className="container mx-auto px-20 max-md:px-5">
        <h2
          className="text-3xl font-bold mb-4 text-center"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.text.primary,
          }}
        >
          Latest Literary Journeys
        </h2>
        <p
          className="text-lg font-bold mb-8 text-center"
          style={{
            fontFamily: theme.fonts.body,
            color: theme.text.secondary,
          }}
        >
          Explore our most recent book releases, each crafted to inspire,
          captivate, and transport you to new worlds. Stay tuned for more
          stories coming soon!
        </p>
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
          <ComingSoonCard />
        </div>
      </div>
    </section>
  );
}
