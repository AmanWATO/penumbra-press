import React, { useState, useEffect } from "react";
import { colors, fonts } from "@/styles/theme";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface CountdownProps {
  targetDate: string | Date;
  onComplete?: () => void;
}

const CountdownTimer = ({ targetDate, onComplete }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    completed: false,
  });

  const [pulse, setPulse] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference <= 0) {
        if (!timeLeft.completed && onComplete) {
          onComplete();
        }
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          completed: true,
        };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        completed: false,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
      setPulse(true);
      setTimeout(() => setPulse(false), 500);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete, timeLeft.completed]);

  interface TimeFormatter {
    (time: number): string;
  }

  const formatTime: TimeFormatter = (time) => {
    return time < 10 ? `0${time}` : time.toString();
  };

  const calculateProgress = () => {
    const totalDuration =
      new Date(targetDate).getTime() -
      new Date("2025-05-06T00:00:00").getTime();
    const elapsed =
      new Date().getTime() - new Date("2025-05-06T00:00:00").getTime();
    return Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full mb-8 px-4 sm:px-6 md:px-8"
    >
      <div className="text-center mb-4 sm:mb-6">
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ fontFamily: fonts.heading, color: colors.parchment }}
          className="text-2xl sm:text-3xl mb-2 sm:mb-3"
        >
          Countdown to Launch
        </motion.h2>
        <p
          style={{ fontFamily: fonts.body, color: colors.lightSepia }}
          className="text-base sm:text-lg"
        >
          The Penumbra Script awaits your silent and unheard tales!!
        </p>
      </div>

      <div className="w-full h-2 bg-gray-700 rounded-full mb-6 sm:mb-8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${calculateProgress()}%` }}
          transition={{ duration: 1 }}
          className="h-full rounded-full"
          style={{ backgroundColor: colors.deepSepia }}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
        <motion.div
          className="flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          <div
            className="text-2xl sm:text-3xl md:text-4xl font-bold w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center rounded-lg shadow-lg"
            style={{
              backgroundColor: colors.nightBlue,
              color: colors.parchment,
              fontFamily: fonts.heading,
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            }}
          >
            {formatTime(timeLeft.days)}
          </div>
          <span
            className="text-xs sm:text-sm mt-1 sm:mt-2 font-medium tracking-wide"
            style={{ color: colors.lightSepia }}
          >
            DAYS
          </span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          <div
            className="text-2xl sm:text-3xl md:text-4xl font-bold w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center rounded-lg shadow-lg"
            style={{
              backgroundColor: colors.inkBrown,
              color: colors.parchment,
              fontFamily: fonts.heading,
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            }}
          >
            {formatTime(timeLeft.hours)}
          </div>
          <span
            className="text-xs sm:text-sm mt-1 sm:mt-2 font-medium tracking-wide"
            style={{ color: colors.lightSepia }}
          >
            HOURS
          </span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          whileHover={{ scale: 1.05 }}
        >
          <div
            className="text-2xl sm:text-3xl md:text-4xl font-bold w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center rounded-lg shadow-lg"
            style={{
              backgroundColor: colors.deepSepia,
              color: colors.parchment,
              fontFamily: fonts.heading,
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            }}
          >
            {formatTime(timeLeft.minutes)}
          </div>
          <span
            className="text-xs sm:text-sm mt-1 sm:mt-2 font-medium tracking-wide"
            style={{ color: colors.lightSepia }}
          >
            MINUTES
          </span>
        </motion.div>

        <motion.div
          className="flex flex-col items-center"
          animate={{ scale: pulse ? 1.03 : 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <div
            className="text-2xl sm:text-3xl md:text-4xl font-bold w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center rounded-lg shadow-lg"
            style={{
              backgroundColor: colors.darkSepia,
              color: colors.parchment,
              fontFamily: fonts.heading,
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
            }}
          >
            {formatTime(timeLeft.seconds)}
          </div>
          <span
            className="text-xs sm:text-sm mt-1 sm:mt-2 font-medium tracking-wide"
            style={{ color: colors.lightSepia }}
          >
            SECONDS
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center p-3 sm:p-4 md:p-5 rounded-md"
        style={{
          backgroundColor: "rgba(93, 64, 55, 0.2)",
          borderLeft: `4px solid ${colors.deepSepia}`,
          boxShadow: `0 4px 8px rgba(0, 0, 0, 0.2)`,
        }}
      >
        <h3
          className="text-lg sm:text-xl mb-1 sm:mb-2 font-medium"
          style={{ color: colors.parchment, fontFamily: fonts.heading }}
        >
          {`Writer's Notice:`}
        </h3>
        <p
          style={{
            color: colors.lightSepia,
            fontFamily: fonts.body,
            lineHeight: 1.6,
          }}
          className="text-sm sm:text-base"
        >
          The Penumbra Penned will open its doors on{" "}
          <span style={{ color: colors.parchment, fontWeight: "bold" }}>
            July 1st, 2025
          </span>
          . Sharpen your quills and prepare your most captivating shadow scripts
          for submission.
        </p>
        <div className="mt-3 sm:mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-md transition-all duration-200 text-sm sm:text-base"
            style={{
              backgroundColor: colors.deepSepia,
              color: colors.cream,
              fontFamily: fonts.button,
              boxShadow: `0 4px 6px rgba(0, 0, 0, 0.2)`,
            }}
            onClick={() => router.push("/")}
          >
            Return to Homepage
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CountdownTimer;
