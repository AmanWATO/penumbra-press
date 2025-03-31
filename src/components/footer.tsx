/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Mail } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useConfig } from "@/context/ConfigProvider";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
  const theme = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      style={{ color: theme.sections.headFoot.text }}
      className="hover:bg-[#232128]"
    >
      <Link
        href={href}
        target={href.startsWith('http') || href.startsWith('mailto') ? "_blank" : "_self"}
        rel={href.startsWith('http') ? "noopener noreferrer" : ""}
      >
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </Button>
  );
};

interface FooterLinkProps {
  href: string;
  label: string;
}

const FooterLink = ({ href, label }: FooterLinkProps) => {
  const theme = useTheme();
  
  return (
    <Link 
      href={href} 
      className="hover:underline"
      style={{ color: theme.text.secondary }}
    >
      {label}
    </Link>
  );
};

export function Footer() {
  const theme = useTheme();
  const config = useConfig();
  
  const socialLinks = [
    {
      href: config.about_author.instaId,
      icon: <Instagram className="h-5 w-5" />,
      label: "Instagram"
    },
    {
      href: "mailto:penumbrapress22@gmail.com",
      icon: <Mail className="h-5 w-5" />,
      label: "Email"
    }
  ];
  
  const quickLinks = [
    { href: "/books", label: "Books" },
    { href: "/instagram", label: "Instagram" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <footer
      className="py-8 border-t mt-auto"
      style={{
        backgroundColor: theme.sections.headFoot.background,
        borderColor: theme.sections.headFoot.accent,
        fontFamily: theme.fonts.body,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image
                src="/penumbra_press_without_text.png"
                alt="Penumbra Penned"
                width={32}
                height={32}
                className="rounded-md"
              />
              <span
                className="text-lg font-semibold"
                style={{
                  fontFamily: theme.fonts.heading,
                  color: theme.sections.headFoot.text,
                }}
              >
                {`${config.app.name}`}
              </span>
            </Link>
            <p
              className="text-sm"
              style={{ color: theme.sections.headFoot.text }}
            >
              Where words dwell between light and shadow — a haven for poetry,
              storytelling, and literary reflections.
            </p>
          </div>
          
          {/* Keeping the commented section as requested */}
          {/* <div>
            <h3 
              className="font-semibold mb-4"
              style={{ color: theme.sections.headFoot.text }}
            >
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-2 text-sm">
              {quickLinks.map((link, index) => (
                <FooterLink 
                  key={`quicklink-${index}`}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </nav>
          </div> */}
          
          <div>
            <h3
              className="font-semibold mb-4"
              style={{ color: theme.sections.headFoot.text }}
            >
              Connect
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <SocialLink 
                  key={`social-${index}`}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          className="mt-8 pt-6 border-t text-center text-sm"
          style={{
            borderColor: theme.border.light,
            color: theme.sections.headFoot.text,
          }}
        >
          <p>
            &copy; {new Date().getFullYear()} {`${config.app.name}`}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}