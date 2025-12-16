"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useConfig } from "@/context/ConfigProvider";

export default function AboutSectionRevamped() {
  const theme = useTheme();
  const config = useConfig();

  return (
    <section
      id="about-author"
      className="relative py-24 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${theme.colors.white} 0%, ${theme.colors.gray100} 100%)`,
      }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: `${theme.colors.gold}4D` }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: `${theme.colors.purple}4D` }} />
      </div>
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {/* Decorative background shape */}
              <div
                className="absolute inset-0 rounded-full transform -rotate-12"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.lightSepia}, ${theme.colors.parchment})`,
                }}
              />
              <div className="absolute inset-0 p-4">
                <Image
                  src="/author-profile.png"
                  alt={`Portrait of ${config.about_author.name}`}
                  fill
                  className="object-cover rounded-full shadow-2xl"
                  style={{
                    border: `6px solid ${theme.colors.white}`,
                    boxShadow: `0 10px 30px ${theme.colors.darkGray}30`,
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                fontFamily: theme.fonts.heading,
                color: theme.text.primary,
              }}
            >
              Meet the Author
            </h2>
            <p
              className="text-lg md:text-xl mb-8 leading-relaxed"
              style={{
                fontFamily: theme.fonts.body,
                color: theme.text.secondary,
              }}
            >
              {`I'm ${config.about_author.name}, a writer exploring the boundaries between light and shadow. My work seeks to illuminate the quiet corners of human experience through poetry, storytelling, and literary reflection.`}
            </p>

            <Link href="/about">
              <motion.button
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg"
                style={{
                  backgroundColor: theme.colors.darkGray,
                  color: theme.colors.white,
                  fontFamily: theme.fonts.button,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                More About My Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
