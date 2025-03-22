import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

export function AboutSection() {
  const theme = useTheme();

  return (
    <section
      className="py-16"
      style={{ backgroundColor: theme.background.secondary }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3">
            <div className="relative aspect-square w-full max-w-sm mx-auto rounded-full overflow-hidden">
              <Image
                src="/author.jpg"
                alt="Author photo"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2
              className="text-3xl font-bold mb-4"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.text.primary,
              }}
            >
              About the Author
            </h2>
            <p
              className="text-lg mb-6"
              style={{
                fontFamily: theme.fonts.body,
                color: theme.text.secondary,
              }}
            >
              {` Welcome to Penumbra Press. I'm [Your Name], a writer exploring the boundaries between light and shadow, 
              reality and imagination. My work seeks to illuminate the quiet corners of human experience through poetry, 
              storytelling, and literary reflection.`}
            </p>
            <Button
              asChild
              style={{
                backgroundColor: theme.background.dark,
                color: theme.text.light,
                fontFamily: theme.fonts.body,
              }}
            >
              <Link href="/about">
                <User className="mr-2 h-4 w-4" />
                Learn More About Me
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
