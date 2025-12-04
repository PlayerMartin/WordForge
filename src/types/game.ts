import { games } from "@/lib/db/schema";
import { GameDbMode } from "@/modules/game/config/modes";
import { LanguageCode } from "@/modules/game/config/constants";

export type GameMode = GameDbMode;
export type Language = LanguageCode;

export interface GameSettings {
  mode: GameMode;
  language: Language;
}

export type DbGameRow = typeof games.$inferSelect;

export interface DbGame extends DbGameRow {
  mode: GameMode;
  language: Language;
}

export interface WordValidationResult {
  valid: boolean;
  error?: "wrong_letter" | "not_in_dictionary" | "already_used" | "too_short";
  message?: string;
}
