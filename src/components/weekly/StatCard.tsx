import { dashboardTheme } from "@/styles/theme";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

interface StatConfig {
  icon: LucideIcon;
  value: number;
  label: string;
  loading: boolean;
}

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

export default StatCard;
