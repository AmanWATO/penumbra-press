import React from "react";
import { Trophy, Medal, Star } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";
import { extractTextContent } from "@/utils/Helper";

export const truncateText = (text: string, maxLength: number = 200): string => {
  const plainText = extractTextContent(text);
  return plainText.length <= maxLength
    ? plainText
    : plainText.substring(0, maxLength) + "...";
};

export const getRankIcon = (rank: string | null) => {
  if (!rank)
    return (
      <Star
        className="w-5 h-5"
        style={{ color: dashboardTheme.colors.accent }}
      />
    );

  const normalizedRank = String(rank).toUpperCase().trim();
  const iconProps = { className: "w-5 h-5" };

  if (["FIRST", "1ST", "1"].includes(normalizedRank)) {
    return <Trophy {...iconProps} style={{ color: "#FFD700" }} />;
  }
  if (["SECOND", "2ND", "2"].includes(normalizedRank)) {
    return <Medal {...iconProps} style={{ color: "#C0C0C0" }} />;
  }
  if (["THIRD", "3RD", "3"].includes(normalizedRank)) {
    return <Medal {...iconProps} style={{ color: "#CD7F32" }} />;
  }
  return (
    <Star {...iconProps} style={{ color: dashboardTheme.colors.accent }} />
  );
};

export const getRankDisplayName = (
  rank: string | null,
  index: number
): string => {
  if (!rank) return `${index + 1}${getOrdinalSuffix(index + 1)} Place`;

  const normalizedRank = String(rank).toUpperCase().trim();
  const rankNames: { [key: string]: string } = {
    FIRST: "1st Place",
    "1ST": "1st Place",
    "1": "1st Place",
    SECOND: "2nd Place",
    "2ND": "2nd Place",
    "2": "2nd Place",
    THIRD: "3rd Place",
    "3RD": "3rd Place",
    "3": "3rd Place",
    FOURTH: "4th Place",
    "4TH": "4th Place",
    "4": "4th Place",
    FIFTH: "5th Place",
    "5TH": "5th Place",
    "5": "5th Place",
  };

  return (
    rankNames[normalizedRank] ||
    `${index + 1}${getOrdinalSuffix(index + 1)} Place`
  );
};

export const getOrdinalSuffix = (num: number): string => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || "th";
};

export const getRankCardStyle = (index: number) => {
  const colors = [
    {
      bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
      border: "#FFD700",
    },
    {
      bg: "linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)",
      border: "#C0C0C0",
    },
    {
      bg: "linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)",
      border: "#CD7F32",
    },
    {
      bg: `linear-gradient(135deg, ${dashboardTheme.colors.info} 0%, #87CEEB 100%)`,
      border: dashboardTheme.colors.info,
    },
    {
      bg: `linear-gradient(135deg, ${dashboardTheme.colors.accent} 0%, ${
        dashboardTheme.colors.accentLight || dashboardTheme.colors.accent
      } 100%)`,
      border: dashboardTheme.colors.accent,
    },
  ];

  const style = colors[index] || {
    bg: dashboardTheme.colors.cardBg,
    border: dashboardTheme.colors.cardBorder,
  };

  return {
    background: style.bg,
    borderLeft: `4px solid ${style.border}`,
    borderRadius: dashboardTheme.radius.lg,
    boxShadow:
      dashboardTheme.components?.button?.primary?.shadow ||
      "0 4px 6px rgba(0,0,0,0.1)",
  };
};
