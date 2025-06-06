import React from "react";
import Head from "next/head";
import ContestPage from "./ContestPage";

function Page() {
  return (
    <>
      <Head>
        <title>The Penumbra Script: Shadow Edition - Writing Contest</title>
        <meta
          name="description"
          content="Join our writing contest exploring stories that emerge from the edges of light. Compete for cash prizes, publishing opportunities, and features in the Shadow Script Anthology."
        />
        <meta
          name="keywords"
          content="writing contest, shadow edition, penumbra script, writing competition, short story contest, creative writing, fiction contest, poetry contest, Indian writers"
        />
        <meta
          property="og:title"
          content="The Penumbra Script: Shadow Edition - Writing Contest"
        />
        <meta
          property="og:description"
          content="Explore the shadows of storytelling in our inaugural writing contest with prizes up to ₹10,000 and publishing opportunities."
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_WEB_URL}/penumbra-script-contest`}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              name: "The Penumbra Script: Shadow Edition Writing Contest",
              description:
                "A writing competition seeking narratives that challenge conventions, spark innovation, and explore the liminal spaces of human experience.",
              startDate: "2025-06-01",
              endDate: "2025-08-10",
              eventStatus: "EventScheduled",
              eventAttendanceMode: "OnlineEventAttendanceMode",
              organizer: {
                "@type": "Organization",
                name: "Penumbra Penned",
                url: `${process.env.NEXT_WEB_URL}`,
              },
              location: {
                "@type": "VirtualLocation",
                url: `${process.env.NEXT_WEB_URL}/penumbra-script-contest`,
              },
              offers: [
                {
                  "@type": "Offer",
                  name: "Early Bird Entry",
                  price: "99",
                  priceCurrency: "INR",
                  validFrom: "2025-06-01",
                  validThrough: "2025-06-15",
                  availability: "PreOrder",
                },
                {
                  "@type": "Offer",
                  name: "Standard Entry",
                  price: "149",
                  priceCurrency: "INR",
                  validFrom: "2025-06-16",
                  validThrough: "2025-08-10",
                  availability: "PreOrder",
                },
              ],
            }),
          }}
        />
      </Head>
      <ContestPage />
    </>
  );
}

export default Page;
