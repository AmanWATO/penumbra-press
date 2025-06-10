import React from "react";
import { motion } from "framer-motion";
import { Clock, Users, Star, Gift, CheckCircle } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";
import { getWeekNumber } from "@/utils/Helper";

const WeeklyChallengeHero: React.FC = () => {
  const features = [
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

  const weeklyPerks = {
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

  const perks = weeklyPerks[(getWeekNumber() || 1) as 1 | 2 | 3] || [];

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
          {/* Heading */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            style={{
              color: dashboardTheme.colors.textPrimary,
              fontFamily: dashboardTheme.fonts.heading,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
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
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {`This week's challenge offers three unique themes. Select the one that calls to your creative spirit and craft your 100-word masterpiece.`}
          </motion.p>

          {/* Features */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {features.map((feature, index) => (
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
                  delay: 0.4 + feature.delay,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: dashboardTheme.colors.cardHover,
                }}
              >
                <feature.icon
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
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Weekly Perks */}
          <motion.div
            className="max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
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
              {perks.map((perk, index) => (
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
                    delay: 0.6 + perk.delay,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: dashboardTheme.colors.cardHover,
                  }}
                >
                  <perk.icon
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
                    {perk.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeeklyChallengeHero;
