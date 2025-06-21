
import { notFound } from "next/navigation";
import { getBlogBySlug } from "@/lib/blogs";
import BlogPostPage from "./BlogPostPage";

export default function Page({ params }: { params: { slug: string } }) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return <BlogPostPage blog={blog} />;
}
