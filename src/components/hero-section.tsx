import Image from "next/image";
import { useTheme } from "@/lib/ThemeProvider";

export function HeroSection() {
  const theme = useTheme();

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: theme.background.dark }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/60 z-10"></div>
      <Image
        src="/hero-background.png"
        alt="Penumbra Press Background"
        fill
        className="object-cover object-center opacity-60"
      />
      <div className="container mx-auto px-4 z-20 text-center">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.text.light,
          }}
        >
          Where Words Dwell Between Light and Shadow
        </h1>
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
          style={{
            fontFamily: theme.fonts.body,
            color: theme.text.light,
          }}
        >
          Explore the interplay of ink and ether through poetry, storytelling,
          and literary reflections.
        </p>
        <button
          onClick={() => handleScroll("books")}
          style={{
            backgroundColor: theme.background.secondary,
            color: theme.text.primary,
            fontFamily: theme.fonts.button,

          }}
          className="rounded-md font-sm font-semibold py-2 px-4 hover:opacity-80 transition-opacity cursor-pointer"
        >
          Explore My Books
        </button>
      </div>
    </section>
  );
}
