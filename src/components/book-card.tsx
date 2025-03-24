import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";

interface BookProps {
  id: number;
  title: string;
  coverImage: string;
  description: string;
  link: string;
}

export function BookCard({ book }: { book: BookProps }) {
  const theme = useTheme();

  return (
    <Card
      className="overflow-hidden flex flex-col h-full"
      style={{
        backgroundColor: theme.background.primary,
        borderColor: theme.border.light,
      }}
    >
      <div className="relative aspect-[4/5] w-full">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.text.primary,
          }}
        >
          {book.title}
        </CardTitle>
        <CardDescription
          style={{
            fontFamily: theme.fonts.body,
            color: theme.text.secondary,
          }}
        >
          {book.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button
          asChild
          variant="outline"
          className="w-full"
          style={{
            borderColor: theme.border.medium,
            color: theme.text.primary,
            fontFamily: theme.fonts.body,
          }}
        >
          <Link href={book.link}>
            <BookOpen className="h-4 w-4" />
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
