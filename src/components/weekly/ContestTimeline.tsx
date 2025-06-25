import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Trophy, Star } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";

const ContestTimeline: React.FC = () => {
  const timelineItems = [
    {
      icon: BookOpen,
      title: "Weekly Challenges",
      description: "June 10 - June 30, 2025",
      delay: 0.1,
    },
    {
      icon: Trophy,
      title: "Main Contest",
      description: "Starts July 11th, 2025",
      delay: 0.2,
    },
    {
      icon: Star,
      title: "Winners",
      description: "Featured & Celebrated",
      delay: 0.3,
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: dashboardTheme.colors.glassOverlay,
          background: dashboardTheme.colors.subtleGradient,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <motion.h3
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12"
          style={{
            color: dashboardTheme.colors.textPrimary,
            fontFamily: dashboardTheme.fonts.heading,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contest Timeline
        </motion.h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-6 sm:p-8"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: item.delay,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-lg"
                style={{
                  backgroundColor: dashboardTheme.colors.accent,
                  color: "white",
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 10,
                  transition: { type: "spring", stiffness: 300 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <item.icon className="w-8 h-8 sm:w-10 sm:h-10" />
              </motion.div>

              <motion.h4
                className="font-bold mb-2 text-lg sm:text-xl"
                style={{
                  color: dashboardTheme.colors.textPrimary,
                  fontFamily: dashboardTheme.fonts.heading,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: item.delay + 0.2 }}
              >
                {item.title}
              </motion.h4>

              <motion.p
                className="text-sm sm:text-base"
                style={{
                  color: dashboardTheme.colors.textSecondary,
                  fontFamily: dashboardTheme.fonts.body,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: item.delay + 0.3 }}
              >
                {item.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContestTimeline;
