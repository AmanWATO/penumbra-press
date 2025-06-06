"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { privacySections } from "@/lib/privacy";

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #f1efe2 0%, #e8e6d9 20%, #dfdcd0 40%, #cfccc0 60%, #b8b5a9 80%, #9e9b8f 100%)",
          }}
        />

        {/* Content Overlay */}
        <motion.div
          className="relative z-10 px-4 sm:px-8 py-12 sm:py-16"
          initial="initial"
          animate="animate"
          variants={pageVariants}
        >
          <motion.div className="text-center mb-16" variants={sectionVariants}>
            <h1
              className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                color: "#171717",
              }}
            >
              Privacy Policy
            </h1>
            <p
              className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{
                fontFamily:
                  "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
                color: "#3d3a2e",
              }}
            >
              {`Your words are yours. Your data is yours. Here's how we protect it.`}
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto space-y-8"
            variants={sectionVariants}
          >
            {privacySections.map((section, index) => (
              <motion.div
                key={index}
                className="rounded-2xl p-6 sm:p-8 border shadow-xl"
                style={{
                  backgroundColor: "rgba(240, 235, 224, 0.7)",
                  backdropFilter: "blur(10px)",
                  borderColor: "#cfccc0",
                }}
                variants={sectionVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
              >
                <h2
                  className="text-2xl sm:text-3xl font-bold mb-4 flex items-center"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    color: "#171717",
                  }}
                >
                  <div
                    className="rounded-full w-8 h-8 flex items-center justify-center mr-4"
                    style={{ backgroundColor: "rgba(93, 90, 78, 0.2)" }}
                  >
                    <span className="text-base font-bold leading-[80%]">
                      {index + 1}
                    </span>
                  </div>
                  {section.title}
                </h2>
                <p
                  className="text-base sm:text-lg leading-relaxed"
                  style={{
                    fontFamily:
                      "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
                    color: "#3d3a2e",
                  }}
                >
                  {section.content}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-16 rounded-2xl p-8 max-w-4xl mx-auto border"
            style={{
              backgroundColor: "rgba(240, 235, 224, 0.7)",
              backdropFilter: "blur(10px)",
              borderColor: "#cfccc0",
            }}
            variants={sectionVariants}
          >
            <h3
              className="text-2xl font-bold mb-4"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                color: "#171717",
              }}
            >
              Questions or Concerns?
            </h3>
            <p
              className="mb-6 text-lg"
              style={{
                fontFamily:
                  "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
                color: "#3d3a2e",
              }}
            >
              {`Feel free to reach out to our support team for clarification or data requests. We're here to help and we're always listening.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: "rgba(93, 90, 78, 0.2)",
                  color: "#171717",
                  fontFamily:
                    "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
                }}
                onClick={() => router.push("contact-us")}
              >
                Contact Support
              </button>
              <button
                className="px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                style={{
                  backgroundColor: "rgba(93, 90, 78, 0.2)",
                  color: "#171717",
                  fontFamily:
                    "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
                }}
                onClick={() => router.push("/terms-and-conditions")}
              >
                View Terms
              </button>
            </div>
          </motion.div>

          <motion.button
            className="fixed bottom-8 right-8 p-4 rounded-full backdrop-blur-lg border shadow-xl transition-all duration-300 transform hover:scale-110"
            style={{
              backgroundColor: "rgba(240, 235, 224, 0.8)",
              borderColor: "#cfccc0",
              color: "#171717",
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </>
  );
}
