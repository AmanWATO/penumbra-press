import { useTheme } from "@/context/ThemeProvider";
import { BookCard } from "./book-card";
import { ComingSoonCard } from "./coming-soon";

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
    title: "Grace In The Ether",
    coverImage: "/book1.jpg",
    description:
      "“Grace in the Ether”, is a book written with a care for those who are lost in their bustling lives and fail to notice the grace that fleets around. This book is a probe of such subtle wonder that graces our lives- whether we deserve it or not because that’s what it’s kindness.",
    link: "/books/whispers-of-twilight",
  },
  {
    id: 2,
    title: "The Jumbled Flow",
    coverImage: "/book2.jpg",
    description:
      "Have you ever noticed how thoughts rarely arrive in a straight line? They mostly weave, collide, and drift — much like life itself. The Jumbled Flow was born from this very nature, a collection of poems spanning five years of wandering through emotions, reflections, and the intricate dance of human connections.",
    link: "/books/echoes-in-the-void",
  },
];

export function BooksSection() {
  const theme = useTheme();

  return (
    <section
      className="py-16"
      style={{ backgroundColor: theme.background.secondary }}
      id="books"
    >
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.text.primary,
          }}
        >
          Recent Released Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
          <ComingSoonCard />
        </div>
      </div>
    </section>
  );
}
