"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import {
  Plus,
  FileText,
  Crown,
  Sparkles,
  Award,
  Calendar,
  Tag,
  User,
} from "lucide-react";
import useAuthState from "@/hooks/useAuthState";
import { useEffect, useState } from "react";
import { getSubmissions } from "@/api/backendService";

interface Submission {
  id: number;
  title: string;
  content: string;
  genre: string;
  plan: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export default function SubmissionsPage() {
  const router = useRouter();
  const { user, loading } = useAuthState();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(true);
  const [submissionsError, setSubmissionsError] = useState<string | null>(null);
  const [writingSlots, setWritingSlots] = useState(0);

  useEffect(() => {
    if (user) {
      fetchSubmissions();
    }
  }, [user]);

  const fetchSubmissions = async () => {
    try {
      setSubmissionsLoading(true);
      setSubmissionsError(null);

      const result = await getSubmissions();

      if (result.error) {
        setSubmissionsError(result.error);
      } else if (result.data) {
        setSubmissions(result.data.submissions);
        setWritingSlots(result.data.writingSlots);
      }
    } catch (error) {
      setSubmissionsError("Failed to fetch submissions");
      console.error("Error fetching submissions:", error);
    } finally {
      setSubmissionsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  if (loading || submissionsLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-current border-t-transparent rounded-full"
            style={{ color: dashboardTheme.colors.accent }}
          />
        </div>
      </DashboardLayout>
    );
  }

  // If no user, redirect to login
  if (!user) {
    router.push("/auth/login");
    return null;
  }

  const hasPurchase = user.Purchase && user.Purchase.length > 0;
  const userWritingSlots = writingSlots || user.writingSlots || 0;
  const hasSubmissions = submissions.length > 0;

  // Get plan type for display
  const planType = hasPurchase ? user.Purchase[0].plan : null;
  const planDisplayName = planType
    ? planType.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "";

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: dashboardTheme.animation.ease }}
        className="px-4 sm:px-6 lg:px-8 max-md:py-4"
      >
        {/* Header */}

        {submissions.length < 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8 text-center sm:text-left"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  style={{
                    fontFamily: dashboardTheme.fonts.heading,
                    color: dashboardTheme.colors.textPrimary,
                  }}
                >
                  Your Submissions
                </h1>
                <p
                  className="text-base sm:text-lg"
                  style={{
                    color: dashboardTheme.colors.textSecondary,
                    fontFamily: dashboardTheme.fonts.body,
                  }}
                >
                  Manage your contest entries and track their status
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {submissionsError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 p-4 rounded-lg border"
            style={{
              backgroundColor: `${dashboardTheme.colors.error}10`,
              borderColor: `${dashboardTheme.colors.error}30`,
              color: dashboardTheme.colors.error,
            }}
          >
            <p className="text-sm font-medium">
              Error loading submissions: {submissionsError}
            </p>
            <Button
              onClick={fetchSubmissions}
              className="mt-2 text-xs px-3 py-1"
              style={{
                backgroundColor: dashboardTheme.colors.error,
                color: "white",
              }}
            >
              Try Again
            </Button>
          </motion.div>
        )}

        {/* Main Content */}
        {!hasPurchase ? (
          // Unpaid user - show original empty state
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative overflow-hidden text-center px-5 py-5 sm:px-6 lg:px-8 sm:py-6 lg:py-8"
            style={{
              backgroundColor: dashboardTheme.colors.cardBg,
              border: `1px solid ${dashboardTheme.colors.cardBorder}`,
              borderRadius: dashboardTheme.radius.xl,
              boxShadow: dashboardTheme.colors.cardShadow,
            }}
          >
            {/* Background decoration */}
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{
                background: dashboardTheme.colors.subtleGradient,
                opacity: 0.3,
              }}
            />

            {/* Floating icon */}
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                y: [0, -5, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-20"
            >
              <FileText
                size={28}
                className="sm:size-8"
                style={{ color: dashboardTheme.colors.accent }}
              />
            </motion.div>

            <div className="relative z-10">
              {/* Center icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="mb-4 sm:mb-6"
              >
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${dashboardTheme.colors.accent}20 0%, ${dashboardTheme.colors.accentLight}20 100%)`,
                  }}
                >
                  <FileText
                    size={32}
                    className="sm:size-10"
                    style={{ color: dashboardTheme.colors.accent }}
                  />
                </div>
              </motion.div>

              {/* Text */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="text-xl sm:text-2xl font-semibold mb-4"
                style={{
                  fontFamily: dashboardTheme.fonts.heading,
                  color: dashboardTheme.colors.textPrimary,
                }}
              >
                No Submissions Yet
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="text-base sm:text-lg mb-8 px-4 sm:px-8"
                style={{
                  color: dashboardTheme.colors.textSecondary,
                  fontFamily: dashboardTheme.fonts.body,
                  lineHeight: "1.6",
                }}
              >
                Ready to share your literary masterpiece? Start by adding your
                first submission to the Penumbra Writing Contest.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: dashboardTheme.colors.accent,
                    color: dashboardTheme.colors.activeText,
                    border: "none",
                    borderRadius: dashboardTheme.radius.md,
                    fontFamily: dashboardTheme.fonts.body,
                    boxShadow: dashboardTheme.components.button.primary.shadow,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      dashboardTheme.colors.accentDark;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(139, 110, 87, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      dashboardTheme.colors.accent;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      dashboardTheme.components.button.primary.shadow;
                  }}
                  onClick={() =>
                    router.push("/penumbra-dashboard/submissions/guidelines")
                  }
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Plus size={20} />
                    Add Your Submission
                  </span>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          // Paid user UI
          <div className="space-y-6">
            {/* Writing Slots Status Card */}

            {/* Submissions List or Empty State */}
            {!hasSubmissions ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative overflow-hidden px-4 py-4 sm:px-6 sm:py-6"
                  style={{
                    backgroundColor: dashboardTheme.colors.cardBg,
                    border: `1px solid ${dashboardTheme.colors.cardBorder}`,
                    borderRadius: dashboardTheme.radius.xl,
                    boxShadow: dashboardTheme.colors.cardShadow,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${dashboardTheme.colors.accent}20 0%, ${dashboardTheme.colors.accentLight}20 100%)`,
                        }}
                      >
                        <Sparkles
                          size={20}
                          className="sm:size-6"
                          style={{ color: dashboardTheme.colors.accent }}
                        />
                      </div>
                      <div className="min-w-0">
                        <h3
                          className="text-base sm:text-lg font-semibold truncate"
                          style={{
                            color: dashboardTheme.colors.textPrimary,
                            fontFamily: dashboardTheme.fonts.heading,
                          }}
                        >
                          Available Writing Slots
                        </h3>
                        <p
                          className="text-xs sm:text-sm"
                          style={{
                            color: dashboardTheme.colors.textSecondary,
                            fontFamily: dashboardTheme.fonts.body,
                          }}
                        >
                          You can submit {userWritingSlots} more entr
                          {userWritingSlots !== 1 ? "ies" : "y"}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div
                        className="text-xl sm:text-2xl font-bold"
                        style={{
                          color:
                            userWritingSlots > 0
                              ? dashboardTheme.colors.success
                              : dashboardTheme.colors.error,
                          fontFamily: dashboardTheme.fonts.heading,
                        }}
                      >
                        {userWritingSlots}
                      </div>
                      <div
                        className="text-xs uppercase tracking-wider"
                        style={{
                          color: dashboardTheme.colors.textTertiary,
                          fontFamily: dashboardTheme.fonts.body,
                        }}
                      >
                        Remaining
                      </div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="relative overflow-hidden text-center px-4 py-6 sm:px-6 sm:py-8"
                  style={{
                    backgroundColor: dashboardTheme.colors.cardBg,
                    border: `1px solid ${dashboardTheme.colors.cardBorder}`,
                    borderRadius: dashboardTheme.radius.xl,
                    boxShadow: dashboardTheme.colors.cardShadow,
                  }}
                >
                  {/* Floating decoration */}
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                      y: [0, -3, 3, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-15"
                  >
                    <Award
                      size={24}
                      className="sm:size-8"
                      style={{ color: dashboardTheme.colors.accent }}
                    />
                  </motion.div>

                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 0.4,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="mb-4 sm:mb-6"
                    >
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${dashboardTheme.colors.accent}20 0%, ${dashboardTheme.colors.accentLight}20 100%)`,
                        }}
                      >
                        <FileText
                          size={28}
                          className="sm:size-9"
                          style={{ color: dashboardTheme.colors.accent }}
                        />
                      </div>
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4"
                      style={{
                        fontFamily: dashboardTheme.fonts.heading,
                        color: dashboardTheme.colors.textPrimary,
                      }}
                    >
                      Ready to Submit?
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      className="text-base sm:text-lg mb-6 sm:mb-8 px-4 sm:px-8"
                      style={{
                        color: dashboardTheme.colors.textSecondary,
                        fontFamily: dashboardTheme.fonts.body,
                        lineHeight: "1.6",
                      }}
                    >
                      {`You're all set with your ${planDisplayName} plan! 
                    Start crafting your literary masterpiece for the Penumbra Writing Contest.`}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      whileHover={{ scale: userWritingSlots > 0 ? 1.02 : 1 }}
                      whileTap={{ scale: userWritingSlots > 0 ? 0.98 : 1 }}
                    >
                      <Button
                        disabled={userWritingSlots === 0}
                        className="relative overflow-hidden px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300"
                        style={{
                          backgroundColor:
                            userWritingSlots > 0
                              ? dashboardTheme.colors.accent
                              : dashboardTheme.colors.textMuted,
                          color:
                            userWritingSlots > 0
                              ? dashboardTheme.colors.activeText
                              : dashboardTheme.colors.textTertiary,
                          border: "none",
                          borderRadius: dashboardTheme.radius.md,
                          fontFamily: dashboardTheme.fonts.body,
                          cursor:
                            userWritingSlots > 0 ? "pointer" : "not-allowed",
                          boxShadow:
                            userWritingSlots > 0
                              ? dashboardTheme.components.button.primary.shadow
                              : "none",
                        }}
                        onMouseEnter={(e) => {
                          if (userWritingSlots > 0) {
                            e.currentTarget.style.backgroundColor =
                              dashboardTheme.colors.accentDark;
                            e.currentTarget.style.transform =
                              "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                              "0 8px 25px rgba(139, 110, 87, 0.35)";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (userWritingSlots > 0) {
                            e.currentTarget.style.backgroundColor =
                              dashboardTheme.colors.accent;
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              dashboardTheme.components.button.primary.shadow;
                          }
                        }}
                        onClick={() => {
                          if (userWritingSlots > 0) {
                            router.push(
                              `/penumbra-dashboard/submissions/form?plan=${planType?.toLowerCase()}`
                            );
                          }
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <Plus size={18} className="sm:size-5" />
                          <span className="hidden sm:inline">
                            Create New Submission
                          </span>
                          <span className="sm:hidden">New Submission</span>
                        </span>
                      </Button>
                    </motion.div>

                    {userWritingSlots === 0 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.4 }}
                        className="text-xs sm:text-sm mt-4"
                        style={{
                          color: dashboardTheme.colors.textTertiary,
                          fontFamily: dashboardTheme.fonts.body,
                        }}
                      >
                        {`You've used all your available writing slots for this contest.`}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </>
            ) : (
              // Submissions Grid
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2
                    className="text-lg sm:text-xl font-semibold"
                    style={{
                      color: dashboardTheme.colors.textPrimary,
                      fontFamily: dashboardTheme.fonts.heading,
                    }}
                  >
                    Your Submissions ({submissions.length})
                  </h2>

                  {userWritingSlots > 0 && (
                    <Button
                      onClick={() => {
                        router.push(
                          `/penumbra-dashboard/submissions/form?plan=${planType?.toLowerCase()}`
                        );
                      }}
                      className="px-4 py-2 text-sm font-medium transition-all duration-300"
                      style={{
                        backgroundColor: dashboardTheme.colors.accent,
                        color: dashboardTheme.colors.activeText,
                        borderRadius: dashboardTheme.radius.md,
                        boxShadow:
                          dashboardTheme.components.button.primary.shadow,
                      }}
                    >
                      <Plus size={16} className="mr-1" />
                      <span className="hidden sm:inline">Add New</span>
                      <span className="sm:hidden">Add</span>
                    </Button>
                  )}
                </div>

                <div className="grid gap-4 sm:gap-6">
                  {submissions.map((submission, index) => (
                    <motion.div
                      key={submission.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="relative overflow-hidden p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
                      style={{
                        backgroundColor: dashboardTheme.colors.cardBg,
                        border: `1px solid ${dashboardTheme.colors.cardBorder}`,
                        borderRadius: dashboardTheme.radius.xl,
                        boxShadow: dashboardTheme.colors.cardShadow,
                      }}
                      whileHover={{ y: -2 }}
                    >
                      {/* Submission Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                          <h3
                            className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2"
                            style={{
                              color: dashboardTheme.colors.textPrimary,
                              fontFamily: dashboardTheme.fonts.heading,
                            }}
                          >
                            {submission.title}
                          </h3>

                          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                            <div className="flex items-center gap-1">
                              <Tag
                                size={14}
                                style={{ color: dashboardTheme.colors.accent }}
                              />
                              <span
                                className="font-medium"
                                style={{ color: dashboardTheme.colors.accent }}
                              >
                                {submission.genre}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar
                              size={12}
                              style={{
                                color: dashboardTheme.colors.textTertiary,
                              }}
                            />
                            <span
                              style={{
                                color: dashboardTheme.colors.textTertiary,
                                fontFamily: dashboardTheme.fonts.body,
                              }}
                            >
                              {formatDate(submission.createdAt)}
                            </span>
                          </div>

                          {submission.updatedAt !== submission.createdAt && (
                            <span
                              className="text-xs"
                              style={{
                                color: dashboardTheme.colors.textTertiary,
                                fontFamily: dashboardTheme.fonts.body,
                              }}
                            >
                              Updated {formatDate(submission.updatedAt)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Preview */}
                      <div className="mb-4">
                        <p
                          className="text-sm sm:text-base leading-relaxed"
                          style={{
                            color: dashboardTheme.colors.textSecondary,
                            fontFamily: dashboardTheme.fonts.body,
                            lineHeight: "1.6",
                          }}
                        >
                          {truncateContent(submission.content)}
                        </p>
                      </div>

                      {/* Word Count & Status */}
                      <div
                        className="flex items-center justify-between pt-4 border-t"
                        style={{
                          borderColor: dashboardTheme.colors.cardBorder,
                        }}
                      >
                        <div
                          className="text-xs font-medium"
                          style={{
                            color: dashboardTheme.colors.textTertiary,
                            fontFamily: dashboardTheme.fonts.body,
                          }}
                        >
                          {submission.content.split(/\s+/).length} words
                        </div>

                        <div
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            backgroundColor: `${dashboardTheme.colors.success}20`,
                            color: dashboardTheme.colors.success,
                          }}
                        >
                          Submitted
                        </div>
                      </div>

                      {/* Hover Effect Gradient */}
                      <div
                        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none hover:opacity-5"
                        style={{
                          background: `linear-gradient(135deg, ${dashboardTheme.colors.accent} 0%, transparent 100%)`,
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
