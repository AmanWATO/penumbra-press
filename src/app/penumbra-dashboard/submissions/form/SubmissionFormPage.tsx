"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { ArrowLeft, Upload, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface SubmissionData {
  title: string;
  content: string;
  genre: string;
  plan: string;
}

const genres = [
  "Poetry",
  "Fiction",
  "Epistolary",
  "Creative Non-fiction",
  "Flash Fiction",
  "Short Stories",
];

export default function SubmissionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get("plan") || "";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (wordCount < 1500 || wordCount > 5000) {
      alert("Word count must be between 1,500 and 5,000 words.");
      return;
    }

    setIsSubmitting(true);

    const submissionData: SubmissionData = {
      title,
      content,
      genre,
      plan: selectedPlan,
    };

    console.log(submissionData);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/penumbra-dashboard/submissions/success");
    }, 2000);
  };

  const isWordCountValid = wordCount >= 1500 && wordCount <= 5000;
  const isFormValid = isWordCountValid && title && genre && !isSubmitting;

  // Shared input styles
  const inputStyles = {
    backgroundColor: dashboardTheme.colors.cardBg,
    borderColor: dashboardTheme.colors.border,
    color: dashboardTheme.colors.textPrimary,
    fontFamily: dashboardTheme.fonts.body,
  };

  const focusStyles = {
    borderColor: dashboardTheme.colors.accent,
    boxShadow: `0 0 0 3px ${dashboardTheme.colors.accent}20`,
  };

  const getTextareaStyles = () => ({
    ...inputStyles,
    borderColor: isWordCountValid
      ? dashboardTheme.colors.success
      : wordCount > 5000
      ? dashboardTheme.colors.error
      : dashboardTheme.colors.border,
    lineHeight: "1.6",
  });

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: dashboardTheme.animation.ease }}
        className="px-4 sm:px-6 lg:px-4"
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
          Back to Pricing
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
            style={{
              fontFamily: dashboardTheme.fonts.heading,
              color: dashboardTheme.colors.textPrimary,
            }}
          >
            Submit Your Entry
          </h1>
          <p
            className="text-sm sm:text-base mb-3"
            style={{
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body,
            }}
          >
            Share your literary masterpiece with the world
          </p>
          {selectedPlan && (
            <div
              className="inline-block px-3 py-1 rounded-full text-sm"
              style={{
                backgroundColor: `${dashboardTheme.colors.accent}20`,
                color: dashboardTheme.colors.accent,
                fontFamily: dashboardTheme.fonts.body,
              }}
            >
              {selectedPlan
                .replace("-", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
              Plan Selected
            </div>
          )}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-4xl mx-auto"
          style={{
            backgroundColor: dashboardTheme.colors.cardBg,
            border: `1px solid ${dashboardTheme.colors.cardBorder}`,
            borderRadius: dashboardTheme.radius.xl,
            boxShadow: dashboardTheme.colors.cardShadow,
            padding: `${dashboardTheme.spacing.lg} ${dashboardTheme.spacing.md}`,
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <label
                className="block text-sm font-semibold mb-2"
                style={{
                  color: dashboardTheme.colors.textPrimary,
                  fontFamily: dashboardTheme.fonts.body,
                }}
              >
                Title *
              </label>
              <input
                type="text"
                placeholder="Enter your story title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 sm:p-4 rounded-lg border transition-all duration-200 focus:outline-none"
                style={inputStyles}
                onFocus={(e) => {
                  Object.assign(e.currentTarget.style, focusStyles);
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = dashboardTheme.colors.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </motion.div>

            {/* Genre Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <label
                className="block text-sm font-semibold mb-2"
                style={{
                  color: dashboardTheme.colors.textPrimary,
                  fontFamily: dashboardTheme.fonts.body,
                }}
              >
                Genre *
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
                className="w-full p-3 sm:p-4 rounded-lg border transition-all duration-200 focus:outline-none"
                style={inputStyles}
                onFocus={(e) => {
                  Object.assign(e.currentTarget.style, focusStyles);
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = dashboardTheme.colors.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <option value="">Select a genre...</option>
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </motion.div>

            {/* Content Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <label
                className="block text-sm font-semibold mb-2"
                style={{
                  color: dashboardTheme.colors.textPrimary,
                  fontFamily: dashboardTheme.fonts.body,
                }}
              >
                Your Story *
                <span
                  className="ml-2 text-xs"
                  style={{
                    color: isWordCountValid
                      ? dashboardTheme.colors.success
                      : wordCount > 5000
                      ? dashboardTheme.colors.error
                      : dashboardTheme.colors.textSecondary,
                  }}
                >
                  ({wordCount.toLocaleString()} words | 1,500 - 5,000 required)
                </span>
              </label>
              <textarea
                placeholder="Share your literary masterpiece here... Let your shadow speak and unveil the mesmerizing visions that only your light can bring to life."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full h-64 sm:h-80 lg:h-96 p-3 sm:p-4 rounded-lg border transition-all duration-200 focus:outline-none resize-vertical"
                style={getTextareaStyles()}
                onFocus={(e) => {
                  Object.assign(e.currentTarget.style, focusStyles);
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = isWordCountValid
                    ? dashboardTheme.colors.success
                    : wordCount > 5000
                    ? dashboardTheme.colors.error
                    : dashboardTheme.colors.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />

              {!isWordCountValid && content.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mt-2 text-sm"
                  style={{
                    color:
                      wordCount > 5000
                        ? dashboardTheme.colors.error
                        : dashboardTheme.colors.warning,
                    fontFamily: dashboardTheme.fonts.body,
                  }}
                >
                  <AlertCircle size={16} />
                  {wordCount < 1500
                    ? `You need ${
                        1500 - wordCount
                      } more words to meet the minimum requirement.`
                    : `Your submission is ${
                        wordCount - 5000
                      } words over the limit. Please shorten it.`}
                </motion.div>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="pt-4"
            >
              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full py-4 sm:py-6 text-base sm:text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: isFormValid
                    ? dashboardTheme.colors.accent
                    : dashboardTheme.colors.textMuted,
                  color: isFormValid
                    ? dashboardTheme.colors.activeText
                    : dashboardTheme.colors.textTertiary,
                  border: "none",
                  borderRadius: dashboardTheme.radius.md,
                  fontFamily: dashboardTheme.fonts.body,
                  cursor: isFormValid ? "pointer" : "not-allowed",
                }}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Submit Your Entry
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}