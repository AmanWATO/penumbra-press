import { db, WeeklyContestEntry } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const apiUrl = "https://cms-dev.penumbrapenned.com/api";

function normalizeString(input: string | null | undefined): string {
  return (input || "").trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Get all existing entries from Strapi to avoid duplicates
 */
async function getExistingStrapiEntries(): Promise<Set<string>> {
  try {
    // Get total count first
    const countResponse = await fetch(`${apiUrl}/weekly-contests?pagination[limit]=1`);
    if (!countResponse.ok) return new Set();
    
    const countData = await countResponse.json();
    const total = countData.meta?.pagination?.total || 0;
    
    // Fetch all entries with higher limit
    const response = await fetch(
      `${apiUrl}/weekly-contests?pagination[limit]=${Math.max(total + 50, 2000)}&sort=id:asc`
    );
    
    if (!response.ok) return new Set();

    const data = await response.json();
    const existingEntries = new Set<string>();

    data.data?.forEach((entry: any) => {
      // Create multiple possible key formats to catch variations
      const email = normalizeString(entry.attributes.authorEmail);
      const title = normalizeString(entry.attributes.storyTitle);
      const week = entry.attributes.weekNumber;
      
      // Add multiple key formats
      existingEntries.add(`${email}_${title}_${week}`);
      existingEntries.add(`${email}|${title}|${week}`);
      
      // Also add a hash-based key for exact matching
      const exactKey = `${entry.attributes.authorEmail || ''}_${entry.attributes.storyTitle || ''}_${week}`;
      existingEntries.add(exactKey.toLowerCase().trim());
    });

    return existingEntries;
  } catch (error) {
    return new Set();
  }
}

/**
 * Check if entry exists using multiple key formats
 */
function entryExists(existingEntries: Set<string>, firebaseEntry: WeeklyContestEntry): boolean {
  const email = normalizeString(firebaseEntry.userEmail);
  const title = normalizeString(firebaseEntry.userStoryTitle);
  const week = firebaseEntry.weekNumber;
  
  // Check multiple key formats
  const keys = [
    `${email}_${title}_${week}`,
    `${email}|${title}|${week}`,
    `${(firebaseEntry.userEmail || '').toLowerCase().trim()}_${(firebaseEntry.userStoryTitle || '').toLowerCase().trim()}_${week}`
  ];
  
  return keys.some(key => existingEntries.has(key));
}

/**
 * Get all Firebase entries and sync missing ones to Strapi
 */
export async function syncFirebaseToStrapi(): Promise<{
  added: number;
  skipped: number;
}> {
  const weeks: ("week-1" | "week-2" | "week-3")[] = [
    "week-1",
    "week-2", 
    "week-3",
  ];

  // Get existing entries from Strapi
  const existingEntries = await getExistingStrapiEntries();

  let added = 0;
  let skipped = 0;

  for (const week of weeks) {
    try {
      // Get Firebase entries for this week
      const querySnapshot = await getDocs(
        collection(db, "weekly-contests", week, "entries")
      );

      for (const doc of querySnapshot.docs) {
        const firebaseEntry = doc.data() as WeeklyContestEntry;

        // Skip if already exists in Strapi using multiple key checks
        if (entryExists(existingEntries, firebaseEntry)) {
          skipped++;
          continue;
        }

        // Add to Strapi
        try {
          const strapiEntry = {
            authorName: firebaseEntry.userName || '',
            storyTitle: firebaseEntry.userStoryTitle || '',
            storyContent: firebaseEntry.userStoryContent || '',
            Type: "Non-Selected",
            authorEmail: firebaseEntry.userEmail || '',
            authorCityName: firebaseEntry.userCity || '',
            themeTitle: firebaseEntry.themeTitle || '',
            themePrompt: firebaseEntry.themePrompt || '',
            storyGenre: firebaseEntry.userStoryGenre || '',
            weekNumber: firebaseEntry.weekNumber,
          };

          const response = await fetch(`${apiUrl}/weekly-contests`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: strapiEntry }),
          });

          if (response.ok) {
            added++;
            // Add the new entry to our existing entries set to prevent duplicates in same sync
            const newEntryKey = `${normalizeString(firebaseEntry.userEmail)}_${normalizeString(firebaseEntry.userStoryTitle)}_${firebaseEntry.weekNumber}`;
            existingEntries.add(newEntryKey);
          }
        } catch (error) {
          // Silent fail for individual entries
        }
      }
    } catch (error) {
      // Silent fail for individual weeks
    }
  }

  return { added, skipped };
}