
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
  created_at?: string;
  weekNumber?: 'FIRST' | 'SECOND' | 'THIRD'
}

export interface WeeklyContestStats {
  winners: WeeklyContestEntry[];
  allEntries: WeeklyContestEntry[];
}