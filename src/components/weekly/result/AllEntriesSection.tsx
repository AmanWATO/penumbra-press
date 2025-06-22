import React, { useState } from "react";
import { motion } from "framer-motion";
import { dashboardTheme } from "@/styles/theme";
import { EntryCard } from "./EntryCard";
import { EntryPopup } from "./EntryPopup";

interface AllEntriesSectionProps {
  entries: any[];
  expandedCards: Set<number>;
  onToggleExpansion: (id: number) => void;
}

export const AllEntriesSection: React.FC<AllEntriesSectionProps> = ({
  entries,
  expandedCards,
}) => {
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  const handleOpenPopup = (entry: any) => {
    setSelectedEntry(entry);
  };

  const handleClosePopup = () => {
    setSelectedEntry(null);
  };

  return (
    <section className="px-4 max-md:px-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-center mb-8 max-md:mb-4">
          <h2
            className="text-2xl max-md:text-xl font-bold mb-2"
            style={{ color: dashboardTheme.colors.textPrimary }}
          >
            All Entries
          </h2>

            <p
                className="text-sm md:text-base"
                style={{ color: dashboardTheme.colors.textSecondary }}
              >
                Every voice inked, every soul shared — this is where stories find their first breath.
              </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry, index) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              index={index}
              onOpenPopup={handleOpenPopup}
              isExpanded={expandedCards.has(entry.id)}
            />
          ))}
        </div>
      </motion.div>

      {selectedEntry && (
        <EntryPopup entry={selectedEntry} onClose={handleClosePopup} />
      )}
    </section>
  );
};
