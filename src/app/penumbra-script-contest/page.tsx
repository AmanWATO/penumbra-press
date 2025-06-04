"use client";

import React from "react";
import { colors, fonts } from "@/styles/theme";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { motion } from "framer-motion";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{
      fontFamily: fonts.heading,
      color: colors.parchment,
      borderColor: colors.softBeige,
    }}
    className="text-3xl mb-6 border-b pb-2"
  >
    {children}
  </motion.h2>
);

const Card = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    style={{
      backgroundColor: colors.parchment,
      borderColor: colors.nightBlue,
    }}
    className={`p-6 rounded-lg border ${className} shadow-lg hover:shadow-xl transition-shadow duration-300`}
  >
    {children}
  </motion.div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3
    style={{
      fontFamily: fonts.heading,
      color: colors.nightBlue,
    }}
    className="text-xl md:text-2xl mb-3"
  >
    {children}
  </h3>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <motion.li 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="flex items-start"
  >
    <div style={{ fontFamily: fonts.body, color: colors.deepSepia }}>
      {children}
    </div>
  </motion.li>
);

function ContestPage() {
  const router = useRouter();

  const keyDates = [
    {
      title: "Submission Portal Opens",
      date: "1st July, 2025",
      description: "Begin submitting your entries through our online portal.",
    },
    {
      title: "Early Bird Deadline",
      date: "15th July, 2025",
      description:
        "Last day to submit entries at the reduced rate of ₹99 per entry.",
    },
    {
      title: "Final Deadline",
      date: "15th August, 2025",
      description:
        "Last day to submit entries at the standard rate of ₹149 per entry.",
    },
  ];

  const entryFees = [
    {
      title: "Early Bird Rate:",
      description: "₹99 per entry",
      note: "(July 1st to July 15th)",
    },
    {
      title: "Standard Rate:",
      description: "₹149 per entry",
      note: "(July 16th to August 15th)",
    },
    {
      title: "Multiple Entries Discount:",
      description: "3 entries for ₹399",
      note: "",
    },
  ];

  const prizes = [
    {
      title: "Grand Winner",
      benefits: [
        { label: "Cash Prize:", value: "₹10,000" },
        {
          label: "Publishing:",
          value: "Full book publication with Penumbra Penned",
        },
        { label: "Feature:", value: "Author spotlight in penumbra magazine" },
      ],
    },
    {
      title: "Second Place",
      benefits: [
        { label: "Cash Prize:", value: "₹5,000" },
        {
          label: "Feature:",
          value: "Author interview on Penumbra Penned website",
        },
      ],
    },
    {
      title: "Third Place",
      benefits: [
        { label: "Cash Prize:", value: "₹2,500" },
        {
          label: "Feature:",
          value: "Author spotlight on website and social media",
        },
      ],
    },
    {
      title: "Top 30 Entries",
      description:
        "All finalists will be published in the exclusive Shadow Script Anthology by Penumbra Penned.",
    },
  ];

  const guidelines = [
    { label: "Word Count:", value: "1,500 to 5,000 words" },
    { label: "Genre:", value: "Open to all fiction that aligns with theme" },
    { label: "Language:", value: "English only" },
    { label: "Eligibility:", value: "Open to all Indian writers, ages 16+" },
    {
      label: "Accepted Formats:",
      value:
        "Poetry, Fiction, Epistolary, Creative Non-fiction, Flash Fiction, Short Stories",
    },
  ];

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
      <Head>
        <title>The Penumbra Script: Shadow Edition - Writing Contest</title>
        <meta
          name="description"
          content="Join our writing contest exploring stories that emerge from the edges of light. Compete for cash prizes, publishing opportunities, and features in the Shadow Script Anthology."
        />
        <meta
          name="keywords"
          content="writing contest, shadow edition, penumbra script, writing competition, short story contest, creative writing, fiction contest, poetry contest, Indian writers"
        />
        <meta
          property="og:title"
          content="The Penumbra Script: Shadow Edition - Writing Contest"
        />
        <meta
          property="og:description"
          content="Explore the shadows of storytelling in our inaugural writing contest with prizes up to ₹10,000 and publishing opportunities."
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_WEB_URL}/penumbra-script-contest`}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "The Penumbra Script: Shadow Edition Writing Contest",
              description:
                "A writing competition seeking narratives that challenge conventions, spark innovation, and explore the liminal spaces of human experience.",
              startDate: "2025-06-01",
              endDate: "2025-08-10",
              eventStatus: "EventScheduled",
              eventAttendanceMode: "OnlineEventAttendanceMode",
              organizer: {
                "@type": "Organization",
                name: "Penumbra Penned",
                url: `${process.env.NEXT_WEB_URL}`,
              },
              location: {
                "@type": "VirtualLocation",
                url: `${process.env.NEXT_WEB_URL}/penumbra-script-contest`,
              },
              offers: [
                {
                  "@type": "Offer",
                  name: "Early Bird Entry",
                  price: "99",
                  priceCurrency: "INR",
                  validFrom: "2025-06-01",
                  validThrough: "2025-06-15",
                  availability: "PreOrder",
                },
                {
                  "@type": "Offer",
                  name: "Standard Entry",
                  price: "149",
                  priceCurrency: "INR",
                  validFrom: "2025-06-16",
                  validThrough: "2025-08-10",
                  availability: "PreOrder",
                },
              ],
            }),
          }}
        />
      </Head>
      <div
        style={{ 
          background: `linear-gradient(135deg, ${colors.penumbraBlack} 0%, ${colors.nightBlue} 25%, ${colors.moonGray} 50%, ${colors.nightBlue} 75%, ${colors.penumbraBlack} 100%)`,
          color: colors.gray100 
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
              <Card>
                <CardTitle>Contest Theme</CardTitle>
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
              </Card>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-12 md:mb-16">
              <SectionTitle>Key Dates</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {keyDates.map((item, index) => (
                  <Card key={index} delay={index * 0.1}>
                    <CardTitle>{item.title}</CardTitle>
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
                  </Card>
                ))}
              </div>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-12 md:mb-16">
              <SectionTitle>Entry Fees</SectionTitle>
              <Card className="mb-8">
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
              </Card>
            </motion.section>

            <motion.section variants={itemVariants} className="mb-12 md:mb-16">
              <SectionTitle>Prizes</SectionTitle>
              <div className="space-y-4 md:space-y-8">
                {prizes.map((prize, index) => (
                  <Card key={index} delay={index * 0.15}>
                    <CardTitle>{prize.title}</CardTitle>
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
                  </Card>
                ))}
              </div>
            </motion.section>

            <motion.section variants={itemVariants}>
              <SectionTitle>Submission Guidelines</SectionTitle>
              <Card className="mb-8">
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
              </Card>

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