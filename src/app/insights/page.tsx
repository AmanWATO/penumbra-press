import BlogPage from "./BlogPage";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Author's Insights | Penumbra Penned",
  description:
    "Dive into musings, reflections, and narrative fragments from Aman. A blog space where thoughts spill like ink in the half-light of creativity.",
  alternates: {
    canonical: "https://penumbrapenned.com/insights",
  },
  openGraph: {
    title: "Author's Insights | Penumbra Penned",
    description:
      "Dive into musings, reflections, and narrative fragments from Aman. A blog space where thoughts spill like ink in the half-light of creativity.",
    url: "https://penumbrapenned.com/insights",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <>
      <Head>
        <title>{`Author's Blog`} | Reflections from the Penumbra</title>
        <meta
          name="description"
          content="Read poetic reflections, thoughtful essays, and musings from Aman — founder of Penumbra Penned."
        />
        <meta
          name="keywords"
          content="Aman blog, poetic thoughts, essays, reflections, Penumbra Penned blog, writing blog"
        />
        <meta
          property="og:title"
          content="Author's Blog | Reflections from the Penumbra"
        />
        <meta
          property="og:description"
          content="Read poetic reflections, thoughtful essays, and musings from Aman — founder of Penumbra Penned."
        />
        <meta property="og:url" content={`${process.env.NEXT_WEB_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Author's Blog",
              description:
                "Poetic reflections, essays, and narrative pieces by Aman Srivastava at Penumbra Penned.",
              url: `${process.env.NEXT_WEB_URL}/blog`,
              author: {
                "@type": "Person",
                name: "Aman Srivastava",
              },
            }),
          }}
        />
      </Head>
      <BlogPage />
    </>
  );
}
