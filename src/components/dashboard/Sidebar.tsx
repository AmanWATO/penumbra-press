"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, FileText, Settings } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";

const menu = [
  { label: "My Dashboard", href: "/penumbra-dashboard", icon: LayoutDashboard },
  { label: "About the Contest", href: "/penumbra-dashboard/about", icon: FileText },
  { label: "Account Settings", href: "/penumbra-dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 120, 
        damping: 20,
        delay: 0.1
      }}
      className="min-h-screen w-72 flex flex-col justify-between relative"
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
      
      <div className="relative z-10">
        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-4"
          style={{ marginBottom: dashboardTheme.spacing.xxl }}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative"
          >
            <Image
              src="/penumbra_press_without_text.png"
              alt="Penumbra Penned"
              width={54}
              height={54}
              style={{ 
                borderRadius: dashboardTheme.radius.md,
                boxShadow: dashboardTheme.colors.cardShadow 
              }}
            />
           
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-xl font-bold"
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
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex flex-col"
          style={{ gap: dashboardTheme.spacing.md }}
        >
          {menu.map(({ label, href, icon: IconComponent }, index) => {
            const isActive = pathname === href;
            return (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                onMouseEnter={() => setHoveredItem(href)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative"
              >
                <Link
                  href={href}
                  className="group relative flex items-center gap-3 px-4 py-3 rounded-[6px] transition-all duration-300 overflow-hidden"
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
                        className="absolute inset-0 rounded-[6px]"
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
                        className="absolute inset-0 rounded-[6px] backdrop-blur-sm"
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
                    className="relative z-10"
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
                    className="relative z-10 text-sm"
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
                        className="w-2 h-2 rounded-full ml-auto relative z-10"
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
        transition={{ delay: 1, duration: 0.4 }}
        className="relative z-10"
        style={{ marginTop: dashboardTheme.spacing.xl }}
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
            className="flex items-center justify-center font-semibold"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: dashboardTheme.radius.full,
              background: `linear-gradient(135deg, ${dashboardTheme.colors.accent} 0%, ${dashboardTheme.colors.accentLight} 100%)`,
              color: dashboardTheme.colors.activeText,
              fontFamily: dashboardTheme.fonts.heading,
            }}
          >
            W
          </div>
          <div>
            <p 
              className="font-medium text-sm"
              style={{ 
                color: dashboardTheme.colors.textPrimary,
                fontFamily: dashboardTheme.fonts.body 
              }}
            >
              Writer
            </p>
            <p 
              className="text-xs"
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
    </motion.aside>
  );
}