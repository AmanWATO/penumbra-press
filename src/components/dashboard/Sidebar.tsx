"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FileText, User, Menu, X } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";
import useAuthState from "@/hooks/useAuthState";

const menu = [
  {
    label: "Your Submissions",
    href: "/penumbra-dashboard/submissions",
    icon: FileText,
  },
  { label: "Penumbra Profile", href: "/penumbra-dashboard/account", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, loading } = useAuthState();

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.username) return "U";
    return user.username.charAt(0).toUpperCase();
  };

  // Get display name
  const getDisplayName = () => {
    if (!user) return "Loading...";
    return user.username || "User";
  };

  // Get user email
  const getUserEmail = () => {
    if (!user) return "Loading...";
    return user.email || "No email";
  };

  // Mobile menu toggle button
  const MobileMenuButton = () => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg"
      style={{
        background: dashboardTheme.colors.cardBg,
        border: `1px solid ${dashboardTheme.colors.cardBorder}`,
        boxShadow: dashboardTheme.colors.cardShadow,
        color: dashboardTheme.colors.textPrimary,
      }}
      aria-label="Toggle menu"
    >
      <AnimatePresence mode="wait">
        {isMobileMenuOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X size={20} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );

  // Mobile backdrop
  const MobileBackdrop = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </AnimatePresence>
  );

  // Sidebar content
  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between relative z-10">
      {/* Logo Section */}
      <div>
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <div className="relative">
            <Image
              src="/penumbra_penned.png"
              alt="Penumbra Penned"
              width={isMobile ? 40 : 54}
              height={isMobile ? 40 : 54}
              style={{
                borderRadius: dashboardTheme.radius.md,
                boxShadow: dashboardTheme.colors.cardShadow,
              }}
            />
          </div>
          <h2
            className={`font-bold ${isMobile ? "text-lg" : "text-xl"}`}
            style={{
              fontFamily: dashboardTheme.fonts.heading,
              color: dashboardTheme.colors.textPrimary,
              background: `linear-gradient(135deg, ${dashboardTheme.colors.textPrimary} 0%, ${dashboardTheme.colors.accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Penumbra Penned
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {menu.map(({ label, href, icon: IconComponent }) => {
            const isActive = pathname === href;
            return (
              <div
                key={href}
                onMouseEnter={() => setHoveredItem(href)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative"
              >
                <Link
                  href={href}
                  className="group relative flex items-center gap-3 px-3 py-2.5 md:px-4 md:py-3 rounded-md overflow-hidden"
                  style={{
                    fontFamily: dashboardTheme.fonts.body,
                    color: isActive
                      ? dashboardTheme.colors.activeText
                      : dashboardTheme.colors.textSecondary,
                    fontWeight: isActive ? 600 : 500,
                    background: isActive
                      ? `linear-gradient(135deg, ${dashboardTheme.colors.accent} 0%, ${dashboardTheme.colors.accentLight} 100%)`
                      : hoveredItem === href
                      ? dashboardTheme.colors.hover
                      : "transparent",
                  }}
                >
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <IconComponent
                      size={18}
                      style={{
                        color: isActive
                          ? dashboardTheme.colors.activeText
                          : dashboardTheme.colors.textSecondary,
                      }}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`relative z-10 ${
                      isMobile ? "text-sm" : "text-sm"
                    }`}
                    style={{
                      color: isActive
                        ? dashboardTheme.colors.activeText
                        : dashboardTheme.colors.textSecondary,
                    }}
                  >
                    {label}
                  </span>

                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="w-2 h-2 rounded-full ml-auto relative z-10 flex-shrink-0"
                      style={{
                        background: dashboardTheme.colors.activeText,
                      }}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Profile Section */}
      <div className="mt-6">
        <div
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{
            background: dashboardTheme.colors.cardBg,
            border: `1px solid ${dashboardTheme.colors.cardBorder}`,
            boxShadow: dashboardTheme.colors.cardShadow,
          }}
        >
          {loading ? (
            <>
              {/* Loading skeleton */}
              <div
                className="flex items-center justify-center flex-shrink-0 animate-pulse"
                style={{
                  width: isMobile ? "36px" : "40px",
                  height: isMobile ? "36px" : "40px",
                  borderRadius: dashboardTheme.radius.full,
                  background: dashboardTheme.colors.cardBorder,
                }}
              />
              <div className="min-w-0 flex-1 space-y-2">
                <div
                  className="h-4 rounded animate-pulse"
                  style={{ background: dashboardTheme.colors.cardBorder }}
                />
                <div
                  className="h-3 rounded animate-pulse w-2/3"
                  style={{ background: dashboardTheme.colors.cardBorder }}
                />
              </div>
            </>
          ) : (
            <>
              <div
                className="flex items-center justify-center font-semibold flex-shrink-0"
                style={{
                  width: isMobile ? "36px" : "40px",
                  height: isMobile ? "36px" : "40px",
                  borderRadius: dashboardTheme.radius.full,
                  background: `linear-gradient(135deg, ${dashboardTheme.colors.accent} 0%, ${dashboardTheme.colors.accentLight} 100%)`,
                  color: dashboardTheme.colors.activeText,
                  fontFamily: dashboardTheme.fonts.heading,
                  fontSize: isMobile ? "14px" : "16px",
                }}
              >
                {getUserInitials()}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`font-medium ${
                    isMobile ? "text-sm" : "text-sm"
                  } truncate`}
                  style={{
                    color: dashboardTheme.colors.textPrimary,
                    fontFamily: dashboardTheme.fonts.body,
                  }}
                >
                  {getDisplayName()}
                </p>
                <p
                  className={`${isMobile ? "text-xs" : "text-xs"} truncate`}
                  style={{
                    color: dashboardTheme.colors.textTertiary,
                    fontFamily: dashboardTheme.fonts.body,
                  }}
                  title={getUserEmail()}
                >
                  {getUserEmail()}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <MobileMenuButton />

      {/* Mobile backdrop */}
      <MobileBackdrop />

      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex min-h-screen w-72 flex-col relative"
        style={{
          background: dashboardTheme.colors.sidebarBg,
          borderRight: `1px solid ${dashboardTheme.colors.sidebarBorder}`,
          boxShadow: dashboardTheme.colors.sidebarShadow,
          padding: dashboardTheme.spacing.xl,
        }}
      >
        {/* Subtle glass morphism overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: dashboardTheme.colors.glassOverlay,
            opacity: 0.3,
          }}
        />

        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
            className="md:hidden fixed top-0 left-0 h-full w-72 max-w-[80vw] z-50 flex flex-col"
            style={{
              background: dashboardTheme.colors.sidebarBg,
              borderRight: `1px solid ${dashboardTheme.colors.sidebarBorder}`,
              boxShadow: dashboardTheme.colors.sidebarShadow,
              padding: "1rem",
            }}
          >
            {/* Subtle glass morphism overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: dashboardTheme.colors.glassOverlay,
                opacity: 0.3,
              }}
            />

            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
