import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";

import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication functions
interface UserCredentialResponse {
  user: import("firebase/auth").User | null;
  error: string | null;
}

export interface WeeklyContestEntry {
  themeTitle: string;
  themePrompt: string;
  userName: string;
  userEmail: string;
  userStoryTitle: string;
  userStoryContent: string;
  userStoryGenre: string;
  userCity?: string; // Optional field
  submittedAt: Timestamp;
  weekNumber: "week-1" | "week-2" | "week-3";
}

interface AuthCallback {
  (user: import("firebase/auth").User | null): void;
}

interface ResetPasswordResponse {
  error: string | null;
}

export const signUp = async (
  email: string,
  password: string,
  username:string
): Promise<UserCredentialResponse> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      
    );
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signIn = async (
  email: string,
  password: string
): Promise<UserCredentialResponse> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const resetPassword = async (
  email: string
): Promise<ResetPasswordResponse> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

// Auth state observer hook
export const useAuth = (callback: AuthCallback): void => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export const weeklyContestDB = {
  // Check how many submissions a user has made for a specific week
  async getUserSubmissionCount(
    weekNumber: "week-1" | "week-2" | "week-3",
    userEmail: string
  ): Promise<{ count: number; error?: any }> {
    try {
      const q = query(
        collection(db, "weekly-contests", weekNumber, "entries"),
        where("userEmail", "==", userEmail)
      );

      const querySnapshot = await getDocs(q);
      return { count: querySnapshot.size };
    } catch (error) {
      console.error("Error getting user submission count: ", error);
      return { count: 0, error };
    }
  },

  // Get total entries across all weeks
  async getTotalEntries(): Promise<{ totalEntries: number; error?: any }> {
    try {
      const weeks: ("week-1" | "week-2" | "week-3")[] = [
        "week-1",
        "week-2",
        "week-3",
      ];
      let totalEntries = 0;

      for (const week of weeks) {
        const querySnapshot = await getDocs(
          collection(db, "weekly-contests", week, "entries")
        );
        totalEntries += querySnapshot.size;
      }

      return { totalEntries };
    } catch (error) {
      console.error("Error getting total entries: ", error);
      return { totalEntries: 0, error };
    }
  },

  async getTotalAuthors(): Promise<{ totalAuthors: number; error?: any }> {
    try {
      const weeks: ("week-1" | "week-2" | "week-3")[] = [
        "week-1",
        "week-2",
        "week-3",
      ];

      const uniqueEmails = new Set<string>();

      for (const week of weeks) {
        const querySnapshot = await getDocs(
          collection(db, "weekly-contests", week, "entries")
        );

        querySnapshot.forEach((doc) => {
          const data = doc.data() as WeeklyContestEntry;
          uniqueEmails.add(data.userEmail);
        });
      }

      return { totalAuthors: uniqueEmails.size };
    } catch (error) {
      console.error("Error getting total authors: ", error);
      return { totalAuthors: 0, error };
    }
  },

  async submitEntry(
    weekNumber: "week-1" | "week-2" | "week-3",
    entryData: Omit<WeeklyContestEntry, "submittedAt" | "weekNumber">
  ) {
    try {
      // Check submission limit first
      const submissionCheck = await this.getUserSubmissionCount(
        weekNumber,
        entryData.userEmail
      );

      if (submissionCheck.error) {
        return {
          success: false,
          error: "Failed to check submission count",
          details: submissionCheck.error,
        };
      }

      if (submissionCheck.count >= 3) {
        return {
          success: false,
          error:
            "Maximum submission limit reached. You can only submit 3 stories per week.",
          limitReached: true,
        };
      }

      const entry: WeeklyContestEntry = {
        ...entryData,
        weekNumber,
        submittedAt: Timestamp.now(),
      };

      const docRef = await addDoc(
        collection(db, "weekly-contests", weekNumber, "entries"),
        entry
      );

      console.log("Entry submitted successfully with ID: ", docRef.id);
      return {
        success: true,
        id: docRef.id,
        submissionCount: submissionCheck.count + 1,
      };
    } catch (error) {
      console.error("Error submitting entry: ", error);
      return { success: false, error };
    }
  },

  async initializeWeekStructure() {
    try {
      const weeks: ("week-1" | "week-2" | "week-3")[] = [
        "week-1",
        "week-2",
        "week-3",
      ];

      for (const week of weeks) {
        await setDoc(doc(db, "weekly-contests", week), {
          createdAt: Timestamp.now(),
          weekNumber: week,
          description: `Weekly writing contest - ${week}`,
          isActive: true,
        });
      }

      return { success: true };
    } catch (error) {
      console.error("Error initializing week structure: ", error);
      return { success: false, error };
    }
  },
};

export { auth, db };
