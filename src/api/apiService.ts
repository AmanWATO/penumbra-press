import { Quote, WeeklyContestEntry } from "./apiTypes";

const strapiUrl = "https://cms-dev.penumbrapenned.com/api";

export const fetchQuotes = async (): Promise<Quote[]> => {
  try {
    const res = await fetch(`${strapiUrl}/quotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch quotes: ${res.statusText}`);
    }

    const data = await res.json();

    return (
      data?.data?.map((item: any) => ({
        title: item.title,
        explanation: item.explanation,
        genre: item.genre,
      })) || []
    );
  } catch (error) {
    console.error("[fetchQuotes] Error:", error);
    return [];
  }
};

export const fetchWeeklyContestEntries = async (): Promise<
  WeeklyContestEntry[]
> => {
  try {
    const endpoint = `${strapiUrl}/weekly-contests?populate=*&pagination[limit]=1000`

    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch weekly contest entries: ${res.statusText}`
      );
    }

    const data = await res.json();

    return (
      data?.data?.map((item: WeeklyContestEntry) => ({
        id: item.id,
        title: item.title,
        author_name: item.author_name,
        author_email: item.author_email,
        city: item.city,
        theme: item.theme,
        genre: item.genre,
        content: item.content,
        judge_notes: item.judge_notes,
        spotlight_rank: item.spotlight_rank,
        is_winner: item.is_winner,
        created_at: item.created_at,
        weekNumber: item.weekNumber
      })) || []
    );
  } catch (error) {
    console.error("[fetchWeeklyContestEntries] Error:", error);
    return [];
  }
};

export const fetchWeeklyContestStats = async () => {
  try {
    const entries = await fetchWeeklyContestEntries();

    const uniqueEmails = new Set(entries.map((entry) => entry.author_email));
    const uniqueAuthors = new Set(
      entries.map((entry) => entry.author_name.toLowerCase())
    );

    return {
      totalEntries: entries.length,
      uniqueEntries: uniqueEmails.size,
      uniqueAuthors: uniqueAuthors.size,
      winners: entries.filter((entry) => entry.is_winner),
      topFive: entries
        .filter(
          (entry) => entry.spotlight_rank && entry.spotlight_rank !== "NONE"
        )
        .sort((a, b) => {
          // Fixed: Use uppercase keys to match the actual data
          const rankOrder = {
            FIRST: 1,
            SECOND: 2,
            THIRD: 3,
            FOURTH: 4,
            FIFTH: 5,
          };
          const aRank =
            rankOrder[a.spotlight_rank as keyof typeof rankOrder] || 6;
          const bRank =
            rankOrder[b.spotlight_rank as keyof typeof rankOrder] || 6;
          return aRank - bRank;
        }),
      allEntries: entries,
    };
  } catch (error) {
    console.error("[fetchWeeklyContestStats] Error:", error);
    return {
      totalEntries: 0,
      uniqueEntries: 0,
      uniqueAuthors: 0,
      winners: [],
      topFive: [],
      allEntries: [],
    };
  }
};
