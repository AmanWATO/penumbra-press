import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Quote } from "@/api/apiTypes";
import theme from "@/styles/theme";

interface QuoteModalProps {
  selectedQuote: Quote | null;
  onClose: () => void;
}

const QuoteModal = ({ selectedQuote, onClose }: QuoteModalProps) => {
  const quotesTheme = theme.sections.quotes;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const modalVariants = {
    hidden: {
      scale: 0.3,
      opacity: 0,
      rotateX: -15,
      y: 100,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.6,
        delay: 0.1,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      rotateX: 15,
      y: -50,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const headerBarVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        delay: 0.4,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const closeButtonVariants = {
    rest: {
      scale: 1,
      rotate: 0,
      backgroundColor: "#f3f4f6",
    },
    hover: {
      scale: 1.1,
      rotate: 90,
      backgroundColor: "#ef4444",
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <AnimatePresence>
      {selectedQuote && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Animated Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#17171750] backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Modal Content with 3D perspective */}
          <motion.div
            className="relative max-w-2xl w-full mx-4 rounded-xl shadow-2xl bg-white overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Animated Close Button */}
            <motion.button
              className="absolute top-4 right-4 w-10 h-10 flex cursor-pointer items-center justify-center rounded-full z-10"
              variants={closeButtonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              onClick={onClose}
            >
              <motion.div
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X size={20} className="text-white" />
              </motion.div>
            </motion.button>

            <motion.div
              className="p-6 md:p-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Animated Header Bar */}
              <motion.div
                className="h-3 w-full rounded-t-lg absolute top-0 left-0"
                style={{ backgroundColor: quotesTheme.accent }}
                variants={headerBarVariants}
                initial="hidden"
                animate="visible"
              />

              {/* Main quote text with typewriter effect */}
              <motion.div variants={textVariants} className="mt-6 mb-8">
                <motion.p
                  className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed text-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                >
                  {`"${selectedQuote.title}"`}
                </motion.p>
              </motion.div>

              {/* Animated Divider */}
              <motion.div
                className="my-6 h-px bg-gray-200 rounded-full"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  delay: 0.8,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                style={{ transformOrigin: "left" }}
              />

              {/* Genre and Explanation */}
              <motion.div variants={textVariants}>
                <motion.h3
                  className="text-lg mb-3 font-medium text-gray-800"
                  whileHover={{
                    color: quotesTheme.accent,
                    x: 10,
                    transition: { duration: 0.2 },
                  }}
                >
                  {selectedQuote?.genre}
                </motion.h3>

                <motion.p
                  className="text-base text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1,
                    duration: 0.6,
                  }}
                >
                  {selectedQuote.explanation}
                </motion.p>
              </motion.div>

              {/* Subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: `radial-gradient(circle at center, ${quotesTheme.accent}20, transparent 70%)`,
                  filter: "blur(20px)",
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
