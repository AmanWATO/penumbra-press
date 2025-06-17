// components/WeeklyChallengeHub.tsx
import React from "react";
import { motion } from "framer-motion";
import { WeeklyChallengeHubProps, Theme } from "@/types/weekly-challenge";
import { dashboardTheme } from "@/styles/theme";
import WeeklyChallengeHeader from "./WeeklyChallengeHeader";
import WeeklyChallengeHero from "./WeeklyChallengeHero";
import ThemeCard from "./ThemeCard";
import ContestTimeline from "./ContestTimeline";
import { getCurrentWeek } from "@/utils/Helper";
import { weeklyThemes } from "@/lib/weeklyChallenge";

const WeeklyChallengeHub: React.FC<WeeklyChallengeHubProps> = ({
  onSelectTheme,
  selectedWeek,
}) => {
  const currentWeek = selectedWeek || getCurrentWeek();

  const week1 = weeklyThemes["June 10-16, 2025"];

  return (
    <motion.div
      className="min-h-screen"
      style={{ backgroundColor: dashboardTheme.colors.primary }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <WeeklyChallengeHeader currentWeek={currentWeek} />

      {/* Hero Section */}
      <WeeklyChallengeHero />

      {/* Theme Selection */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid gap-6 sm:gap-8 max-w-7xl mx-auto"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {currentWeek.themes.map((theme: Theme, index: number) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                index={index}
                onSelect={onSelectTheme}
              />
            ))}
           
          </motion.div>
        </div>
      </section>

      {/* Contest Timeline */}
      <ContestTimeline />
    </motion.div>
  );
};

export default WeeklyChallengeHub;
