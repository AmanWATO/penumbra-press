"use client";

import WeeklyChallengeForm from "@/components/weekly/WeeklyChallengeForm";
import WeeklyChallengeHub from "@/components/weekly/WeeklyChallengeHub";
import { useState, useEffect } from "react";
import { Theme, WeekData } from "@/types/weekly-challenge";
import { getCurrentWeekKey } from "@/utils/Helper";
import { weeklyThemes } from "@/lib/weeklyChallenge";
import WeeklyContestResults from "@/components/weekly/WeeklyContestResults";

export default function WeeklyChallengeSystem() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [currentWeek, setCurrentWeek] = useState<WeekData | null>(null);

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
      {/* <WeeklyChallengeHub
        onSelectTheme={setSelectedTheme}
        selectedWeek={currentWeek}
      /> */}
      <WeeklyContestResults/>
    </div>
  );
}
