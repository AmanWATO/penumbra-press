"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import {
  ArrowLeft,
  Upload,
  AlertCircle,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import useAuthState from "@/hooks/useAuthState";
import { createSubmission } from "@/api/backendService";
import * as Select from "@radix-ui/react-select";

interface SubmissionData {
  title: string;
  content: string;
  genre: string;
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

  const { user } = useAuthState();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (
      user &&
      (typeof user.writingSlots !== "number" || user.writingSlots < 1)
    ) {
      router.push("/penumbra-dashboard");
    }
  }, [user, router]);

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
    setSubmitError(null);

    if (wordCount < 1500 || wordCount > 5000) {
      setSubmitError("Word count must be between 1,500 and 5,000 words.");
      return;
    }

    if (!title.trim() || !content.trim() || !genre) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    const submissionData: SubmissionData = {
      title: title.trim(),
      content: content.trim(),
      genre,
    };

    try {
      const result = await createSubmission(submissionData);

      if (result.error) {
        setSubmitError(result.error);
      } else if (result.submission) {
        setSubmitSuccess(true);
        setTimeout(() => {
          router.push("/penumbra-dashboard/submissions/appreciation");
        }, 2000);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isWordCountValid = wordCount >= 1500 && wordCount <= 5000;
  const isFormValid =
    isWordCountValid && title.trim() && genre && !isSubmitting;

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

  if (submitSuccess) {
    return (
      <DashboardLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center min-h-[400px]"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-4"
            >
              <CheckCircle
                size={64}
                style={{
                  color: dashboardTheme.colors.success,
                  margin: "0 auto",
                }}
              />
            </motion.div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{
                color: dashboardTheme.colors.textPrimary,
                fontFamily: dashboardTheme.fonts.heading,
              }}
            >
              Submission Successful!
            </h2>
            <p
              style={{
                color: dashboardTheme.colors.textSecondary,
                fontFamily: dashboardTheme.fonts.body,
              }}
            >
              Your submission has been received and is being processed.
            </p>
          </div>
        </motion.div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: dashboardTheme.animation.ease }}
        className="px-4 sm:px-6 lg:px-4"
      >
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

        {/* Error Message */}
        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg border flex items-center gap-2"
            style={{
              backgroundColor: `${dashboardTheme.colors.error}10`,
              borderColor: dashboardTheme.colors.error,
              color: dashboardTheme.colors.error,
            }}
          >
            <AlertCircle size={20} />
            <span>{submitError}</span>
          </motion.div>
        )}

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
                  e.currentTarget.style.borderColor =
                    dashboardTheme.colors.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </motion.div>

            {/* Genre Field with Radix UI Select */}
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
              <Select.Root value={genre} onValueChange={setGenre}>
                <Select.Trigger
                  className="w-full p-3 sm:p-4 rounded-lg border transition-all duration-200 focus:outline-none flex items-center justify-between"
                  style={{
                    ...inputStyles,
                    cursor: "pointer",
                  }}
                >
                  <Select.Value placeholder="Select a genre..." />
                  <Select.Icon>
                    <ChevronDown
                      size={20}
                      style={{ color: dashboardTheme.colors.textSecondary }}
                    />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className="overflow-hidden rounded-md shadow-lg z-50"
                    style={{
                      backgroundColor: dashboardTheme.colors.cardBg,
                      border: `1px solid ${dashboardTheme.colors.border}`,
                      boxShadow: dashboardTheme.colors.cardShadow,
                    }}
                  >
                    <Select.Viewport className="p-1">
                      {genres.map((g) => (
                        <Select.Item
                          key={g}
                          value={g}
                          className="relative flex items-center px-3 py-2 rounded cursor-pointer select-none outline-none transition-colors duration-150"
                          style={{
                            color: dashboardTheme.colors.textPrimary,
                            fontFamily: dashboardTheme.fonts.body,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `${dashboardTheme.colors.accent}20`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }}
                        >
                          <Select.ItemText>{g}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
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
