"use client";

import { useEffect, useState } from "react";
import { differenceInDays } from "date-fns";
import { colors, fonts } from "@/styles/theme";
import Link from "next/link";

const contestDate = new Date("2025-07-01T00:00:00");

export default function CountdownBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const today = new Date();
      const days = differenceInDays(contestDate, today);
      setDaysLeft(days >= 0 ? days : null);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 3600000); // every hour

    // Trigger slide-in after mount
    const timeout = setTimeout(() => setVisible(true), 100);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (daysLeft === null) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-5xl rounded-xl shadow-lg px-6 max-md:px-4 py-4 flex flex-row items-center justify-between gap-4 transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{
        backgroundColor: `${colors.parchment}cc`,
        color: colors.penumbraBlack,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <span
        className="text-sm md:text-base text-left font-medium"
        style={{
          fontFamily: fonts.heading,
        }}
      >
        ✍️ Only <strong>{daysLeft}</strong> day{daysLeft !== 1 ? "s" : ""} left
        until the <strong>Penumbra Script Contest</strong> begins!
      </span>

      <Link
        href="/penumbra-script-contest"
        style={{
          fontFamily: fonts.button,
        }}
        className="px-4 py-2 max-md:px-2 max-md:text-xs text-sm md:text-base rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 font-semibold"
      >
        Check Contest
      </Link>
    </div>
  );
}
