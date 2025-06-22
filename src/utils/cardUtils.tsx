import React from "react";
import { Trophy, Medal, Star, Award } from "lucide-react";
import { dashboardTheme } from "@/styles/theme";
import { extractTextContent } from "@/utils/Helper";

export const truncateText = (text: string, maxLength: number = 200): string => {
  const plainText = extractTextContent(text);
  return plainText.length <= maxLength
    ? plainText
    : plainText.substring(0, maxLength) + "...";
};
