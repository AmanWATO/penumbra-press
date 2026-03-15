"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, CheckCircle2, AlertCircle, Database } from "lucide-react";
import { colors, fonts } from "@/styles/theme";
import { weeklyContestDB } from "@/lib/firebase";

const createWeeklyContestEntry = async (entry: {
  title: string;
  author_name: string;
  author_email: string;
  city: string;
  theme: string;
  genre: string;
  content: string;
  judge_notes?: string;
  spotlight_rank: "FIRST" | "SECOND" | "THIRD" | "FOURTH" | "FIFTH" | "NONE" | null;
  is_winner: boolean;
  weekNumber: "FIRST" | "SECOND" | "THIRD";
}): Promise<{ success: boolean; data?: unknown; error?: string }> => {
  try {
    const res = await fetch("https://cms.penumbrapenned.com/api/weekly-contests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: entry }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        errorText || `Failed to create weekly contest entry: ${res.statusText}`
      );
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("[createWeeklyContestEntry] Error:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create weekly contest entry",
    };
  }
};

export default function WeeklyContestMigrationCard() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationMessage, setMigrationMessage] = useState<string | null>(null);
  const [migrationError, setMigrationError] = useState<string | null>(null);

  const handleWeekOneMigration = async () => {
    setIsMigrating(true);
    setMigrationMessage(null);
    setMigrationError(null);

    try {
      const result = await weeklyContestDB.getEntriesByWeek("week-3");

      if (result.error) {
        throw new Error("Failed to fetch week 1 entries from Firestore");
      }

      if (!result.entries.length) {
        setMigrationMessage("No week 1 entries found in Firestore.");
        return;
      }

      const responses = await Promise.all(
        result.entries.map((entry) =>
          createWeeklyContestEntry({
            title: entry.userStoryTitle,
            author_name: entry.userName,
            author_email: entry.userEmail,
            city: entry.userCity || "",
            theme: entry.themeTitle,
            genre: entry.userStoryGenre,
            content: entry.userStoryContent,
            judge_notes: "",
            spotlight_rank: "NONE",
            is_winner: false,
            weekNumber: "THIRD",
          })
        )
      );

      const failedResponses = responses.filter((response) => !response.success);

      if (failedResponses.length > 0) {
        throw new Error(
          `Imported ${responses.length - failedResponses.length} of ${responses.length} entries. ${failedResponses[0]?.error || "Some entries failed."}`
        );
      }

      setMigrationMessage(
        `Successfully posted ${responses.length} week 1 entr${responses.length === 1 ? "y" : "ies"} to the weekly-contests API.`
      );
    } catch (error) {
      console.error("Week 1 migration error:", error);
      setMigrationError(
        error instanceof Error
          ? error.message
          : "Failed to post week 1 entries to the weekly-contests API."
      );
    } finally {
      setIsMigrating(false);
    }
  };

  return (
    <section
      className="py-10 md:py-14"
      style={{ backgroundColor: colors.softEggshell }}
    >
      <div className="container mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto rounded-3xl border shadow-lg p-6 md:p-8"
          style={{
            backgroundColor: colors.cream,
            borderColor: colors.parchment,
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4"
                style={{ backgroundColor: colors.parchment, color: colors.darkSepia }}>
                <Database className="w-4 h-4" />
                <span style={{ fontFamily: fonts.button }} className="text-xs md:text-sm">
                  Temporary Internal Tool
                </span>
              </div>

              <h2
                className="text-2xl md:text-3xl font-bold mb-3"
                style={{ color: colors.penumbraBlack, fontFamily: fonts.heading }}
              >
                Week 1 Firestore → Weekly Contest API
              </h2>

              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: colors.darkSepia, fontFamily: fonts.body }}
              >
                This temporary action posts all week 1 Firestore entries into the
                weekly-contests API with type set to weekly-contest, judge notes empty,
                and spotlight rank set to NONE.
              </p>
            </div>

            <button
              type="button"
              onClick={handleWeekOneMigration}
              disabled={isMigrating}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white shadow-lg transition-all disabled:opacity-70 min-w-[220px]"
              style={{
                background: `linear-gradient(to right, ${colors.purple}, ${colors.nightBlue})`,
                fontFamily: fonts.button,
              }}
            >
              {isMigrating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Posting Entries...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Post Week 1 Data
                </>
              )}
            </button>
          </div>

          {migrationMessage && (
            <div
              className="mt-5 flex items-start gap-2 text-sm md:text-base"
              style={{ color: "#166534", fontFamily: fonts.body }}
            >
              <CheckCircle2 className="w-4 h-4 mt-0.5" />
              <span>{migrationMessage}</span>
            </div>
          )}

          {migrationError && (
            <div
              className="mt-5 flex items-start gap-2 text-sm md:text-base"
              style={{ color: "#b91c1c", fontFamily: fonts.body }}
            >
              <AlertCircle className="w-4 h-4 mt-0.5" />
              <span>{migrationError}</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}