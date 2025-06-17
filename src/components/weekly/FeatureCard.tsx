import { FeatureItem } from "@/lib/weekly-hero";
import { dashboardTheme } from "@/styles/theme";
import { motion } from "framer-motion";

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

export default FeatureCard;
