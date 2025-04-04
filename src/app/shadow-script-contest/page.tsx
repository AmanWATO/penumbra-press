"use client";

import React from "react";
import { colors, fonts } from "@/styles/theme";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2
    style={{
      fontFamily: fonts.heading,
      color: colors.parchment,
      borderColor: colors.inkBrown,
    }}
    className="text-3xl mb-6 border-b pb-2"
  >
    {children}
  </h2>
);

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    style={{
      backgroundColor: colors.nightBlue,
      borderColor: colors.inkBrown,
    }}
    className={`p-6 rounded-lg border ${className}`}
  >
    {children}
  </div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3
    style={{
      fontFamily: fonts.heading,
      color: colors.lightSepia,
    }}
    className="text-xl md:text-2xl mb-3"
  >
    {children}
  </h3>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <div style={{ fontFamily: fonts.body }}>{children}</div>
  </li>
);

export default function ContestPage() {
  const keyDates = [
    {
      title: "Theme Announcement",
      date: "15th April, 2025",
      description:
        "The contest theme will be revealed, providing direction for your submissions.",
    },
    {
      title: "Submission Portal Opens",
      date: "1st May, 2025",
      description: "Begin submitting your entries through our online portal.",
    },
    {
      title: "Early Bird Deadline",
      date: "15th May, 2025",
      description:
        "Last day to submit entries at the reduced rate of ₹99 per entry.",
    },
    {
      title: "Final Deadline",
      date: "15th July, 2025",
      description:
        "Last day to submit entries at the standard rate of ₹149 per entry.",
    },
  ];

  const entryFees = [
    {
      title: "Early Bird Rate:",
      description: "₹99 per entry",
      note: "(May 1st to May 15th)",
    },
    {
      title: "Standard Rate:",
      description: "₹149 per entry",
      note: "(May 16th to July 15th)",
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
        { label: "Feature:", value: "Author spotlight in quarterly magazine" },
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
      title: "Top 25 Entries",
      description:
        "All finalists will be published in the exclusive Shadow Script Anthology by Penumbra Penned.",
    },
  ];

  const guidelines = [
    { label: "Word Count:", value: "1,500 to 5,000 words" },
    { label: "Genre:", value: "Open to all fiction that aligns with theme" },
    { label: "Eligibility:", value: "Open to all Indian writers, ages 16+" },
  ];

  return (
    <div
      style={{ backgroundColor: colors.penumbraBlack, color: colors.gray100 }}
      className="min-h-screen pt-16 md:pt-24 pb-16"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h1
          style={{ fontFamily: fonts.heading }}
          className="text-4xl sm:text-5xl md:text-6xl text-center mb-4"
        >
          The Shadow Script Contest
        </h1>
        <p
          style={{ fontFamily: fonts.body, color: colors.lightSepia }}
          className="text-lg md:text-xl italic text-center mb-8"
        >
          &quot;Because the best stories often emerge from the edges of
          light.&quot;
        </p>

        <div
          style={{ backgroundColor: colors.deepSepia }}
          className="w-24 h-1 mx-auto mb-12 md:mb-16"
        ></div>

        <div className="max-w-none">
          <section className="mb-12 md:mb-16">
            <SectionTitle>About the Contest</SectionTitle>
            <p
              style={{ fontFamily: fonts.body }}
              className="text-base md:text-lg mb-6"
            >
              Penumbra Penned invites writers to explore the shadows of
              storytelling in our inaugural Shadow Script Contest.
              <br />
              <br />
              This competition seeks narratives that challenge conventions,
              sparks innovation, explore the liminal spaces of human experience,
              and find beauty in the complicated truths that lie between light
              and dark.
            </p>
          </section>

          <section className="mb-12 md:mb-16">
            <SectionTitle>Key Dates</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {keyDates.map((item, index) => (
                <Card key={index}>
                  <CardTitle>{item.title}</CardTitle>
                  <p
                    style={{ fontFamily: fonts.body }}
                    className="text-base md:text-lg mb-2"
                  >
                    {item.date}
                  </p>
                  <p
                    style={{
                      fontFamily: fonts.body,
                      color: colors.mediumSepia,
                    }}
                  >
                    {item.description}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-12 md:mb-16">
            <SectionTitle>Entry Fees</SectionTitle>
            <Card className="mb-8">
              <ul className="space-y-4">
                {entryFees.map((fee, index) => (
                  <ListItem key={index}>
                    <span className="font-bold text-base md:text-lg">
                      {fee.title}
                    </span>{" "}
                    {fee.description}
                    <span style={{ color: colors.mediumSepia }}>
                      {fee.note && ` ${fee.note}`}
                    </span>
                  </ListItem>
                ))}
              </ul>
            </Card>
          </section>

          <section className="mb-12 md:mb-16">
            <SectionTitle>Prizes</SectionTitle>
            <div className="space-y-4 md:space-y-8">
              {prizes.map((prize, index) => (
                <Card key={index}>
                  <CardTitle>{prize.title}</CardTitle>
                  {prize.benefits ? (
                    <ul
                      style={{ fontFamily: fonts.body }}
                      className="space-y-2"
                    >
                      {prize.benefits.map((benefit, idx) => (
                        <li key={idx}>
                          <span className="font-bold">{benefit.label}</span>{" "}
                          {benefit.value}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ fontFamily: fonts.body }}>
                      {prize.description}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          </section>

          <section>
            <SectionTitle>Submission Guidelines</SectionTitle>
            <Card className="mb-8">
              <ul className="space-y-4">
                {guidelines.map((guideline, index) => (
                  <ListItem key={index}>
                    <span className="font-bold">{guideline.label}</span>{" "}
                    {guideline.value}
                  </ListItem>
                ))}
              </ul>
            </Card>

            <div className="flex justify-center mt-8 md:mt-12">
              <button
                disabled
                style={{
                  fontFamily: fonts.button,
                  backgroundColor: colors.inkBrown,
                  color: colors.cream,
                }}
                className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-md cursor-not-allowed shadow-lg"
              >
                Submissions Open May 1st
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
