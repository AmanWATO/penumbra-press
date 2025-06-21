// src/app/insights/[slug]/page.tsx

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs";
import BlogPostPage from "./BlogPostPage";

type PageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
      publishedTime: blog.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL("https://penumbrapenned.com"),
  };
}

export default async function Page({ params }: PageProps) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) notFound();
  return <BlogPostPage blog={blog} />;
}
