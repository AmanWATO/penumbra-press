import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, AlertCircle } from "lucide-react";
import { Theme, FormData } from "@/types/weekly-challenge";
import { dashboardTheme } from "@/styles/theme";
import { SubmissionSuccess } from "../reusable/SubmissionSuccess";
import { PrologueFormField } from "../reusable/PrologueFormField";
import { weeklyContestDB, WeeklyContestEntry } from "@/lib/firebase";

interface WeeklyChallengeFormProps {
  selectedTheme: Theme;
  onBack: () => void;
  currentWeek?: "week-1" | "week-2" | "week-3";
}

const themeToWeekMapping: Record<string, "week-1" | "week-2" | "week-3"> = {
  // Week 1 themes
  "light-that-waited": "week-1",
  "reflections-uninvited": "week-1",
  "the-promise-buried": "week-1",

  // Week 2 themes
  "words-beneath": "week-2",
  "the-lantern-listens": "week-2",
  "the-unwritten-hour": "week-2",

  // Week 3 themes
  "ink-and-ember": "week-3",
  "door-of-breath": "week-3",
  "shadows-unborn": "week-3",
};

const WeeklyChallengeForm: React.FC<WeeklyChallengeFormProps> = ({
  selectedTheme,
  onBack,
  currentWeek = "week-2",
}) => {
  const targetWeek = themeToWeekMapping[selectedTheme.id] || currentWeek;

  const [formData, setFormData] = useState<Partial<FormData>>({
    name: "",
    email: "",
    title: "",
    content: "",
    genre: "",
    city: "",
    theme: selectedTheme.id,
    type: "weekly-challenge",
  });

  const [wordCount, setWordCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [submissionCount, setSubmissionCount] = useState<number>(0);
  const [isLimitReached, setIsLimitReached] = useState(false);
  const [checkingLimit, setCheckingLimit] = useState(false);

  useEffect(() => {
    const checkSubmissionCount = async () => {
      if (formData.email && formData.email.includes("@")) {
        setCheckingLimit(true);
        try {
          const result = await weeklyContestDB.getUserSubmissionCount(
            targetWeek,
            formData.email
          );

          if (!result.error) {
            setSubmissionCount(result.count);
            setIsLimitReached(result.count >= 3);

            if (result.count >= 3) {
              setSubmitError(
                `You have reached the maximum limit of 3 submissions for ${targetWeek
                  .replace("-", " ")
                  .toUpperCase()}.`
              );
            } else {
              setSubmitError("");
            }
          }
        } catch (error) {
          console.error("Error checking submission count:", error);
        }
        setCheckingLimit(false);
      } else {
        setSubmissionCount(0);
        setIsLimitReached(false);
        setSubmitError("");
      }
    };

    const timeoutId = setTimeout(checkSubmissionCount, 500); // Debounce
    return () => clearTimeout(timeoutId);
  }, [formData.email, targetWeek]); // Use targetWeek instead of currentWeek

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "content") {
      const words = value
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      setWordCount(words.length);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    if (!formData.title?.trim()) newErrors.title = "Title is required";
    if (!formData.content?.trim())
      newErrors.content = "Story content is required";
    if (wordCount > 100) newErrors.content = "Story must be 100 words or less";
    if (!formData.genre?.trim()) newErrors.genre = "Genre is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (isLimitReached) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Prepare data for Firebase
      const entryData: Omit<WeeklyContestEntry, "submittedAt" | "weekNumber"> =
        {
          themeTitle: selectedTheme.title,
          themePrompt: selectedTheme.prompt,
          userName: formData.name!,
          userEmail: formData.email!,
          userStoryTitle: formData.title!,
          userStoryContent: formData.content!,
          userStoryGenre: formData.genre!,
          userCity: formData.city || undefined, // Optional field
        };

      // Submit to Firebase using the target week
      const result = await weeklyContestDB.submitEntry(targetWeek, entryData);

      if (result.success) {
        setIsSubmitted(true);
      } else if (result.limitReached) {
        setSubmitError(result.error || "Submission limit reached");
        setIsLimitReached(true);
      } else {
        setSubmitError(
          typeof result.error === "string"
            ? result.error
            : "Failed to submit your entry. Please try again."
        );
        console.error("Submission error:", result.error);
      }
    } catch (error) {
      setSubmitError("An unexpected error occurred. Please try again.");
      console.error("Submission error:", error);
    }

    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return <SubmissionSuccess selectedTheme={selectedTheme} onBack={onBack} />;
  }

  return (
    <motion.div
      className="min-h-screen"
      style={{ backgroundColor: dashboardTheme.colors.primary }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="border-b p-4 sm:p-6"
        style={{
          backgroundColor: dashboardTheme.colors.cardBg,
          borderColor: dashboardTheme.colors.border,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 mb-4 p-2 rounded-lg transition-all duration-300"
            style={{ color: dashboardTheme.colors.accent }}
            whileHover={{
              backgroundColor: dashboardTheme.colors.hover,
              x: -4,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Themes</span>
          </motion.button>

          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${selectedTheme.color} flex items-center justify-center shadow-lg`}
            >
              <span className="text-xl">{selectedTheme.icon}</span>
            </div>
            <div>
              <h1
                className="text-xl sm:text-2xl font-bold"
                style={{
                  color: dashboardTheme.colors.textPrimary,
                  fontFamily: dashboardTheme.fonts.heading,
                }}
              >
                {selectedTheme.title}
              </h1>
              <p
                className="text-sm opacity-80"
                style={{
                  color: dashboardTheme.colors.textSecondary,
                  fontFamily: dashboardTheme.fonts.body,
                }}
              >
                Submit your 100-word story for{" "}
                {targetWeek.replace("-", " ").toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Submission Count Warning */}
          {formData.email && submissionCount > 0 && !checkingLimit && (
            <motion.div
              className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${
                isLimitReached
                  ? "bg-red-50 border-red-200"
                  : "bg-yellow-50 border-yellow-200"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle
                className={`w-5 h-5 ${
                  isLimitReached ? "text-red-500" : "text-yellow-500"
                }`}
              />
              <div>
                <p
                  className={`font-medium ${
                    isLimitReached ? "text-red-800" : "text-yellow-800"
                  }`}
                >
                  {isLimitReached
                    ? "Submission Limit Reached"
                    : `You have ${submissionCount} submission${
                        submissionCount === 1 ? "" : "s"
                      } for ${targetWeek.replace("-", " ").toUpperCase()}`}
                </p>
                <p
                  className={`text-sm ${
                    isLimitReached ? "text-red-600" : "text-yellow-600"
                  }`}
                >
                  {isLimitReached
                    ? `You cannot submit more stories for ${targetWeek
                        .replace("-", " ")
                        .toUpperCase()}. Maximum 3 per week.`
                    : `You can submit ${3 - submissionCount} more stor${
                        3 - submissionCount === 1 ? "y" : "ies"
                      } for ${targetWeek.replace("-", " ").toUpperCase()}.`}
                </p>
              </div>
            </motion.div>
          )}

          {/* Theme Prompt */}
          <motion.div
            className="mb-8 p-6 rounded-xl"
            style={{
              backgroundColor: dashboardTheme.colors.manuscript,
              border: `1px solid ${dashboardTheme.colors.borderLight}`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3
              className="font-bold mb-2"
              style={{
                color: dashboardTheme.colors.textPrimary,
                fontFamily: dashboardTheme.fonts.heading,
              }}
            >
              Your Writing Prompt:
            </h3>
            <p
              className="italic"
              style={{
                color: dashboardTheme.colors.textSecondary,
                fontFamily: dashboardTheme.fonts.body,
              }}
            >
              {`"${selectedTheme.prompt}"`}
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className={`space-y-6 ${
              isLimitReached ? "opacity-60 pointer-events-none" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Personal Info */}
            <div className="grid sm:grid-cols-2 gap-6">
              <PrologueFormField
                label="Full Name"
                name="name"
                type="text"
                value={formData.name || ""}
                onChange={handleInputChange}
                error={errors.name}
                placeholder="Enter your full name"
                required
              />

              <div className="relative">
                <PrologueFormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  error={errors.email}
                  placeholder="Enter your email"
                  required
                />
                {checkingLimit && (
                  <div className="absolute right-3 top-9">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Story Info */}
            <div className="grid sm:grid-cols-2 gap-6">
              <PrologueFormField
                label="Story Title"
                name="title"
                type="text"
                value={formData.title || ""}
                onChange={handleInputChange}
                error={errors.title}
                placeholder="Give your story a title"
                required
              />

              <PrologueFormField
                label="Genre"
                name="genre"
                type="text"
                value={formData.genre || ""}
                onChange={handleInputChange}
                error={errors.genre}
                placeholder="e.g., Science Fiction, Fantasy, Mystery"
                required
              />
            </div>

            {/* City (Optional) */}
            <PrologueFormField
              label="City"
              name="city"
              type="text"
              value={formData.city || ""}
              onChange={handleInputChange}
              error={errors.city}
              placeholder="Your city (optional)"
              required={false}
            />

            {/* Story Content */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  className="block text-sm font-medium"
                  style={{
                    color: dashboardTheme.colors.textPrimary,
                    fontFamily: dashboardTheme.fonts.body,
                  }}
                >
                  Your Story *
                </label>
                <span
                  className={`text-sm font-medium ${
                    wordCount > 100 ? "text-red-500" : ""
                  }`}
                  style={{
                    color:
                      wordCount > 100
                        ? dashboardTheme.colors.error
                        : dashboardTheme.colors.textSecondary,
                  }}
                >
                  {wordCount}/100 words
                </span>
              </div>
              <PrologueFormField
                label=""
                name="content"
                type="textarea"
                value={formData.content || ""}
                onChange={handleInputChange}
                error={errors.content}
                placeholder="Write your 100-word story here..."
                rows={8}
              />
            </div>

            {/* Error Message */}
            {submitError && (
              <motion.div
                className="p-4 rounded-lg bg-red-50 border border-red-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-red-800 font-medium">{submitError}</p>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting || isLimitReached}
              className="w-full py-4 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                backgroundColor: isLimitReached
                  ? dashboardTheme.colors.textSecondary
                  : dashboardTheme.colors.accent,
                color: "white",
                fontFamily: dashboardTheme.colors.accent,
                opacity: isSubmitting || isLimitReached ? 0.7 : 1,
              }}
              whileHover={
                !isSubmitting && !isLimitReached ? { scale: 1.02 } : {}
              }
              whileTap={!isSubmitting && !isLimitReached ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span>Submitting...</span>
                </>
              ) : isLimitReached ? (
                <>
                  <AlertCircle className="w-5 h-5" />
                  <span>Submission Limit Reached</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Entry</span>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
};

export default WeeklyChallengeForm;
