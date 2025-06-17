"use client";

import WeeklyChallengeForm from "@/components/weekly/WeeklyChallengeForm";
import WeeklyChallengeHub from "@/components/weekly/WeeklyChallengeHub";
import { useState, useEffect } from "react";
import { Theme, WeekData } from "@/types/weekly-challenge";
import { syncFirebaseToStrapi } from "@/utils/Strapi-Migration";
import { getCurrentWeekKey } from "@/utils/Helper";
import { weeklyThemes } from "@/lib/weeklyChallenge";

export default function WeeklyChallengeSystem() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [currentWeek, setCurrentWeek] = useState<WeekData | null>(null);

  const [syncStatus, setSyncStatus] = useState<string>("Syncing...");

  // useEffect(() => {
  //   const performSync = async () => {
  //     try {
  //       const result = await syncFirebaseToStrapi();
  //       if (result.added > 0 || result.skipped > 0) {
  //         setSyncStatus(`✓ Sync complete: ${result.added} new entries added`);
  //       } else {
  //         setSyncStatus("✓ All entries synced");
  //       }

  //       setTimeout(() => setSyncStatus(""), 3000);
  //     } catch (error) {
  //       setSyncStatus("⚠ Sync failed");
  //       setTimeout(() => setSyncStatus(""), 3000);
  //     }
  //   };

  //   performSync();
  // }, []);

  useEffect(() => {
    const weekKey = getCurrentWeekKey();
    if (weekKey && weekKey in weeklyThemes) {
      setCurrentWeek(weeklyThemes[weekKey as keyof typeof weeklyThemes]);
    }
  }, []);

  if (selectedTheme) {
    return (
      <WeeklyChallengeForm
        selectedTheme={selectedTheme}
        onBack={() => setSelectedTheme(null)}
      />
    );
  }

  return (
    <div>
      <WeeklyChallengeHub
        onSelectTheme={setSelectedTheme}
        selectedWeek={currentWeek}
      />
    </div>
  );
}
