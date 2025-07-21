"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { penumbraRule } from "@/lib/dashboardData";

export default function GuidelinesPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleAgree = () => {
    if (agreed) {
      router.push("/penumbra-dashboard/submissions/pricing");
    }
  };

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-6 px-4 sm:px-6 lg:px-8 ">
        {/* LEFT Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: dashboardTheme.animation.ease }}
          className="order-1"
        >
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 max-md:mb-4 text-sm transition-colors duration-200"
            style={{
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = dashboardTheme.colors.accent;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = dashboardTheme.colors.textSecondary;
            }}
          >
            <ArrowLeft size={16} />
            Back to Submissions
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-5"
          >
            <h1
              className="text-3xl font-bold mb-2 max-md:mb-1"
              style={{
                fontFamily: dashboardTheme.fonts.heading,
                color: dashboardTheme.colors.textPrimary,
              }}
            >
              Contest Guidelines
            </h1>
            <p
              style={{
                color: dashboardTheme.colors.textSecondary,
                fontFamily: dashboardTheme.fonts.body,
              }}
            >
              Please review the submission guidelines before proceeding
            </p>
          </motion.div>

          {/* Guidelines Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              backgroundColor: dashboardTheme.colors.cardBg,
              border: `1px solid ${dashboardTheme.colors.cardBorder}`,
              borderRadius: dashboardTheme.radius.xl,
              boxShadow: dashboardTheme.colors.cardShadow,
            }}
            className="px-4 py-4 sm:py-6 sm:px-6"
          >
            <motion.h2
              className="text-xl font-semibold mb-6 max-md:mb-4"
              style={{
                fontFamily: dashboardTheme.fonts.heading,
                color: dashboardTheme.colors.textPrimary,
              }}
            >
              Submission Requirements
            </motion.h2>

            <div className="space-y-6 max-md:space-y-4">
              {penumbraRule.map((guideline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  className="flex gap-3 max-md:gap-2"
                >
                  <div
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: dashboardTheme.colors.accent }}
                  />
                  <div>
                    <span
                      className="font-semibold"
                      style={{
                        color: dashboardTheme.colors.textPrimary,
                        fontFamily: dashboardTheme.fonts.body,
                      }}
                    >
                      {guideline.label}
                    </span>
                    <span
                      className="ml-2"
                      style={{
                        color: dashboardTheme.colors.textSecondary,
                        fontFamily: dashboardTheme.fonts.body,
                      }}
                    >
                      {guideline.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="order-2 w-full"
        >
          <div
            className="rounded-lg border shadow p-5 max-md:p-4 max-md:pb-6"
            style={{
              backgroundColor: dashboardTheme.colors.cardBg,
              border: `1px solid ${dashboardTheme.colors.cardBorder}`,
              boxShadow: dashboardTheme.colors.cardShadow,
            }}
          >
            {/* Agreement Checkbox */}
            <div
              className="flex items-center gap-3 max-md:mb-5 mb-6 cursor-pointer"
              onClick={() => setAgreed(!agreed)}
            >
              <div
                className="w-6 h-6 rounded-sm flex items-center justify-center transition-all duration-200"
                style={{
                  border: `2px solid ${
                    agreed
                      ? dashboardTheme.colors.accent
                      : dashboardTheme.colors.border
                  }`,
                  backgroundColor: agreed
                    ? dashboardTheme.colors.accent
                    : "transparent",
                }}
              >
                {agreed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Check
                      size={16}
                      strokeWidth={3}
                      style={{ color: dashboardTheme.colors.activeText }}
                    />
                  </motion.div>
                )}
              </div>
              <label
                className="text-base sm:text-lg"
                style={{
                  color: dashboardTheme.colors.textPrimary,
                  fontFamily: dashboardTheme.fonts.body,
                }}
              >
                I agree to the terms and conditions
              </label>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: agreed ? 1.02 : 1 }}
              whileTap={{ scale: agreed ? 0.98 : 1 }}
            >
              <Button
                onClick={handleAgree}
                disabled={!agreed}
                className="w-full sm:w-auto px-5 py-3 text-base font-semibold transition-all duration-300"
                style={{
                  backgroundColor: agreed
                    ? dashboardTheme.colors.accent
                    : dashboardTheme.colors.textMuted,
                  color: agreed
                    ? dashboardTheme.colors.activeText
                    : dashboardTheme.colors.textTertiary,
                  border: "none",
                  borderRadius: dashboardTheme.radius.md,
                  fontFamily: dashboardTheme.fonts.body,
                  cursor: agreed ? "pointer" : "not-allowed",
                  boxShadow: agreed
                    ? dashboardTheme.components.button.primary.shadow
                    : "none",
                }}
              >
                Continue to Pricing
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
