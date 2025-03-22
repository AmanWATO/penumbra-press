"use client";

import { AboutSection } from "@/components/about-section";
import { BooksSection } from "@/components/books-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { NewsletterSection } from "@/components/newsletter-section";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <BooksSection />
      {/* <InstagramFeed /> */}
      <AboutSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
