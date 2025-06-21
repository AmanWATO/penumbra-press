import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs";
import BlogPostPage from "./BlogPostPage";
import { Metadata } from "next";
import Head from "next/head";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug); // Ensure this is async if needed

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
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function Page({ params }: Props) {
  const blog = await getBlogBySlug(params.slug); // Again, ensure this is async

  if (!blog) {
    notFound();
  }

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={`Penumbra Penned, blog, ${blog.title}, ${blog.tags?.join(
            ", "
          )}`}
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
