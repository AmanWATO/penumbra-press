"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { faqItems } from "@/lib/faq";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const route = useRouter();

  return (
    <>
      <div className="min-h-screen" style={{ backgroundColor: "#f1efe2" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="grid lg:grid-cols-12 gap-12 lg:gap-16"
          >
            {/* Left Column - Header */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start"
            >
              <div className="space-y-6">
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    color: "#171717",
                  }}
                >
                  Frequently Asked
                  <br />
                  <span style={{ color: "#5a513c" }}>Questions</span>
                </h1>

                <p
                  className="text-base sm:text-lg md:text-xl leading-relaxed max-w-md"
                  style={{
                    fontFamily:
                      "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
                    color: "#5d5a4e",
                  }}
                >
                  We want to be one with you. Everything you need to know about
                  Penumbra Penned.
                </p>

                {/* Contact Card */}
                <motion.div
                  className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "#e8e6d9",
                    borderColor: "#cfccc0",
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0"
                      style={{ backgroundColor: "#b8b5a9" }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#171717"
                        strokeWidth="2"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </div>
                    <div className="text-center md:ml-4 sm:text-left">
                      <h3
                        className="font-semibold text-base sm:text-lg mb-2"
                        style={{
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          color: "#171717",
                        }}
                      >
                        Still have questions?
                      </h3>
                      <p
                        className="text-sm mb-4"
                        style={{
                          fontFamily:
                            "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
                          color: "#5d5a4e",
                        }}
                      >
                        {`Can't find the answer you're looking for? Please chat with our friendly team.`}
                      </p>
                      <motion.button
                        className="px-4 py-2 rounded-lg font-medium text-sm transition-colors w-full sm:w-auto"
                        style={{
                          backgroundColor: "#171717",
                          color: "#f1efe2",
                          fontFamily:
                            "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
                        }}
                        whileHover={{
                          backgroundColor: "#3d3a2e",
                          scale: 1.05,
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => route.push("/contact-us")}
                      >
                        Get in touch
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - FAQ Items */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="border-b"
                    style={{ borderColor: "#dfdcd0" }}
                  >
                    <motion.button
                      className="w-full py-4 sm:py-6 px-2 text-left flex justify-between items-center group"
                      onClick={() => toggleFAQ(index)}
                      whileHover={{ x: [0, 4, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      <h3
                        className="text-base sm:text-lg md:text-xl font-semibold pr-4 sm:pr-8 group-hover:opacity-80 transition-opacity"
                        style={{
                          fontFamily:
                            "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
                          color: "#171717",
                        }}
                      >
                        {item.question}
                      </h3>
                      <motion.div
                        animate={{
                          rotate: openIndex === index ? 45 : 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{ stroke: "#5d5a4e" }}
                          strokeWidth="2"
                        >
                          <path d="M8 3v10M3 8h10" />
                        </svg>
                      </motion.div>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {openIndex === index && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.4,
                            ease: "easeInOut",
                          }}
                          className="overflow-hidden"
                        >
                          <div
                            className="pb-4 sm:pb-6 px-4 max-md:px-4  text-sm sm:text-base md:text-lg leading-relaxed"
                            style={{
                              fontFamily:
                                "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
                              color: "#5d5a4e",
                            }}
                          >
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
