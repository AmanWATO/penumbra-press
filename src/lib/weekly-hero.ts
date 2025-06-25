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
    text: "Max 500 words — say more with less",
    delay: 0.1,
  },
  {
    icon: Users,
    text: "Open to all writers, age 16+",
    delay: 0.2,
  },
  {
    icon: Star,
    text: "Winner gets featured, spotlight-style",
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
      text: "Guaranteed anthology spot (if entry not already top 30)",
      delay: 0.2,
    },
  ],
  3: [
    {
      icon: Gift,
      text: "Indians: 3 main contest entries. Others: Global spotlight nomination!",
      delay: 0.1,
    },
    {
      icon: CheckCircle,
      text: "Win a free eBook or anthology feature — across borders",
      delay: 0.2,
    },
  ],
};
