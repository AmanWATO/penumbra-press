import Head from "next/head";
import QuotesPage from "./QuotesPage";

function Page() {
  return (
    <>
      <Head>
        <title>Penumbra Quotes - Unveil Your Inner Light</title>
        <meta
          name="description"
          content="A curated collection of powerful quotes from the Penumbra community."
        />
        <meta
          name="keywords"
          content="Penumbra, quotes, creative writing, inspirational quotes, community writing"
        />
        <meta property="og:title" content="Penumbra Quotes" />
        <meta
          property="og:description"
          content="A curated collection of powerful quotes from the Penumbra community."
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_WEB_URL}/penumbra-quotes`}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Penumbra Quotes",
              url: `${process.env.NEXT_WEB_URL}/penumbra-quotes`,
              description:
                "A curated collection of powerful quotes from the Penumbra community.",
            }),
          }}
        />
      </Head>
      <QuotesPage />
    </>
  );
}

export default Page;
