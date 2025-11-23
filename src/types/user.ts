// ============================================
// USER TYPES - Typy pre používateľov
// ============================================
//
// Sem patria typy pre používateľa, profil, štatistiky

import z from "zod";
import { Language } from "./game";

// = Verejný profil používateľa (zobrazený na rebríčku) =
export interface PublicUserProfile {
  id: string;
  username: string | null;
  image: string | null; // avatar URL
}

// = Úplný používateľský profil =
export interface UserProfile extends PublicUserProfile {
  email: string | null;
  createdAt: Date;
}

// = Štatistiky používateľa pre jeden jazyk =
export interface UserLanguageStats {
  language: Language;
  totalGames: number;
  totalWords: number;
  totalScore: number;
  longestWord: string | null;
  longestWordLength: number;
  averageWordLength: number;
  averageWpm: number;
  averageAccuracy: number;
  updatedAt: Date;
}

// = Osobné rekordy =
export interface PersonalBest {
  mode: string;
  scoringMode: string;
  visibilityMode: string;
  language: Language;
  score: number;
  wordCount: number;
  longestWord: string | null;
  achievedAt: Date;
}

export const userSignupSchema = z
  .object({
    name: z.string().min(3, "Username must be longer than 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password must be at least 3 characters"),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    path: ["password2"],
    message: "Passwords do not match",
  });

export type UserSignupData = z.infer<typeof userSignupSchema>;

export const userSigninSchema = z.object({
  name: z.string().min(3, "Username must be longer than 2 characters"),
  password: z.string().min(3, "Password must be at least 3 characters"),
});

export type UserSigninData = z.infer<typeof userSigninSchema>;

export type User = {
  name: string;
  email: string;
  password: string;
};
