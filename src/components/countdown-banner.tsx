"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { differenceInDays } from "date-fns";
import { colors } from "@/styles/theme";
import Link from "next/link";

const contestDate = new Date("2025-07-01T00:00:00");

export default function CountdownBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const today = new Date();
      const days = differenceInDays(contestDate, today);
      setDaysLeft(days >= 0 ? days : null);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 3600000); // every hour
    return () => clearInterval(interval);
  }, []);

  if (daysLeft === null) return null;

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        backgroundColor: `${colors.parchment}cc`, // semi-transparent
        color: colors.penumbraBlack,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)", // Safari support
      }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-5xl rounded-xl shadow-lg px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <span className="text-sm md:text-base text-center md:text-left font-medium">
        ✍️ Only <strong>{daysLeft}</strong> day{daysLeft !== 1 ? "s" : ""} left
        until the <strong>Penumbra Script Contest</strong> begins!
      </span>

      <Link
        href="/penumbra-script-contest"
        className="px-4 py-2 text-sm md:text-base rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 font-semibold"
      >
        Check Contest
      </Link>
    </motion.div>
  );
}
