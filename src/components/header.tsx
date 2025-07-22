"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogIn, Menu, UserRoundPen, X } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { useRouter } from "next/navigation";
import { useConfig } from "@/context/ConfigProvider";
import { colors } from "@/styles/theme";
import useAuthState from "@/hooks/useAuthState";
import { getStoredToken } from "@/api/backendService";

interface NavLinkProps {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
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
  const { user } = useAuthState();

  const token = getStoredToken();

  // Helper function to handle navigation and close mobile menu
  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    {
      label: "The Penumbra Script",
      action: () => handleNavigation("/penumbra-script-contest"),
    },
    {
      label: "Penumbra Weekly",
      action: () => handleNavigation("/penumbra-weekly"),
    },
    {
      label: "Books",
      action: () => handleNavigation("/my-books"),
    },
    {
      label: "Insights",
      action: () => handleNavigation("/insights"),
    },
    {
      label: "Quotes",
      action: () => handleNavigation("/penumbra-quotes"),
    },
    token
      ? {
          label: "Dashboard",
          action: () => handleNavigation("/penumbra-dashboard"),
          icon: <UserRoundPen className="h-4 w-4" />,
        }
      : {
          label: "Login",
          action: () => handleNavigation("/login-to-penumbra"),
          icon: <LogIn className="h-4 w-4" />,
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
      <div className="container mx-auto px-4 py-4 max-md:py-3 max-md:pb-2 pb-3 flex items-center justify-between">
        <div
          onClick={() => handleNavigation("/")}
          className="flex items-center cursor-pointer"
        >
          <Image
            src="/new-logo.png"
            alt="Penumbra Penned"
            width={60}
            height={60}
            className="rounded-sm"
          />
          <span
            className="text-2xl max-md:text-xl font-bold"
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
        <div
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ color: theme.sections.headFoot.text }}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </div>
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
