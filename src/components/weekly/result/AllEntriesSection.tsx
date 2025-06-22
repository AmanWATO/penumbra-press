import React from "react";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { EntryCard } from "./EntryCard";

interface AllEntriesSectionProps {
  entries: any[];
  expandedCards: Set<number>;
  onToggleExpansion: (id: number) => void;
}

export const AllEntriesSection: React.FC<AllEntriesSectionProps> = ({
  entries,
  expandedCards,
  onToggleExpansion,
}) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="text-center mb-8">
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: dashboardTheme.colors.textPrimary }}
        >
          All Entries
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entries.map((entry, index) => (
          <EntryCard
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