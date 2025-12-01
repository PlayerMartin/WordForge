// types/game.ts
// ============================================
// GAME TYPES - Typy pre hernú logiku
// ============================================

import { games } from "@/lib/db/schema";
import { GameDbMode } from "@/modules/game/config/modes";
import { LanguageCode } from "@/modules/game/config/constants";

export type GameMode = GameDbMode;
export type Language = LanguageCode;

// = Herné nastavenia (čo ukladáme do games) =
export interface GameSettings {
  mode: GameMode;
  language: Language;
}

// = Surový typ z Drizzle (presne podľa games schema) =
export type DbGameRow = typeof games.$inferSelect;

// = DbGame - row z DB s úzkym typovaním pre enumy =
export interface DbGame extends DbGameRow {
  mode: GameMode;
  language: Language;
}

// = Jedno slovo v hre =
export interface GameWord {
  word: string;
  length: number;
  points: number;
  timestamp: number;
}

// = Stav hry (runtime, klient) =
export interface GameState {
  settings: GameSettings;

  status: "setup" | "playing" | "paused" | "finished";
  score: number;
  lives: number | null;
  wordsUsed: GameWord[];
  requiredLetter: string;

  turnTimeLeft: number;
  globalTimeLeft: number;

  lastFeedback: GameFeedback | null;

  successfulAttempts: number;
  totalAttempts: number;
  startTime: number | null;
  endTime: number | null;
}

// = Feedback pre hráča =
export interface GameFeedback {
  type: "success" | "error" | "warning";
  message: string;
  timestamp: number;
}

// = Výsledky hry =
export interface GameResults {
  score: number;
  wordCount: number;
  longestWord: string | null;
  averageLength: number;
  wpm: number;
  accuracy: number;
  wordsUsed: GameWord[];
}

// = Validačný výsledok =
export interface WordValidationResult {
  valid: boolean;
  error?: "wrong_letter" | "not_in_dictionary" | "already_used" | "too_short";
  message?: string;
}
