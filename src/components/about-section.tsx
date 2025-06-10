"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useConfig } from "@/context/ConfigProvider";
import { colors } from "@/styles/theme";
import { motion } from "framer-motion";

function AboutSection() {
  const theme = useTheme();
  const config = useConfig();

  return (
    <section
      className="py-16"
      style={{ backgroundColor: colors.gray100 }}
      id="about-author"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image */}
          <motion.div
            className="md:w-1/3"
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
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
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="md:w-2/3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
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
              {`Welcome to ${config.app.name}. I'm ${config.about_author.name}, a writer exploring the boundaries between light and shadow, 
              reality and imagination. My work seeks to illuminate the quiet corners of human experience through poetry, 
              storytelling, and literary reflection.`}
            </p>

            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
