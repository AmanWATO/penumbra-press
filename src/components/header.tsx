"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Mail, Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";
import { useConfig } from "@/context/ConfigProvider";
import { colors } from "@/styles/theme";

interface NavLinkProps {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
}
interface HandleScroll {
  (id: string): void;
}

const NavLink: React.FC<NavLinkProps> = ({ label, action, icon }) => {
  const theme = useTheme();

  if (icon) {
    return (
      <Button
        asChild
        variant="outline"
        className={`cursor-pointer hover:underline ${
          !icon ? "" : "w-full md:w-auto justify-center"
        }`}
        style={{
          borderColor: theme.border.medium,
          color: colors.inkBrown,
        }}
      >
        <button onClick={action} className="cursor-pointer">
          {icon}
          {label}
        </button>
      </Button>
    );
  }

  return (
    <button
      onClick={action}
      className="hover:opacity-80 hover:underline transition-opacity cursor-pointer py-2 md:py-0"
      style={{ color: theme.sections.headFoot.text }}
    >
      {label}
    </button>
  );
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const config = useConfig();

  const handleScroll: HandleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    {
      label: "Shadow Script Contest",
      action: () => router.push("/shadow-script-contest"),
    },
    {
      label: "Books",
      // Keeping the commented code as requested
      // action: () => handleScroll("books"),
      action: () => router.push("/my-books"),
    },
    // {
    //   label: "Instagram",
    //   action: () => handleScroll("instagram-feed"),
    // },
    {
      label: "Quotes",
      action: () => router.push("/penumbra-quotes"),
    },

    {
      label: "About",
      action: () => handleScroll("about-author"),
    },
    {
      label: "Contact",
      action: () => router.push("/contact-us"),
      icon: <Mail className="h-4 w-4" />,
    },
  ];

  return (
    <header
      className="w-full border-b"
      style={{
        backgroundColor: theme.sections.headFoot.background,
        borderColor: theme.sections.headFoot.accent,
        fontFamily: theme.fonts.body,
      }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div
          onClick={() => router.push("/")}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <Image
            src="/penumbra_press_without_text.png"
            alt="Penumbra Penned"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span
            className="text-xl font-semibold"
            style={{
              fontFamily: theme.fonts.heading,
              color: theme.sections.headFoot.text,
            }}
          >
            {`${config.app.name}`}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <NavLink
              key={`desktop-${index}`}
              label={link.label}
              action={link.action}
              icon={link.icon}
            />
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: theme.sections.headFoot.text }}
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
          className="md:hidden px-6 py-4 pb-8 border-t "
          style={{ borderColor: theme.border.light }}
        >
          <nav className="flex flex-col space-y-2 max-md:items-start">
            {navLinks.map((link, index) => (
              <NavLink
                key={`mobile-${index}`}
                label={link.label}
                action={link.action}
                icon={link.icon}
              />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
