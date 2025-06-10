'use client'

import WeeklyChallengeForm from "@/components/weekly/WeeklyChallengeForm";
import WeeklyChallengeHub from "@/components/weekly/WeeklyChallengeHub";
import { useState } from "react";
import { Theme } from "@/types/weekly-challenge";

export default function WeeklyChallengeSystem() {
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);

  if (selectedTheme) {
    return (
      <WeeklyChallengeForm
        selectedTheme={selectedTheme}
        onBack={() => setSelectedTheme(null)}
      />
    );
  }

  return (
    <WeeklyChallengeHub onSelectTheme={setSelectedTheme} selectedWeek={null} />
  );
}
