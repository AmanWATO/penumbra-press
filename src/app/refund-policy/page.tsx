import Head from "next/head";
import { Metadata } from "next";
import RefundPolicyPage from "./RefundPage";

export const metadata: Metadata = {
  title: "Refund Policy | Penumbra Penned",
  description:
    "Fair and transparent refund policy for Penumbra Penned. Learn about our writer-friendly approach to refunds for subscriptions, courses, and services.",
  alternates: {
    canonical: "https://penumbrapenned.com/refund-policy",
  },
};

export default function RefundPolicyPageWrapper() {
  return (
    <>
      <Head>
        <title>Refund Policy - Penumbra Penned</title>
        <meta
          name="description"
          content="Fair and transparent refund policy for Penumbra Penned. Learn about our writer-friendly approach to refunds for subscriptions, courses, and services."
        />
        <meta
          name="keywords"
          content="refund policy, money back guarantee, subscription refund, course refund, Penumbra Penned refunds, writing platform refund, customer satisfaction, refund process"
        />
        <meta property="og:title" content="Refund Policy - Penumbra Penned" />
        <meta
          property="og:description"
          content="Fair and transparent refund policy for Penumbra Penned. Learn about our writer-friendly approach to refunds for subscriptions, courses, and services."
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_WEB_URL}/refund-policy`}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Penumbra Penned" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_WEB_URL}/refund-policy`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Refund Policy",
              url: `${process.env.NEXT_WEB_URL}/refund-policy`,
              description:
                "Fair and transparent refund policy for Penumbra Penned. Learn about our writer-friendly approach to refunds for subscriptions, courses, and services.",
              isPartOf: {
                "@type": "WebSite",
                name: "Penumbra Penned",
                url: process.env.NEXT_WEB_URL,
              },
              mainEntity: {
                "@type": "Organization",
                name: "Penumbra Penned",
                description:
                  "Creative writing platform with fair and transparent refund policies",
                url: process.env.NEXT_WEB_URL,
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Customer Support",
                  email: "penumbrapress22@gmail.com",
                  availableLanguage: "English",
                },
                returnPolicy: `${process.env.NEXT_WEB_URL}/refund-policy`,
              },
              dateModified: new Date().toISOString(),
              inLanguage: "en-US",
              specialty: "Refund and Return Policy",
              about: {
                "@type": "Thing",
                name: "Refund Policy",
                description:
                  "Terms and conditions for refunds on writing platform services",
              },
            }),
          }}
        />
      </Head>

      <RefundPolicyPage />
    </>
  );
}
