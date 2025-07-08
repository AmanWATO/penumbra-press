'use client'


import Image from "next/image";
import { useTheme } from "@/context/ThemeProvider";
import { motion } from "framer-motion";

 function HeroSection() {
  const theme = useTheme();

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const textVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: theme.background.dark }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/60 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0"
      >
        <Image
          src="/hero-background.png"
          alt="Penumbra Penned Background"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
      </motion.div>

      <div className="container mx-auto px-5   z-20 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-4"
          custom={0}
          variants={textVariant}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.text.light,
          }}
        >
          Where Words Dwell Between Light and Shadow
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
          custom={1}
          variants={textVariant}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: theme.fonts.body,
            color: theme.text.light,
          }}
        >
          Explore the interplay of ink and ether through poetry, storytelling,
          and literary reflections.
        </motion.p>

        <motion.button
          custom={2}
          variants={textVariant}
          initial="hidden"
          animate="visible"
          onClick={() => handleScroll("books")}
          style={{
            backgroundColor: theme.background.secondary,
            color: theme.text.primary,
            fontFamily: theme.fonts.button,
          }}
          className="rounded-md font-sm font-semibold py-2 px-4 cursor-pointer hover:opacity-80 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Explore My Books
        </motion.button>
      </div>
    </section>
  );
}


export default HeroSection