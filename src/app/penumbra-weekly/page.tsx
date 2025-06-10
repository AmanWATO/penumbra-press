import Head from "next/head";
import WeeklyChallengeSystem from "./WeeklyChallengeSystem";

export default function WeeklyChallengesPage() {
  return (
    <>
      <Head>
        <title>
          Penumbra Prologue Weekly Writing Challenges - Penumbra Penned
        </title>
        <meta
          name="description"
          content="Join the weekly writing challenges at Penumbra Penned. Submit stories based on unique themes and prompts each week."
        />
        <meta
          name="keywords"
          content="weekly writing, writing contest, Penumbra Penned, creative writing prompts, writer challenge, flash fiction, micro stories"
        />
        <meta
          property="og:title"
          content="Weekly Writing Challenges - Penumbra Penned"
        />
        <meta
          property="og:description"
          content="Submit your entries for weekly writing challenges. New prompts every week. Let your imagination bloom."
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_WEB_URL}/penumbra-weekly`}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Penumbra Penned" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_WEB_URL}/penumbra-weekly`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Weekly Writing Challenges",
              url: `${process.env.NEXT_WEB_URL}/penumbra-weekly`,
              description:
                "Enter the Penumbra Prologue Contest and let your story shine through the Ink Rite Banner.",
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

      <WeeklyChallengeSystem />
    </>
  );
}
