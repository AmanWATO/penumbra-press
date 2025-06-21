import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs";
import BlogPostPage from "./BlogPostPage";

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    return {
      title: "Post Not Found | Penumbra Penned",
    };
  }

  return {
    title: `${blog.title} | Penumbra Penned`,
    description:
      blog.excerpt || "Read this reflective piece from the Penumbra.",
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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Page({ params: { slug } }: Params) {
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();
  return <BlogPostPage blog={blog} />;
}
