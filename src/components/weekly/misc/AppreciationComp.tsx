"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PenTool, BookOpen, BarChart3, Trophy, ArrowRight } from "lucide-react";
import Link from "next/link";
import { weeklyContestDB } from "@/lib/firebase";
import { colors, fonts } from "@/styles/theme";

interface StatsData {
  totalWritingSubmitted: number;
  totalAuthorsJoined: number;
  loading: boolean;
  error: string | null;
}

interface StatCardProps {
  icon: React.ElementType;
  value: number | string;
  label: string;
  backgroundColor: string;
  loading?: boolean;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  value,
  label,
  backgroundColor,
  loading = false,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="text-center"
  >
    <div
      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-2"
      style={{ backgroundColor }}
    >
      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
    </div>
    <div
      className="text-2xl md:text-3xl font-bold mb-1"
      style={{
        color: colors.penumbraBlack,
        fontFamily: fonts.dashboardHeading,
      }}
    >
      {loading ? "..." : value}
    </div>
    <p
      className="text-sm md:text-base"
      style={{
        color: colors.darkSepia,
        fontFamily: fonts.body,
      }}
    >
      {label}
    </p>
  </motion.div>
);

interface NavigationCardProps {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  iconBackgroundColor: string;
  delay?: number;
}

const NavigationCard: React.FC<NavigationCardProps> = ({
  href,
  icon: Icon,
  title,
  description,
  iconBackgroundColor,
  delay = 0,
}) => (
  <Link href={href}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="p-4 md:p-5 rounded-lg shadow-sm border cursor-pointer group transition-all duration-200"
      style={{
        backgroundColor: colors.cream,
        borderColor: colors.parchment,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: iconBackgroundColor }}
          >
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h3
              className="text-base md:text-lg font-semibold"
              style={{
                color: colors.penumbraBlack,
                fontFamily: fonts.dashboardHeading,
              }}
            >
              {title}
            </h3>
            <p
              className="text-xs md:text-sm"
              style={{
                color: colors.darkSepia,
                fontFamily: fonts.body,
              }}
            >
              {description}
            </p>
          </div>
        </div>
        <ArrowRight
          className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
          style={{ color: iconBackgroundColor }}
        />
      </div>
    </motion.div>
  </Link>
);

interface HeaderSectionProps {
  title: string;
  subtitle: string;
  dateRange: string;
  delay?: number;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  title,
  subtitle,
  dateRange,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="text-center mb-8"
  >
    <h1
      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
      style={{
        color: colors.penumbraBlack,
        fontFamily: fonts.heading,
      }}
    >
      {title}
    </h1>
    <p
      className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
      style={{
        color: colors.darkSepia,
        fontFamily: fonts.body,
      }}
    >
      {subtitle}
    </p>
    <p
      className="text-sm mt-2 sm:text-base md:text-lg max-w-2xl mx-auto"
      style={{
        color: colors.darkSepia,
        fontFamily: fonts.playful,
      }}
    >
      {dateRange}
    </p>
  </motion.div>
);

interface StatsContainerProps {
  stats: StatsData;
  delay?: number;
}

const StatsContainer: React.FC<StatsContainerProps> = ({
  stats,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="mb-8 md:mb-12"
  >
    <div
      className="rounded-lg p-5 md:p-7 shadow-sm border"
      style={{
        backgroundColor: colors.cream,
        borderColor: colors.parchment,
      }}
    >
      <h2
        className="text-lg sm:text-xl md:text-2xl font-semibold text-center mb-6"
        style={{
          color: colors.penumbraBlack,
          fontFamily: fonts.dashboardHeading,
        }}
      >
        Thanks to all entries and authors
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-7">
        <StatCard
          icon={PenTool}
          value={stats.totalWritingSubmitted}
          label="Stories Written"
          backgroundColor={colors.inkBrown}
          loading={stats.loading}
          delay={0.3}
        />
        <StatCard
          icon={BookOpen}
          value={stats.totalAuthorsJoined}
          label="Writers Joined"
          backgroundColor={colors.deepSepia}
          loading={stats.loading}
          delay={0.4}
        />
      </div>
    </div>
  </motion.div>
);

interface NotificationBannerProps {
  message: string;
  icon?: React.ElementType;
  delay?: number;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  message,
  icon: Icon = Trophy,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="text-center"
  >
    <div
      className="inline-flex items-center px-4 py-2 rounded-full text-sm md:text-base"
      style={{
        backgroundColor: colors.gold,
        color: colors.penumbraBlack,
        fontFamily: fonts.button,
      }}
    >
      <Icon className="w-4 h-4 mr-2" />
      {message}
    </div>
  </motion.div>
);

const AppreciationComp: React.FC = () => {
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

  return (
    <div
      className="min-h-screen py-8 md:py-12"
      style={{ backgroundColor: colors.softEggshell }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeaderSection
          title="Thanks For Staying With Penumbra"
          subtitle="And choosing it to highlight your writing journey"
          dateRange="June 10 2025 - July 7 2025"
          delay={0}
        />

        <StatsContainer stats={stats} delay={0.2} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-8 md:mb-12"
        >
          <NavigationCard
            href="/weekly-results"
            icon={BarChart3}
            title="Check Weekly Results"
            description="View contest outcomes"
            iconBackgroundColor={colors.darkGray}
            delay={0}
          />
          <NavigationCard
            href="/penumbra-script-contest"
            icon={Trophy}
            title="Penumbra Script Contest"
            description="Join the main contest"
            iconBackgroundColor={colors.nightBlue}
            delay={0.1}
          />
        </motion.div>

        <NotificationBanner
          message="Main contest is about to start - Stay tuned!"
          delay={0.6}
        />
      </div>
    </div>
  );
};

export default AppreciationComp;
