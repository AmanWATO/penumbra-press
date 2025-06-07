"use client";

import React from "react";
import { colors, fonts } from "@/styles/theme";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { entryFees, guidelines, keyDates, prizes } from "@/lib/contest";
import SectionTitle from "@/components/contest/section-title";
import ContestCard from "@/components/contest/contest-card";
import { CardTitle } from "@/components/ui/card";
import ListItem from "@/components/contest/list-item";

function ContestPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <div
        style={{
          background: `linear-gradient(135deg, ${colors.penumbraBlack} 0%, ${colors.nightBlue} 25%, ${colors.moonGray} 50%, ${colors.nightBlue} 75%, ${colors.penumbraBlack} 100%)`,
          color: colors.gray100,
        }}
        className="min-h-screen pt-16 md:pt-24 pb-16 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-96 h-96 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.deepSepia}20 0%, transparent 70%)`,
            transform: "translate(-50%, -50%)",
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 right-0 w-80 h-80 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.lightSepia}15 0%, transparent 70%)`,
            transform: "translate(50%, 50%)",
          }}
        />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h1
              style={{ fontFamily: fonts.heading }}
              className="text-4xl sm:text-5xl md:text-6xl mb-4"
              animate={{
                textShadow: [
                  `0 0 10px ${colors.lightSepia}40`,
                  `0 0 20px ${colors.lightSepia}60`,
                  `0 0 10px ${colors.lightSepia}40`,
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              The Penumbra Script: Shadow Edition
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ fontFamily: fonts.body, color: colors.lightSepia }}
              className="text-lg md:text-xl italic"
            >
              &quot;Because the best stories often emerge from the edges of
              light.&quot;
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ backgroundColor: colors.deepSepia }}
            className="w-24 h-1 mx-auto mb-12 md:mb-16"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-none"
          >
            <motion.section variants={itemVariants} className="mb-12 md:mb-16">
              <SectionTitle>About the Contest</SectionTitle>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ fontFamily: fonts.body }}
                className="text-base md:text-lg mb-6"
              >
                Penumbra Penned invites writers to explore the shadows of
                storytelling in our inaugural The Penumbra Script: Shadow
                Edition.
                <br />
                <br />
                This competition seeks narratives that challenge conventions,
                sparks innovation, explore the liminal spaces of human
                experience, and find beauty in the complicated truths that lie
                between light and dark.
              </motion.p>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-12 md:mb-16">
              <SectionTitle>Theme</SectionTitle>
              <ContestCard>
                <CardTitle
                  style={{
                    color: colors.nightBlue,
                    fontFamily: fonts.heading,
                  }}
                  className="mb-4"
                >
                  Contest Theme
                </CardTitle>
                <p
                  style={{ fontFamily: fonts.body, color: colors.deepSepia }}
                  className="text-base md:text-lg mb-2"
                >
                  {
                    "Let your shadow speak—unveiling the mesmerizing and mysterious visions that only your light can bring to life."
                  }
                </p>
                <p
                  style={{
                    fontFamily: fonts.body,
                    color: colors.nightBlue,
                  }}
                >
                  Embrace the interplay between light and darkness. Let the
                  unseen parts of yourself reveal truths that only emerge when
                  cast against the glow of your own awareness and insight.
                </p>
              </ContestCard>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-12 md:mb-16">
              <SectionTitle>Key Dates</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {keyDates.map((item, index) => (
                  <ContestCard key={index} delay={index * 0.1}>
                    <CardTitle
                      style={{
                        color: colors.nightBlue,
                        fontFamily: fonts.heading,
                      }}
                      className="mb-3"
                    >
                      {item.title}
                    </CardTitle>
                    <p
                      style={{
                        fontFamily: fonts.body,
                        color: colors.deepSepia,
                      }}
                      className="text-base md:text-lg mb-2"
                    >
                      {item.date}
                    </p>
                    <p
                      style={{
                        fontFamily: fonts.body,
                        color: colors.nightBlue,
                      }}
                    >
                      {item.description}
                    </p>
                  </ContestCard>
                ))}
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-12 md:mb-16">
              <SectionTitle>Entry Fees</SectionTitle>
              <ContestCard className="mb-8">
                <ul className="space-y-4">
                  {entryFees.map((fee, index) => (
                    <ListItem key={index}>
                      <span
                        style={{
                          color: colors.deepSepia,
                        }}
                        className="font-bold text-base md:text-lg"
                      >
                        {fee.title}
                      </span>{" "}
                      {fee.description}
                      <span style={{ color: colors.nightBlue }}>
                        {fee.note && ` ${fee.note}`}
                      </span>
                    </ListItem>
                  ))}
                </ul>
              </ContestCard>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-12 md:mb-16">
              <SectionTitle>Prizes</SectionTitle>
              <div className="space-y-4 md:space-y-8">
                {prizes.map((prize, index) => (
                  <ContestCard key={index} delay={index * 0.15}>
                    <CardTitle
                      style={{
                        color: colors.nightBlue,
                        fontFamily: fonts.heading,
                      }}
                      className="mb-4"
                    >
                      {prize.title}
                    </CardTitle>
                    {prize.benefits ? (
                      <ul
                        style={{
                          fontFamily: fonts.body,
                          color: colors.deepSepia,
                        }}
                        className="space-y-2"
                      >
                        {prize.benefits.map((benefit, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <span className="font-bold">{benefit.label}</span>{" "}
                            {benefit.value}
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        style={{
                          fontFamily: fonts.body,
                          color: colors.deepSepia,
                        }}
                      >
                        {prize.description}
                      </p>
                    )}
                  </ContestCard>
                ))}
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <SectionTitle>Submission Guidelines</SectionTitle>
              <ContestCard className="mb-8">
                <ul className="space-y-4">
                  {guidelines.map((guideline, index) => (
                    <ListItem key={index}>
                      <span
                        style={{
                          color: colors.deepSepia,
                        }}
                        className="font-bold"
                      >
                        {guideline.label}
                      </span>{" "}
                      {guideline.value}
                    </ListItem>
                  ))}
                </ul>
              </ContestCard>

              <div className="flex justify-center mt-8 md:mt-12">
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 10px 25px ${colors.cream}30`,
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/login-to-penumbra")}
                  style={{
                    fontFamily: fonts.button,
                    backgroundColor: colors.cream,
                    color: colors.inkBrown,
                  }}
                  className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-md cursor-not-allowed shadow-lg transition-all duration-300"
                >
                  Submissions Open July 1st
                </motion.button>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default ContestPage;