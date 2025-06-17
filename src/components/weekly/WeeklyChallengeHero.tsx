import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PenTool, BookOpen, LucideIcon } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";
import { getWeekNumber } from "@/utils/Helper";
import { weeklyContestDB } from "@/lib/firebase";
import { features, weeklyPerks } from "@/lib/weekly-hero";
import StatCard from "./StatCard";
import FeatureCard from "./FeatureCard";

interface StatsData {
  totalWritingSubmitted: number;
  totalAuthorsJoined: number;
  loading: boolean;
  error: string | null;
}

interface StatConfig {
  icon: LucideIcon;
  value: number;
  label: string;
  loading: boolean;
}

const WeeklyChallengeHero: React.FC = () => {
  const [stats, setStats] = useState<StatsData>({
    totalWritingSubmitted: 0,
    totalAuthorsJoined: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStats((prev) => ({ ...prev, loading: true, error: null }));

        const [entriesResult, authorsResult] = await Promise.all([
          weeklyContestDB.getTotalEntries(),
          weeklyContestDB.getTotalAuthors(),
        ]);

        if (entriesResult.error || authorsResult.error) {
          throw new Error("Failed to fetch statistics");
        }

        setStats({
          totalWritingSubmitted: entriesResult.totalEntries,
          totalAuthorsJoined: authorsResult.totalAuthors,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load statistics",
        }));
      }
    };

    fetchStats();
  }, []);

  const statConfigs: StatConfig[] = [
    {
      icon: PenTool,
      value: stats.totalWritingSubmitted,
      label: "Stories Written",
      loading: stats.loading,
    },
    {
      icon: BookOpen,
      value: stats.totalAuthorsJoined,
      label: "Writers Joined",
      loading: stats.loading,
    },
  ];

  const currentWeekPerks =
    weeklyPerks[(getWeekNumber() || 1) as 1 | 2 | 3] || [];

  return (
    <section className="py-10 sm:py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: dashboardTheme.colors.subtleGradient,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: dashboardTheme.animation.ease }}
        >
          {/* Stats Section */}
          <motion.div
            className="flex justify-center items-center gap-8 sm:gap-12 mb-8 sm:mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {statConfigs.map((config, index) => (
              <React.Fragment key={index}>
                <StatCard config={config} delay={0.3 + index * 0.1} />
                {index < statConfigs.length - 1 && (
                  <motion.div
                    className="w-px h-8 sm:h-10 opacity-30"
                    style={{
                      backgroundColor: dashboardTheme.colors.borderLight,
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  />
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            style={{
              color: dashboardTheme.colors.textPrimary,
              fontFamily: dashboardTheme.fonts.heading,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Choose Your Creative Path
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4"
            style={{
              color: dashboardTheme.colors.textSecondary,
              fontFamily: dashboardTheme.fonts.body,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {`This week's challenge offers three unique themes. Select the one that calls to your creative spirit and craft your 100-word masterpiece.`}
          </motion.p>

          <motion.p
  className="text-base sm:text-lg font-medium text-yellow-600 mb-6"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.75 }}
>
  🏆 Week 1 results soon to be out — stay tuned!
</motion.p>

          {/* Features */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                item={feature}
                index={index}
                baseDelay={0.9}
              />
            ))}
          </motion.div>

          {/* Weekly Perks */}
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <h3
              className="text-xl sm:text-2xl font-semibold mb-4"
              style={{
                color: dashboardTheme.colors.textPrimary,
                fontFamily: dashboardTheme.fonts.heading,
              }}
            >
              ✨ Weekly Perks Await!
            </h3>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {currentWeekPerks.map((perk, index) => (
                <FeatureCard
                  key={index}
                  item={perk}
                  index={index}
                  baseDelay={1.1}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeeklyChallengeHero;
