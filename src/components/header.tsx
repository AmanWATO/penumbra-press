"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";
import { useConfig } from "@/context/ConfigProvider";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const config = useConfig();

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className="w-full border-b"
      style={{
        backgroundColor: theme.background.primary,
        borderColor: theme.border.dark,
        fontFamily: theme.fonts.body,
      }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div
          onClick={() => router.push('/')}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <Image
            src="/penumbra_press_without_text.png"
            alt="Penumbra Press"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span
            className="text-xl font-semibold"
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.text.primary,
            }}
          >
            {`${config.app.name}`}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            // onClick={() => handleScroll("books")}
            onClick={() => router.push('/my-books')}
            className="hover:opacity-80 transition-opacity cursor-pointer"
            style={{ color: theme.text.primary }}
          >
            Books
          </button>
          <button
            onClick={() => handleScroll("instagram-feed")}
            className="hover:opacity-80 transition-opacity cursor-pointer"
            style={{ color: theme.text.primary }}
          >
            Instagram
          </button>
          <button
            onClick={() => handleScroll("about-author")}
            className="hover:opacity-80 transition-opacity cursor-pointer"
            style={{ color: theme.text.primary }}
          >
            About
          </button>
          <Button
            asChild
            variant="outline"
            style={{
              borderColor: theme.border.medium,
              color: theme.text.primary,
            }}
          >
            <button
              onClick={() => router.push("/contact-us")}
              className="cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              Contact
            </button>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: theme.text.primary }}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div
          className="md:hidden px-4 py-2 pb-4 border-t"
          style={{ borderColor: theme.border.light }}
        >
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => handleScroll("books")}
              className="py-2 hover:opacity-80 transition-opacity cursor-pointer"
              style={{ color: theme.text.primary }}
            >
              Books
            </button>
            <button
              onClick={() => handleScroll("instagram-feed")}
              className="py-2 hover:opacity-80 transition-opacity cursor-pointer"
              style={{ color: theme.text.primary }}
            >
              Instagram
            </button>
            <button
              onClick={() => handleScroll("about-author")}
              className="py-2 hover:opacity-80 transition-opacity cursor-pointer"
              style={{ color: theme.text.primary }}
            >
              About
            </button>
            <Button
              asChild
              variant="outline"
              className="w-full cursor-pointer"
              style={{
                borderColor: theme.border.medium,
                color: theme.text.primary,
              }}
            >
              <button
                onClick={() => router.push("/contact-us")}
                className="justify-center cursor-pointer"
              >
                <Mail className="h-4 w-4" />
                Contact
              </button>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
