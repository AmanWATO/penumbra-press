"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Bookmark } from "lucide-react";
import { Quote } from "@/api/apiTypes";
import { useTheme } from "@/context/ThemeProvider";

interface QuoteModalProps {
  selectedQuote: Quote | null;
  onClose: () => void;
  colorScheme: {
    bg: string;
    border: string;
    accent: string;
    text: string;
  };
}

// Helper to strip quotes from text
const stripQuotes = (text: string): string => {
  return text.replace(/^["']|["']$/g, '').trim();
};

const QuoteModal = ({ selectedQuote, onClose, colorScheme }: QuoteModalProps) => {
  const theme = useTheme();

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      y: 10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {selectedQuote && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative max-w-xl w-full rounded-lg overflow-hidden"
            style={{
              backgroundColor: "#1a1a1a",
              border: `1px solid ${colorScheme.border}`,
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Top accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ backgroundColor: colorScheme.accent }}
            />

            {/* Close button */}
            <motion.button
              className="absolute top-4 cursor-pointer right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
              style={{
                backgroundColor: colorScheme.bg,
                border: `1px solid ${colorScheme.border}`,
              }}
              whileHover={{ backgroundColor: colorScheme.border }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              <X className="w-4 h-4" style={{ color: colorScheme.text }} />
            </motion.button>

            <div className="p-8">
              {/* Genre tag */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{
                  backgroundColor: colorScheme.bg,
                  border: `1px solid ${colorScheme.border}`,
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Bookmark className="w-3 h-3" style={{ color: colorScheme.accent }} />
                <span
                  className="text-xs tracking-wide uppercase"
                  style={{ color: colorScheme.text, fontFamily: theme.fonts.button }}
                >
                  {selectedQuote.genre}
                </span>
              </motion.div>

              {/* Quote text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <p
                  className="text-xl md:text-2xl leading-relaxed mb-8"
                  style={{
                    color: theme.colors.gray100,
                    fontFamily: theme.fonts.math,
                  }}
                >
                  &ldquo;{stripQuotes(selectedQuote.title)}&rdquo;
                </p>
              </motion.div>

              {/* Divider */}
              <motion.div
                className="w-12 h-px mb-8"
                style={{ backgroundColor: colorScheme.accent }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              />

              {/* Explanation */}
              <motion.p
                className="text-sm md:text-base leading-relaxed"
                style={{
                  color: theme.colors.gray400,
                  fontFamily: theme.fonts.serifAlt,
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {selectedQuote.explanation}
              </motion.p>

              {/* Footer attribution */}
              <motion.div
                className="mt-10 pt-6 flex items-center justify-between"
                style={{ borderTop: `1px solid ${colorScheme.border}` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span
                  className="text-xs tracking-wide"
                  style={{ color: theme.colors.gray600, fontFamily: theme.fonts.body }}
                >
                  From the Thoughtful Archive
                </span>
                <span
                  className="text-xs"
                  style={{ color: colorScheme.accent, fontFamily: theme.fonts.playful }}
                >
                  ~ Aman Srivastava
                </span>
              </motion.div>
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ backgroundColor: colorScheme.border }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;