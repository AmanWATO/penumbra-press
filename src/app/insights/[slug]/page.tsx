import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs";
import BlogPostPage from "./BlogPostPage";

export async function generateMetadata(
  context: any // 👈 temporary fix, or use Awaited<{ params: { slug: string } }>
): Promise<Metadata> {
  const params = await context.params; // 👈 treat it as async
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
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page(
  context: any // 👈 same trick
) {
  const params = await context.params;
  const blog = await getBlogBySlug(params.slug);
  if (!blog) notFound();
  return <BlogPostPage blog={blog} />;
}
