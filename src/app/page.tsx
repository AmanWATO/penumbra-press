"use client";

import { AboutSection } from "@/components/about-section";
import { BooksSection } from "@/components/books-section";
import { HeroSection } from "@/components/hero-section";
import { InstagramFeed } from "@/components/insta-feed";
import { NewsletterSection } from "@/components/newsletter-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <BooksSection />
      <InstagramFeed />
      <AboutSection />
      <NewsletterSection />
    </div>
  );
}
