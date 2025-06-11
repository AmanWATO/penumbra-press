import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Users,
  Star,
  Gift,
  CheckCircle,
  PenTool,
  BookOpen,
  LucideIcon,
} from "lucide-react";
import { dashboardTheme } from "@/styles/theme";
import { getWeekNumber } from "@/utils/Helper";
import { weeklyContestDB } from "@/lib/firebase";

interface StatsData {
  totalWritingSubmitted: number;
  totalAuthorsJoined: number;
  loading: boolean;
  error: string | null;
}

interface FeatureItem {
  icon: LucideIcon;
  text: string;
  delay: number;
}

interface StatConfig {
  icon: LucideIcon;
  value: number;
  label: string;
  loading: boolean;
}

const FeatureCard = ({
  item,
  index,
  baseDelay = 0,
}: {
  item: FeatureItem;
  index: number;
  baseDelay?: number;
}) => (
  <motion.div
    key={index}
    className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-full backdrop-blur-sm border"
    style={{
      backgroundColor: dashboardTheme.colors.glassOverlay,
      borderColor: dashboardTheme.colors.borderLight,
      boxShadow: dashboardTheme.colors.cardShadow,
    }}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.6,
      delay: baseDelay + item.delay,
      type: "spring",
      stiffness: 200,
    }}
    whileHover={{
      scale: 1.05,
      boxShadow: dashboardTheme.colors.cardHover,
    }}
  >
    <item.icon
      className="w-4 h-4 sm:w-5 sm:h-5"
      style={{ color: dashboardTheme.colors.accent }}
    />
    <span
      className="text-xs sm:text-sm font-medium"
      style={{
        color: dashboardTheme.colors.textSecondary,
        fontFamily: dashboardTheme.fonts.body,
      }}
    >
      {item.text}
    </span>
  </motion.div>
);

const AnimatedCounter = ({
  value,
  loading,
}: {
  value: number;
  loading: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!loading && value > 0) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value, loading]);

  if (loading) {
    return (
      <div className="w-8 h-8 mx-auto">
        <div
          className="animate-spin rounded-full h-full w-full border-2 border-t-transparent"
          style={{
            borderColor: dashboardTheme.colors.accent,
            borderTopColor: "transparent",
          }}
        />
      </div>
    );
  }

  return <span>{count.toLocaleString()}</span>;
};

const StatCard = ({ config, delay }: { config: StatConfig; delay: number }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05 }}
  >
    <div className="flex items-center justify-center gap-2 mb-2">
      <config.icon
        className="w-4 h-4 sm:w-5 sm:h-5"
        style={{ color: dashboardTheme.colors.accent }}
      />
      <span
        className="text-2xl sm:text-3xl font-bold"
        style={{
          color: dashboardTheme.colors.textPrimary,
          fontFamily: dashboardTheme.fonts.heading,
        }}
      >
        <AnimatedCounter value={config.value} loading={config.loading} />
      </span>
    </div>
    <p
      className="text-xs sm:text-sm font-medium opacity-75"
      style={{
        color: dashboardTheme.colors.textSecondary,
        fontFamily: dashboardTheme.fonts.body,
      }}
    >
      {config.label}
    </p>
  </motion.div>
);

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


  const features: FeatureItem[] = [
    {
      icon: Clock,
      text: "100 words maximum",
      delay: 0.1,
    },
    {
      icon: Users,
      text: "Open to Indian writers, 16+ only",
      delay: 0.2,
    },
    {
      icon: Star,
      text: "Winner gets featured",
      delay: 0.3,
    },
  ];

  const weeklyPerks: Record<1 | 2 | 3, FeatureItem[]> = {
    1: [
      {
        icon: Gift,
        text: "Free entry to main contest (1 entry only)",
        delay: 0.1,
      },
      {
        icon: CheckCircle,
        text: "10% Discount on Submission for Main Contest",
        delay: 0.2,
      },
    ],
    2: [
      {
        icon: Gift,
        text: "Early access to next Main Contest themes",
        delay: 0.1,
      },
      {
        icon: CheckCircle,
        text: "Chance to be featured as 'Writer to Watch'",
        delay: 0.2,
      },
    ],
    3: [
      {
        icon: Gift,
        text: "3 free entries to main contest",
        delay: 0.1,
      },
      {
        icon: CheckCircle,
        text: "Guaranteed anthology spot (if entry not already top 30)",
        delay: 0.2,
      },
    ],
  };

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
    <section className="py-12 sm:py-16 relative overflow-hidden">
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
