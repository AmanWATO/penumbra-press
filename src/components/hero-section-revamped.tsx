'use client'

import Image from "next/image";
import { useTheme } from "@/context/ThemeProvider";
import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Feather, Sparkles, ArrowDown } from "lucide-react";
import { useRef } from "react";

export default function HeroSectionRevamped() {
  const theme = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-start pt-12 md:pt-20 justify-start overflow-hidden"
      style={{ backgroundColor: theme.background.dark }}
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y }} 
        className="absolute inset-0"
      >
        <Image
          src="/hero-background.png"
          alt="Penumbra Penned Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </motion.div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 rounded-full blur-3xl"
        style={{
          backgroundColor: `${theme.colors.gold}33`, // 20% opacity
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full blur-3xl"
        style={{
          backgroundColor: `${theme.colors.purple}33`, // 20% opacity
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Content */}
      <motion.div 
        style={{ opacity }}
        className="container mx-auto px-5 z-20"
      >
        {/* Floating Badge */}
        <motion.div
          className="flex justify-center mb-5 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="inline-flex items-center gap-2 backdrop-blur-md rounded-full px-6 py-3"
            style={{
              backgroundColor: `${theme.colors.white}1A`, // 10% opacity
              border: `1px solid ${theme.colors.white}33`, // 20% opacity
            }}
          >
            <Sparkles className="w-5 h-5" style={{ color: theme.colors.gold }} />
            <span
              className="text-sm font-medium"
              style={{ color: theme.text.light, fontFamily: theme.fonts.body }}
            >
              Where Shadows Inspire Stories
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 text-center leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            fontFamily: theme.fonts.heading,
            color: theme.text.light,
          }}
        >
          <span className="block">Welcome to</span>
          <span
            className="block bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(to right, ${theme.colors.gold}, ${theme.colors.lightSepia})` }}
          >
            Penumbra Penned
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl max-w-3xl mx-auto mb-6 text-center leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            fontFamily: theme.fonts.body,
            color: theme.text.light,
          }}
        >
          Explore the interplay of ink and ether through poetry, storytelling,
          and literary reflections that dance between light and shadow.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { icon: BookOpen, text: "Published Works" },
            { icon: Feather, text: "Weekly Contests" },
            { icon: Sparkles, text: "Literary Insights" }
          ].map((item, index) => (
            <motion.div
              key={item.text}
              className="flex items-center gap-2 backdrop-blur-sm rounded-full px-5 py-2.5"
              style={{
                backgroundColor: `${theme.colors.white}1A`, // 10% opacity
                border: `1px solid ${theme.colors.white}33`, // 20% opacity
              }}
              whileHover={{ scale: 1.05, backgroundColor: `${theme.colors.white}26` }} // 15% opacity
              transition={{ duration: 0.2 }}
            >
              <item.icon className="w-4 h-4" style={{ color: theme.colors.gold }} />
              <span
                className="text-sm font-medium"
                style={{ color: theme.text.light }}
              >
                {item.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <motion.button
            onClick={() => handleScroll("books")}
            className="group relative px-8 py-3 rounded-full font-semibold text-lg overflow-hidden"
            style={{
              backgroundColor: theme.background.secondary,
              color: theme.text.primary,
              fontFamily: theme.fonts.button,
              borderColor:theme.background.secondary,
              borderWidth:1
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My Books
              <BookOpen className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.colors.gold}, ${theme.colors.deepSepia})`,
              }}
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={() => handleScroll("about-author")}
            className="px-8 py-3 rounded-full font-semibold text-lg border-2 backdrop-blur-sm"
            style={{
              borderColor: theme.text.light,
              color: theme.text.light,
              fontFamily: theme.fonts.button,
              backgroundColor: `${theme.colors.white}1A`, // 10% opacity
            }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: `${theme.colors.white}33`, // 20% opacity
            }}
            whileTap={{ scale: 0.95 }}
          >
            About the Author
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        {/* <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.8 },
            y: { delay: 1.5, duration: 2, repeat: Infinity }
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium" style={{ color: theme.text.light }}>
              Scroll to explore
            </span>
            <ArrowDown className="w-6 h-6" style={{ color: theme.text.light }} />
          </div>
        </motion.div> */}
      </motion.div>
    </section>
  );
}
