import Head from "next/head";
import dynamic from "next/dynamic";
import GeoMessage from "@/components/geo-message";
import CountdownBanner from "@/components/countdown-banner";
import WeeklyContestResults from "@/components/weekly/WeeklyContestResults";

const HeroSection = dynamic(() => import("@/components/hero-section"));
const BooksSection = dynamic(() => import("@/components/books-section"));
const BlogSection = dynamic(() => import("@/components/blog-section"));
const QuoteSection = dynamic(() => import("@/components/quote-section"));
const ContestSection = dynamic(() => import("@/components/contest-section"));
const AboutSection = dynamic(() => import("@/components/about-section"));
const NewsletterSection = dynamic(
  () => import("@/components/newsletter-section")
);

export default function Home() {
  return (
    <>
      <Head>
        <title>Penumbra Penned | Where Shadows Inspire Stories</title>
        <meta
          name="description"
          content="Penumbra Penned is a literary universe celebrating stories born between light and shadow. Join our contests, read poetic journeys, and unleash your narrative magic."
        />
        <meta
          name="keywords"
          content="penumbra penned, writing contest, storytelling, poetic, literary platform, books, quotes"
        />

        {/* Open Graph Meta */}
        <meta
          property="og:title"
          content="Penumbra Penned | Shadow Stories Await"
        />
        <meta
          property="og:description"
          content="Unveil your story in the shadow-lit world of Penumbra. Submit entries, explore books, and join our writing contest."
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_WEB_URL}/?utm_source=organic&utm_medium=web&utm_campaign=penumbra_home`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_WEB_URL}/penumbra_press_without_text.png`}
        />
        <meta name="robots" content="index, follow" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Penumbra Penned",
              url: `${process.env.NEXT_WEB_URL}`,
              potentialAction: {
                "@type": "SearchAction",
                target: `${process.env.NEXT_WEB_URL}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      {/* <CountdownBanner /> */}

      <div className="min-h-screen flex flex-col">
        <HeroSection />
        <BooksSection />
        <ContestSection />
        <QuoteSection />
        <BlogSection />
        <AboutSection />
        <NewsletterSection />
        <GeoMessage />
      </div>
    </>
  );
}
