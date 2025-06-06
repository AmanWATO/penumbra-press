import Head from "next/head";
import PrivacyPage from "./PrivacyPage";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Penumbra Penned</title>
        <meta
          name="description"
          content="Learn how Penumbra Penned protects your privacy and data. We believe your words are yours and your data is yours. Read our transparent privacy policy."
        />
        <meta
          name="keywords"
          content="privacy policy, data protection, privacy rights, Penumbra Penned, data security, personal information, GDPR, user privacy, writing platform privacy"
        />
        <meta property="og:title" content="Privacy Policy - Penumbra Penned" />
        <meta
          property="og:description"
          content="Learn how Penumbra Penned protects your privacy and data. We believe your words are yours and your data is yours. Read our transparent privacy policy."
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_WEB_URL}/privacy-policy`}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Penumbra Penned" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_WEB_URL}/privacy-policy`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Privacy Policy",
              url: `${process.env.NEXT_WEB_URL}/privacy-policy`,
              description:
                "Learn how Penumbra Penned protects your privacy and data. We believe your words are yours and your data is yours. Read our transparent privacy policy.",
              isPartOf: {
                "@type": "WebSite",
                name: "Penumbra Penned",
                url: process.env.NEXT_WEB_URL,
              },
              mainEntity: {
                "@type": "Organization",
                name: "Penumbra Penned",
                description:
                  "Creative writing platform that prioritizes user privacy and data protection",
                privacyPolicy: `${process.env.NEXT_WEB_URL}/privacy-policy`,
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Customer Support",
                  email: "penumbrapress22@gmail.com",
                  availableLanguage: "English",
                },
              },
              dateModified: new Date().toISOString(),
              inLanguage: "en-US",
              specialty: "Data Privacy and Protection",
            }),
          }}
        />
      </Head>

      <PrivacyPage />
    </>
  );
}
