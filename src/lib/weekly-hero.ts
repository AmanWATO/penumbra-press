import {
  CheckCircle,
  Clock,
  Gift,
  LucideIcon,
  Star,
  Users,
} from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  text: string;
  delay: number;
}

export const features: FeatureItem[] = [
  {
    icon: Clock,
    text: "100 words maximum",
    delay: 0.1,
  },
  {
    icon: Users,
    text: "Open to Indian writers, 16+ only",
    delay: 0.2,
  },
  {
    icon: Star,
    text: "Winner gets featured",
    delay: 0.3,
  },
];

export const weeklyPerks: Record<1 | 2 | 3, FeatureItem[]> = {
  1: [
    {
      icon: Gift,
      text: "Free entry to main contest (1 entry only)",
      delay: 0.1,
    },
    {
      icon: CheckCircle,
      text: "10% Discount on Submission for Main Contest",
      delay: 0.2,
    },
  ],
  2: [
    {
      icon: Gift,
      text: "Early Bird Access — even past the deadline",
      delay: 0.1,
    },
    {
      icon: CheckCircle,
      text: "Unlock the Penumbra Prism eBook",
      delay: 0.2,
    },
  ],

  3: [
    {
      icon: Gift,
      text: "3 free entries to main contest",
      delay: 0.1,
    },
    {
      icon: CheckCircle,
      text: "Guaranteed anthology spot (if entry not already top 30)",
      delay: 0.2,
    },
  ],
};
