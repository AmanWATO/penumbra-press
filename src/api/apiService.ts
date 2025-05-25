/* eslint-disable @typescript-eslint/no-explicit-any */

import { Quote } from "./apiTypes";

const apiUrl = "https://cms-dev.penumbrapenned.com/api";

export const fetchQuotes = async (): Promise<Quote[]> => {
  try {
    const res = await fetch(`${apiUrl}/quotes`, {
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
