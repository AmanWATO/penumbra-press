"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";

const guidelines = [
  {
    label: "Word Count:",
    value: "Submissions must be between 1,500 and 5,000 words.",
  },
  {
    label: "Original Content:",
    value:
      "All submissions must be original, unpublished work. Plagiarism will result in immediate disqualification.",
  },
  {
    label: "Theme Adherence:",
    value:
      "Stories must explore the contest theme: 'Let your shadow speak—unveiling the mesmerizing and mysterious visions that only your light can bring to life.'",
  },
  {
    label: "Genre Flexibility:",
    value:
      "We accept Fiction, Poetry, Creative Non-fiction, Epistolary, Flash Fiction, and Short Stories.",
  },
  {
    label: "Language:",
    value: "Submissions must be written in English.",
  },
  {
    label: "Formatting:",
    value:
      "Use standard manuscript format: 12-point Times New Roman font, double-spaced, 1-inch margins.",
  },
  {
    label: "Rights:",
    value:
      "By submitting, you grant Penumbra Penned first publication rights and the right to publish your work in our anthology if selected.",
  },
];

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: dashboardTheme.animation.ease }}
        className="p-8"
      >
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-sm transition-colors duration-200"
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
          className="mb-8"
        >
          <h1
            className="text-3xl font-bold mb-2"
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
            padding: dashboardTheme.spacing.xl,
            marginBottom: dashboardTheme.spacing.xl,
          }}
        >
          <motion.h2
            className="text-xl font-semibold mb-6"
            style={{
              fontFamily: dashboardTheme.fonts.heading,
              color: dashboardTheme.colors.textPrimary,
            }}
          >
            Submission Requirements
          </motion.h2>

          <div className="space-y-6">
            {guidelines.map((guideline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                className="flex gap-4"
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

        {/* Agreement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            backgroundColor: dashboardTheme.colors.cardBg,
            border: `1px solid ${dashboardTheme.colors.cardBorder}`,
            borderRadius: dashboardTheme.radius.xl,
            boxShadow: dashboardTheme.colors.cardShadow,
            padding: dashboardTheme.spacing.xl,
          }}
        >
          <motion.div
            className="flex items-center gap-4 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <button
              onClick={() => setAgreed(!agreed)}
              className="flex items-center justify-center transition-all duration-200"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "6px",
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
                  <CheckCircle
                    size={16}
                    style={{ color: dashboardTheme.colors.activeText }}
                  />
                </motion.div>
              )}
            </button>
            <label
              className="cursor-pointer text-lg"
              style={{
                color: dashboardTheme.colors.textPrimary,
                fontFamily: dashboardTheme.fonts.body,
              }}
              onClick={() => setAgreed(!agreed)}
            >
              I agree to the terms and conditions
            </label>
          </motion.div>

          <motion.div
            whileHover={{ scale: agreed ? 1.02 : 1 }}
            whileTap={{ scale: agreed ? 0.98 : 1 }}
          >
            <Button
              onClick={handleAgree}
              disabled={!agreed}
              className="w-full py-4 text-lg font-semibold transition-all duration-300"
              style={{
                backgroundColor: agreed
                  ? dashboardTheme.colors.accent
                  : dashboardTheme.colors.textMuted,
                color: agreed
                  ? dashboardTheme.colors.activeText
                  : dashboardTheme.colors.textTertiary,
                border: "none",
                borderRadius: dashboardTheme.radius.lg,
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
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
