"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeProvider";
import { motion } from "framer-motion";

export function NewsletterSection() {
  const theme = useTheme();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay },
    }),
  };

  return (
    <section
      className="py-16"
      style={{
        backgroundColor: theme.background.dark,
        color: theme.text.light,
        fontFamily: theme.fonts.body,
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: theme.fonts.heading }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Join the Literary Journey
        </motion.h2>

        <motion.p
          className="text-lg max-w-2xl mx-auto mb-8"
          variants={fadeInUp}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Subscribe to receive updates on new releases, literary events, and exclusive content.
        </motion.p>

        <motion.form
          className="flex flex-col sm:flex-row gap-4 items-center max-w-md mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.input
            type="email"
            placeholder="Your email address"
            className="px-4 py-2 rounded-md flex-grow"
            style={{
              backgroundColor: theme.background.primary,
              color: theme.text.primary,
            }}
            required
            variants={fadeInUp}
            custom={0.4}
          />

          <motion.div variants={fadeInUp} custom={0.6}>
            <Button
              type="submit"
              className="cursor-pointer"
              style={{
                backgroundColor: theme.background.secondary,
                color: theme.text.primary,
                fontFamily: theme.fonts.body,
              }}
            >
              Subscribe
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
