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
      id="about-author"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="relative aspect-square w-11/12 mx-auto rounded-full overflow-hidden z-10">
                <Image
                  src="/author-profile.png"
                  alt="Aman Srivastava"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
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
              {` Welcome to Penumbra Press. I'm Aman Srivastava, a writer exploring the boundaries between light and shadow, 
              reality and imagination. My work seeks to illuminate the quiet corners of human experience through poetry, 
              storytelling, and literary reflection.`}
            </p>
            <div className="flex space-x-4">
              <Button
                asChild
                style={{
                  backgroundColor: theme.background.dark,
                  color: theme.text.light,
                  fontFamily: theme.fonts.body,
                }}
              >
                <Link href="/about">
                  <User className="h-4 w-4 mr-2" />
                  Learn More About Me
                </Link>
              </Button>
              {/* <Button
                asChild
                variant="outline"
                style={{
                  borderColor: theme.background.dark,
                  color: theme.text.primary,
                  fontFamily: theme.fonts.body,
                }}
              >
                <Link href="/works">Explore My Works</Link>
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
