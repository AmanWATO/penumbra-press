"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import {
  User,
  Mail,
  Calendar,
  Settings,
  Loader,
  CreditCard,
  PenTool,
  ArrowRight,
} from "lucide-react";
import useAuthState from "@/hooks/useAuthState";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { user, loading } = useAuthState();
  const router = useRouter();

  const formatMemberSince = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case "EARLY_BIRD":
        return "Early Bird";
      case "PENUMBRA_PRISM":
        return "Penumbra Prism";
      case "STANDARD":
        return "Standard";
      default:
        return plan;
    }
  };

  const handleCTAClick = () => {
    router.push("/penumbra-dashboard/submissions/guidelines");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader
            size={48}
            className="animate-spin"
            style={{ color: dashboardTheme.colors.accent }}
          />
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <User
              size={48}
              style={{
                color: dashboardTheme.colors.textSecondary,
                margin: "0 auto 16px",
              }}
            />
            <h2
              className="text-lg font-semibold mb-2"
              style={{
                fontFamily: dashboardTheme.fonts.heading,
                color: dashboardTheme.colors.textPrimary,
              }}
            >
              Account Not Found
            </h2>
            <p
              style={{
                color: dashboardTheme.colors.textSecondary,
                fontFamily: dashboardTheme.fonts.body,
              }}
            >
              Unable to load account information. Please try logging in again.
            </p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-md:gap-4 px-4 sm:px-6 lg:px-8 w-full">
        {/* Left: Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: dashboardTheme.animation.ease }}
          className="lg:col-span-2"
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
            className="p-6 max-md:p-5 mb-6"
            style={{
              backgroundColor: dashboardTheme.colors.cardBg,
              border: `1px solid ${dashboardTheme.colors.cardBorder}`,
              borderRadius: dashboardTheme.radius.lg,
              boxShadow: dashboardTheme.colors.cardShadow,
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
              {/* Username */}
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
                    {user.username}
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

              {/* Email */}
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
                    {user.email}
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

              {/* Member Since */}
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
                    {user.createdAt
                      ? formatMemberSince(user.createdAt)
                      : "Unknown"}
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

              {/* Writing Slots */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${dashboardTheme.colors.accent}20`,
                  }}
                >
                  <PenTool
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
                    {user.writingSlots === 0 ? "Zero" : user.writingSlots}
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      color: dashboardTheme.colors.textSecondary,
                      fontFamily: dashboardTheme.fonts.body,
                    }}
                  >
                    Writing Slots Available
                  </p>
                </div>
              </div>

              {/* Purchase Plan */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${dashboardTheme.colors.accent}20`,
                  }}
                >
                  <CreditCard
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
                    {user.Purchase && user.Purchase.length > 0
                      ? getPlanDisplayName(user.Purchase[0].plan)
                      : "No Active Plan"}
                  </p>
                  <p
                    className="text-sm"
                    style={{
                      color: dashboardTheme.colors.textSecondary,
                      fontFamily: dashboardTheme.fonts.body,
                    }}
                  >
                    Subscription Plan
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
