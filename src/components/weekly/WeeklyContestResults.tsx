"use client";

import React, { useState, useEffect } from "react";
import { WeeklyContestEntry, WeeklyContestStats } from "@/api/apiTypes";
import { fetchWeeklyContestEntries } from "@/api/apiService";
import { dashboardTheme } from "@/styles/theme";
import { LoadingSpinner } from "./result/LoadingSpinner";
import { ErrorMessage } from "./result/ErrorMessage";
import { ContestHeader } from "./result/ContestHeader";
import { WinnersSection } from "./result/WinnersSection";
import { AllEntriesSection } from "./result/AllEntriesSection";
import { NoEntriesMessage } from "./result/NoEntriesMessage";

export function getContestStats(
  entries: WeeklyContestEntry[]
): WeeklyContestStats {

  const winners = entries.filter((entry) => entry.is_winner);

  return {
    winners,
    allEntries: entries,
  };
}

const WeeklyContestResults = () => {
  const [contestData, setContestData] = useState<WeeklyContestStats>({
    winners: [],
    allEntries: [],
  });
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContestData = async () => {
      setLoading(true);
      setError(null);

      try {
        const entries = await fetchWeeklyContestEntries();

        console.log({entries})

        const stats = getContestStats(entries);
        setContestData(stats);
      } catch (err) {
        setError("Failed to load contest data");
        console.error("Error loading contest data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadContestData();
  }, []);

  const toggleCardExpansion = (id: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const topFiveIds = new Set(contestData.winners.map((entry) => entry.id));

  const regularEntries = contestData.allEntries.filter(
    (entry) => !topFiveIds.has(entry.id)
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: dashboardTheme.colors.primary }}
    >
      <div className="max-w-7xl mx-auto px-4 max-md:px-5 py-8 max-md:py-6">
        <ContestHeader />

        {contestData.winners.length > 0 && (
          <WinnersSection
            winners={contestData.winners}
            expandedCards={expandedCards}
            onToggleExpansion={toggleCardExpansion}
          />
        )}

        {regularEntries.length > 0 && (
          <AllEntriesSection
            entries={regularEntries}
            expandedCards={expandedCards}
            onToggleExpansion={toggleCardExpansion}
          />
        )}

        {contestData.allEntries.length === 0 && <NoEntriesMessage />}
      </div>
    </div>
  );
};

export default WeeklyContestResults;
