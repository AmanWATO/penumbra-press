import { weeklyThemes } from "@/lib/weeklyChallenge";

export const getCurrentWeek = () => {
  const currentDate = new Date('2025-06-10'); 
  return weeklyThemes["June 10-16, 2025"];
};


export  const getWeekNumber = () => {
  const now = new Date();
  const start = new Date("2025-06-10T00:00:00");

  // If before the contest start date
  if (now < start) return 0;

  const diffInMs = now.getTime() - start.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays <= 6) return 1;      // June 10–16
  if (diffInDays <= 13) return 2;     // June 17–23
  if (diffInDays <= 20) return 3;     // June 24–30

  return 0; // Outside the contest window
};