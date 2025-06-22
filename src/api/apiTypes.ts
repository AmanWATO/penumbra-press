
export interface Quote {
  title: string;
  explanation: string;
  genre: string;
}

export interface WeeklyContestEntry {
  id: number;
  title: string;
  author_name: string;
  author_email: string;
  city: string;
  theme: string;
  genre: string;
  content: string; // Rich text content
  judge_notes?: string;
  spotlight_rank: 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH' | 'FIFTH' | 'NONE' | null;
  is_winner: boolean;
  week?: number;
  created_at?: string;
}

export interface WeeklyContestStats {
  totalEntries: number;
  uniqueEntries: number;
  uniqueAuthors: number;
  winners: WeeklyContestEntry[];
  topFive: WeeklyContestEntry[];
  allEntries: WeeklyContestEntry[];
}