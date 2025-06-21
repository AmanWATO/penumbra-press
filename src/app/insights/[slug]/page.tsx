// src/app/insights/[slug]/page.tsx

import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs";
import BlogPostPage from "./BlogPostPage";
import Head from "next/head";
import type { Metadata } from "next";

// This is the correct typing from Next.js App Router
interface PageProps {
  params: { slug: string };
}

// ✅ This works fine with Next.js App Directory!
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Post Not Found | Penumbra Penned",
    };
  }

  return {
    title: `${blog.title} | Penumbra Penned`,
    description: blog.excerpt || "Read this reflective piece from the Penumbra.",
    alternates: {
      canonical: `https://penumbrapenned.com/insights/${params.slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://penumbrapenned.com/insights/${params.slug}`,
      type: "article",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ✅ Must match the same prop typing pattern
export default async function Page({ params }: PageProps) {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={`Penumbra Penned, blog, ${blog.title}, ${blog.tags?.join(", ")}`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:published_time" content={blog.publishedAt} />
        <meta name="author" content="Aman Srivastava" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              datePublished: blog.publishedAt,
              description: blog.excerpt,
              author: {
                "@type": "Person",
                name: "Aman Srivastava",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://penumbrapenned.com/insights/${params.slug}`,
              },
            }),
          }}
        />
      </Head>

      <BlogPostPage blog={blog} />
    </>
  );
}
