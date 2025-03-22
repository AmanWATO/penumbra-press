import { useTheme } from "@/lib/ThemeProvider";
import { BookCard } from "./book-card";

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
    title: "Whispers of Twilight",
    coverImage: "/book1.jpg",
    description: "A collection of poems exploring the liminal spaces between day and night, conscious and subconscious.",
    link: "/books/whispers-of-twilight"
  },
  {
    id: 2,
    title: "Echoes in the Void",
    coverImage: "/book2.jpg",
    description: "Short stories that navigate the uncharted terrains of memory and loss.",
    link: "/books/echoes-in-the-void"
  },
  {
    id: 3,
    title: "Midnight Musings",
    coverImage: "/book3.jpg",
    description: "Essays and reflections on literature, art, and the human condition.",
    link: "/books/midnight-musings"
  }
];

export function BooksSection() {
  const theme = useTheme();

  return (
    <section 
      className="py-16"
      style={{ backgroundColor: theme.background.secondary }}
    >
      <div className="container mx-auto px-4">
        <h2 
          className="text-3xl font-bold mb-8 text-center"
          style={{ 
            fontFamily: theme.fonts.heading,
            color: theme.text.primary
          }}
        >
          Featured Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
