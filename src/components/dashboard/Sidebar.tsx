"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FileText, User, Menu, X } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";

const menu = [
  { label: "Your Submissions", href: "/penumbra-dashboard/submissions", icon: FileText },
  { label: "My Account", href: "/penumbra-dashboard/account", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex items-center gap-3 mb-6 md:mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
          >
            <Image
              src="/penumbra_press_without_text.png"
              alt="Penumbra Penned"
              width={isMobile ? 40 : 54}
              height={isMobile ? 40 : 54}
              style={{ 
                borderRadius: dashboardTheme.radius.md,
                boxShadow: dashboardTheme.colors.cardShadow 
              }}
            />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className={`font-bold ${isMobile ? 'text-lg' : 'text-xl'}`}
            style={{ 
              fontFamily: dashboardTheme.fonts.heading,
              color: dashboardTheme.colors.textPrimary,
              background: `linear-gradient(135deg, ${dashboardTheme.colors.textPrimary} 0%, ${dashboardTheme.colors.accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Penumbra Penned
          </motion.h2>
        </motion.div>

        {/* Navigation */}
        <motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="flex flex-col gap-2"
        >
          {menu.map(({ label, href, icon: IconComponent }, index) => {
            const isActive = pathname === href;
            return (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                onMouseEnter={() => setHoveredItem(href)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative"
              >
                <Link
                  href={href}
                  className="group relative flex items-center gap-3 px-3 py-2.5 md:px-4 md:py-3 rounded-lg transition-all duration-300 overflow-hidden"
                  style={{ 
                    fontFamily: dashboardTheme.fonts.body,
                    color: isActive 
                      ? dashboardTheme.colors.activeText 
                      : dashboardTheme.colors.textSecondary,
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeBackground"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="absolute inset-0 rounded-lg"
                        style={{ 
                          background: `linear-gradient(135deg, ${dashboardTheme.colors.accent} 0%, ${dashboardTheme.colors.accentLight} 100%)`,
                          boxShadow: dashboardTheme.components.navigation.active.shadow
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {hoveredItem === href && !isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 rounded-lg backdrop-blur-sm"
                        style={{ 
                          background: dashboardTheme.colors.hover 
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="relative z-10 flex-shrink-0"
                  >
                    <IconComponent 
                      size={18} 
                      style={{ 
                        color: isActive 
                          ? dashboardTheme.colors.activeText 
                          : dashboardTheme.colors.textSecondary 
                      }} 
                    />
                  </motion.div>

                  {/* Label */}
                  <span 
                    className={`relative z-10 ${isMobile ? 'text-sm' : 'text-sm'}`}
                    style={{ 
                      color: isActive 
                        ? dashboardTheme.colors.activeText 
                        : dashboardTheme.colors.textSecondary 
                    }}
                  >
                    {label}
                  </span>

                  {/* Active indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                        className="w-2 h-2 rounded-full ml-auto relative z-10 flex-shrink-0"
                        style={{ 
                          background: dashboardTheme.colors.activeText 
                        }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>
      </div>

      {/* Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="mt-6"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="flex items-center gap-3 p-3 rounded-lg"
          style={{
            background: dashboardTheme.colors.cardBg,
            border: `1px solid ${dashboardTheme.colors.cardBorder}`,
            boxShadow: dashboardTheme.colors.cardShadow,
          }}
        >
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
            W
          </div>
          <div className="min-w-0 flex-1">
            <p 
              className={`font-medium ${isMobile ? 'text-sm' : 'text-sm'} truncate`}
              style={{ 
                color: dashboardTheme.colors.textPrimary,
                fontFamily: dashboardTheme.fonts.body 
              }}
            >
              Writer
            </p>
            <p 
              className={`${isMobile ? 'text-xs' : 'text-xs'} truncate`}
              style={{ 
                color: dashboardTheme.colors.textTertiary,
                fontFamily: dashboardTheme.fonts.body 
              }}
            >
              Active Participant
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <>
      {/* Mobile menu button */}
      <MobileMenuButton />
      
      {/* Mobile backdrop */}
      <MobileBackdrop />

      {/* Desktop sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 120, 
          damping: 20,
          delay: 0.1
        }}
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
          style={{ background: dashboardTheme.colors.glassOverlay, opacity: 0.3 }}
        />
        
        <SidebarContent />
      </motion.aside>

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
              duration: 0.3
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
              style={{ background: dashboardTheme.colors.glassOverlay, opacity: 0.3 }}
            />
            
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}