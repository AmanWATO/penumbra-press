import React from "react";

import Head from "next/head";
import { booksData } from "@/lib/books";
import AuthorPage from "./AuthorPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aman Published Work | Penumbra Penned",
  description:
    "Explore Aman's published works — a curated collection of evocative quotes and poetic insights shaped within the Penumbra community. Where every word carries depth, and every line echoes a journey.",
  alternates: {
    canonical: "https://penumbrapenned.com/my-books",
  },
};

function AuthorBooksPage() {
  return (
    <>
      <Head>
        <title>{`Published Works - Author's Books Collection`}</title>
        <meta
          name="description"
          content="Discover a collection of published books including poetry, collections, and more by the author."
        />
        <meta
          name="keywords"
          content="books, poetry, collection, published works, author books, Grace In The Ether, The Jumbled Flow, When The Sky Meets The Sea of Souls"
        />
        <meta
          property="og:title"
          content="Published Works - Author's Books Collection"
        />
        <meta
          property="og:description"
          content="Discover a collection of published books including poetry, collections, and more by the author."
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_WEB_URL}/my-books`}
        />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Published Works - Author's Books Collection",
              url: `${process.env.NEXT_WEB_URL}/my-books`,
              description:
                "Discover a collection of published books including poetry, collections, and more by the author.",
              mainEntity: {
                "@type": "ItemList",
                itemListElement: booksData.map((book, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Book",
                    name: book.title,
                    yearPublished: book.publicationYear.toString(),
                    genre: book.genre,
                    description: book.description,
                  },
                })),
              },
            }),
          }}
        />
      </Head>

      <AuthorPage />
    </>
  );
}

export default AuthorBooksPage;
