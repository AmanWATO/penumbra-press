"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Menu, X } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();

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
        <Link href="/" className="flex items-center space-x-3">
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
            Penumbra Press
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/books"
            className="hover:opacity-80 transition-opacity"
            style={{ color: theme.text.primary }}
          >
            Books
          </Link>
          <Link
            href="/instagram"
            className="hover:opacity-80 transition-opacity"
            style={{ color: theme.text.primary }}
          >
            Instagram
          </Link>
          <Link
            href="/about"
            className="hover:opacity-80 transition-opacity"
            style={{ color: theme.text.primary }}
          >
            About
          </Link>
          <Button
            asChild
            variant="outline"
            style={{
              borderColor: theme.border.medium,
              color: theme.text.primary,
            }}
          >
            <Link href="/contact">
              <Mail className=" h-4 w-4" />
              Contact
            </Link>
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
            <Link
              href="/books"
              className="py-2 hover:opacity-80 transition-opacity"
              style={{ color: theme.text.primary }}
            >
              Books
            </Link>
            <Link
              href="/instagram"
              className="py-2 hover:opacity-80 transition-opacity"
              style={{ color: theme.text.primary }}
            >
              Instagram
            </Link>
            <Link
              href="/about"
              className="py-2 hover:opacity-80 transition-opacity"
              style={{ color: theme.text.primary }}
            >
              About
            </Link>
            <Button
              asChild
              variant="outline"
              className="w-full"
              style={{
                borderColor: theme.border.medium,
                color: theme.text.primary,
              }}
            >
              <Link href="/contact" className="justify-center">
                <Mail className=" h-4 w-4" />
                Contact
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
