import { faqItems } from "@/lib/faq";
import Head from "next/head";
import FAQPage from "./FAQPage";

export default function FAQ() {
  return (
    <>
      <Head>
        <title>FAQ - Frequently Asked Questions | Penumbra Penned</title>
        <meta
          name="description"
          content="Get answers to frequently asked questions about Penumbra Penned writing contests. Learn about participation, entry fees, submission guidelines, and more."
        />
        <meta
          name="keywords"
          content="Penumbra Penned FAQ, writing contest questions, contest participation, submission guidelines, writing competition help, creative writing contests India"
        />
        <meta
          property="og:title"
          content="FAQ - Frequently Asked Questions | Penumbra Penned"
        />
        <meta
          property="og:description"
          content="Get answers to frequently asked questions about Penumbra Penned writing contests. Learn about participation, entry fees, submission guidelines, and more."
        />
        <meta property="og:url" content={`${process.env.NEXT_WEB_URL}/faq`} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Penumbra Penned" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`${process.env.NEXT_WEB_URL}/faq`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              name: "Frequently Asked Questions",
              url: `${process.env.NEXT_WEB_URL}/faq`,
              description:
                "Get answers to frequently asked questions about Penumbra Penned writing contests. Learn about participation, entry fees, submission guidelines, and more.",
              isPartOf: {
                "@type": "WebSite",
                name: "Penumbra Penned",
                url: process.env.NEXT_WEB_URL,
              },
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
              publisher: {
                "@type": "Organization",
                name: "Penumbra Penned",
                description:
                  "Creative writing platform hosting contests for emerging writers",
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "Customer Support",
                  email: "penumbrapress22@gmail.com",
                  availableLanguage: "English",
                },
              },
              dateModified: new Date().toISOString(),
              inLanguage: "en-US",
              audience: {
                "@type": "Audience",
                audienceType: "Writers, Creative Writers, Contest Participants",
              },
            }),
          }}
        />
      </Head>

      <FAQPage />
    </>
  );
}
