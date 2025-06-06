import Head from "next/head";
import TNCPage from "./TNCPage";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms & Conditions - Penumbra Penned</title>
        <meta
          name="description"
          content="Read the Terms & Conditions for Penumbra Penned. Understand your rights and responsibilities when using our creative writing platform."
        />
        <meta
          name="keywords"
          content="terms and conditions, terms of service, user agreement, Penumbra Penned, writing platform, legal terms, user rights, intellectual property"
        />
        <meta
          property="og:title"
          content="Terms & Conditions - Penumbra Penned"
        />
        <meta
          property="og:description"
          content="Read the Terms & Conditions for Penumbra Penned. Understand your rights and responsibilities when using our creative writing platform."
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_WEB_URL}/terms-and-conditions`}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Penumbra Penned" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href={`${process.env.NEXT_WEB_URL}/terms-and-conditions`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Terms & Conditions",
              url: `${process.env.NEXT_WEB_URL}/terms-and-conditions`,
              description:
                "Read the Terms & Conditions for Penumbra Penned. Understand your rights and responsibilities when using our creative writing platform.",
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
      <TNCPage />
    </>
  );
}
