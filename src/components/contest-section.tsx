"use client";

import React from "react";
import Link from "next/link";
import { colors, fonts } from "@/styles/theme";
import { motion } from "framer-motion";

export const ContestSection = () => {
  return (
    <section
      style={{ backgroundColor: colors.penumbraBlack, color: colors.gray100 }}
      className="py-16 px-5 max-md:py-12 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-5xl text-center">
        {/* Title with Zoom-In */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ fontFamily: fonts.heading }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
        >
          The Penumbra Script: Shadow Edition
        </motion.h2>

        {/* Quote with Fade Up */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          style={{ fontFamily: fonts.body }}
          className="text-lg sm:text-xl italic mb-6"
        >
          &quot;Because the best stories often emerge from the edges of
          light.&quot;
        </motion.p>

        {/* Separator Bar */}
        <motion.div
          className="w-16 sm:w-20 h-1 mb-8 mx-auto"
          style={{ backgroundColor: colors.deepSepia }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
        ></motion.div>

        {/* Event Info Card */}
        <motion.div
          className="p-6 sm:p-8 rounded-lg border w-full max-w-2xl mx-auto mb-10"
          style={{
            backgroundColor: colors.moonGray,
            borderColor: colors.darkSepia,
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
            {/* Theme Date */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <p
                style={{ fontFamily: fonts.heading }}
                className="text-lg sm:text-xl font-medium mb-1"
              >
                Theme Revealed!
              </p>
              <p style={{ color: colors.lightSepia,
                 fontFamily: fonts.button,
               }}>April 16, 2025</p>
            </motion.div>

            <div
              className="hidden sm:block h-12 w-px"
              style={{ backgroundColor: colors.deepSepia }}
            ></div>

            {/* Submission Date */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <p
                style={{ fontFamily: fonts.heading }}
                className="text-lg sm:text-xl font-medium mb-1"
              >
                Submissions Open
              </p>
              <p style={{ color: colors.lightSepia,
                 fontFamily: fonts.button,
               }}>July 14, 2025</p>
            </motion.div>
          </div>
        </motion.div>

        {/* NEW Badge + Description */}
        <div className="mb-8">
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: [0.9, 1.05, 1], opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: colors.deepSepia,
              color: colors.cream,
              fontFamily: fonts.button,
            }}
            className="inline-block px-4 py-1 text-sm rounded-full mb-6"
          >
            NEW
          </motion.span>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ fontFamily: fonts.body, color: colors.mediumSepia }}
            className="max-w-2xl mx-auto text-base sm:text-lg"
          >
            {`The theme has been revealed! Discover this year's inspiring creative direction and start crafting your entry for a chance to win prizes up to ₹10,000 and publication in our exclusive anthology.`}
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/penumbra-script-contest#guidelines"
            style={{
              fontFamily: fonts.button,
              backgroundColor: "transparent",
              color: colors.cream,
              borderColor: colors.deepSepia,
              borderWidth: "1px",
            }}
            className="px-6 sm:px-8 py-3 text-base sm:text-lg rounded-full hover:opacity-90 transition-opacity"
          >
            See Contest Theme
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContestSection;
