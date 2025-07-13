"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { User, Mail, Calendar, Settings } from "lucide-react";

export default function AccountPage() {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: dashboardTheme.animation.ease }}
        className="p-8"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-8"
        >
          <h1
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: dashboardTheme.fonts.heading,
              color: dashboardTheme.colors.textPrimary,
            }}
          >
            My Account
          </h1>
          <p
            style={{
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body,
            }}
          >
            Manage your account settings and preferences
          </p>
        </motion.div>

        {/* Account Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{
            backgroundColor: dashboardTheme.colors.cardBg,
            border: `1px solid ${dashboardTheme.colors.cardBorder}`,
            borderRadius: dashboardTheme.radius.xl,
            boxShadow: dashboardTheme.colors.cardShadow,
            padding: dashboardTheme.spacing.xl,
            marginBottom: dashboardTheme.spacing.xl,
          }}
        >
          <h2
            className="text-xl font-semibold mb-6"
            style={{
              fontFamily: dashboardTheme.fonts.heading,
              color: dashboardTheme.colors.textPrimary,
            }}
          >
            Account Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${dashboardTheme.colors.accent} 0%, ${dashboardTheme.colors.accentLight} 100%)`,
                }}
              >
                <User
                  size={20}
                  style={{ color: dashboardTheme.colors.activeText }}
                />
              </div>
              <div>
                <p
                  className="font-semibold"
                  style={{
                    color: dashboardTheme.colors.textPrimary,
                    fontFamily: dashboardTheme.fonts.body,
                  }}
                >
                  Writer
                </p>
                <p
                  className="text-sm"
                  style={{
                    color: dashboardTheme.colors.textSecondary,
                    fontFamily: dashboardTheme.fonts.body,
                  }}
                >
                  Contest Participant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${dashboardTheme.colors.accent}20`,
                }}
              >
                <Mail
                  size={20}
                  style={{ color: dashboardTheme.colors.accent }}
                />
              </div>
              <div>
                <p
                  className="font-semibold"
                  style={{
                    color: dashboardTheme.colors.textPrimary,
                    fontFamily: dashboardTheme.fonts.body,
                  }}
                >
                  writer@example.com
                </p>
                <p
                  className="text-sm"
                  style={{
                    color: dashboardTheme.colors.textSecondary,
                    fontFamily: dashboardTheme.fonts.body,
                  }}
                >
                  Email Address
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${dashboardTheme.colors.accent}20`,
                }}
              >
                <Calendar
                  size={20}
                  style={{ color: dashboardTheme.colors.accent }}
                />
              </div>
              <div>
                <p
                  className="font-semibold"
                  style={{
                    color: dashboardTheme.colors.textPrimary,
                    fontFamily: dashboardTheme.fonts.body,
                  }}
                >
                  December 2024
                </p>
                <p
                  className="text-sm"
                  style={{
                    color: dashboardTheme.colors.textSecondary,
                    fontFamily: dashboardTheme.fonts.body,
                  }}
                >
                  Member Since
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            backgroundColor: dashboardTheme.colors.cardBg,
            border: `1px solid ${dashboardTheme.colors.cardBorder}`,
            borderRadius: dashboardTheme.radius.xl,
            boxShadow: dashboardTheme.colors.cardShadow,
            padding: dashboardTheme.spacing.xl,
          }}
        >
          <div className="text-center">
            <Settings
              size={48}
              style={{
                color: dashboardTheme.colors.accent,
                margin: "0 auto 16px",
              }}
            />
            <h3
              className="text-lg font-semibold mb-2"
              style={{
                fontFamily: dashboardTheme.fonts.heading,
                color: dashboardTheme.colors.textPrimary,
              }}
            >
              More Settings Coming Soon
            </h3>
            <p
              style={{
                color: dashboardTheme.colors.textSecondary,
                fontFamily: dashboardTheme.fonts.body,
              }}
            >
              Additional account management features will be available soon.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
