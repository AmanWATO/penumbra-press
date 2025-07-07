import React, { Suspense } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import WeeklyContestResults from "@/components/weekly/WeeklyContestResults";



export const metadata: Metadata = {
  title: "Weekly Writing Results | Penumbra Penned",
  description:
    "Discover the winning entries and top stories from Penumbra Penned’s weekly writing challenges. Celebrate creativity and excellence.",
  alternates: {
    canonical: "https://penumbrapenned.com/weekly-results",
  },
};

export default function WeeklyResultsPage() {
  return (
    <>
      <Head>
        <title>Weekly Writing Results - Penumbra Penned</title>
        <meta
          name="description"
          content="View the top entries from our weekly writing challenges. Celebrate the creative voices that stood out."
        />
        <meta
          name="keywords"
          content="writing challenge winners, Penumbra results, weekly writing results, winning stories, best writers, Penumbra Penned winners"
        />
        <meta property="og:title" content="Weekly Results - Penumbra Penned" />
        <meta
          property="og:description"
          content="Explore the winning entries from our weekly challenges. Read the stories that inspired and impressed."
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_WEB_URL}/weekly-results`}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Penumbra Penned" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_WEB_URL}/weekly-results`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Weekly Writing Results",
              url: `${process.env.NEXT_WEB_URL}/weekly-results`,
              description:
                "Celebrate the brilliance of the winners in our weekly writing challenges. See who triumphed in storytelling.",
              isPartOf: {
                "@type": "WebSite",
                name: "Penumbra Penned",
                url: process.env.NEXT_WEB_URL,
              },
              mainEntity: {
                "@type": "Organization",
                name: "Penumbra Penned",
                description: "Creative writing platform",
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Customer Support",
                  email: "penumbrapress22@gmail.com",
                  availableLanguage: "English",
                },
              },
              dateModified: new Date().toISOString(),
              inLanguage: "en-US",
            }),
          }}
        />
      </Head>

      <section>
        <Suspense fallback={<p className="text-center mt-10 text-gray-500">Loading results... ✍️</p>}>
          <WeeklyContestResults />
        </Suspense>
      </section>
    </>
  );
}
