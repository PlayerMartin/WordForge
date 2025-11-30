// modules/game/utils/validation.ts
import { GAME_RULES } from "@/modules/game/config/constants";
import { WordValidationResult } from "@/types/game";

export const normalizeWord = (input: string): string =>
  input.trim().toLowerCase();

export const validateWordLocally = (params: {
  rawInput: string;
  requiredLetter: string;
  usedWords: string[]; 
}): WordValidationResult => {
  const normalized = normalizeWord(params.rawInput);

  if (!normalized) {
    return {
      valid: false,
      error: "too_short",
      message: "Please enter a word.",
    };
  }

  const required = params.requiredLetter.toLowerCase();

  if (!normalized.startsWith(required)) {
    return {
      valid: false,
      error: "wrong_letter",
      message: `Word must start with "${params.requiredLetter}"`,
    };
  }

  if (normalized.length < GAME_RULES.MIN_WORD_LENGTH) {
    return {
      valid: false,
      error: "too_short",
      message: `Word must be at least ${GAME_RULES.MIN_WORD_LENGTH} characters`,
    };
  }

  if (params.usedWords.includes(normalized)) {
    return {
      valid: false,
      error: "already_used",
      message: "Word already used!",
    };
  }

  return { valid: true };
};
