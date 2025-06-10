export interface Theme {
  id: string;
  title: string;
  description: string;
  prompt: string;
  icon: string;
  color: string;
}

export interface WeekData {
  week: string;
  dateRange: string;
  themes: Theme[];
}

export interface FormData {
  name: string;
  email: string;
  title: string;
  content: string;
  genre: string;
  city: string;
  theme: string;
  type: string;
  createdAt: string;
}

export interface WeeklyChallengeHubProps {
  onSelectTheme: (theme: Theme) => void;
  selectedWeek?: WeekData | null;
}

export interface WeeklyChallengeFormProps {
  selectedTheme: Theme;
  onBack: () => void;
}