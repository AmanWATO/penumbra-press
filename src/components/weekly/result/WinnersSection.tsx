// WinnersSection.tsx
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { WinnerCard } from "./WinnerCard";

interface WinnersSectionProps {
  winners: any[];
  expandedCards: Set<number>;
  onToggleExpansion: (id: number) => void;
}

export const WinnersSection: React.FC<WinnersSectionProps> = ({
  winners,
  expandedCards,
  onToggleExpansion,
}) => {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold mb-2"
          style={{ color: dashboardTheme.colors.textPrimary }}
        >
          🏆 Contest Winners
        </h2>
        <p style={{ color: dashboardTheme.colors.textSecondary }}>
          Congratulations to our outstanding performers!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {winners.map((entry, index) => (
          <WinnerCard
            key={entry.id}
            entry={entry}
            index={index}
            isExpanded={expandedCards.has(entry.id)}
            onToggleExpansion={onToggleExpansion}
          />
        ))}
      </div>
    </motion.div>
  );
};