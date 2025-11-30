// modules/game/core/engine.ts
import { DbGame } from "@/types/game";
import { getLengthModeScore } from "../utils/scoring";
import { normalizeWord } from "../utils/validation";

export type GameSnapshot = {
  id: string;
  mode: DbGame["mode"];
  score: number;
  wordsUsed: string[];
  currentLetter: string;
};

export const createSnapshotFromDb = (game: DbGame): GameSnapshot => {
  const words = Array.isArray(game.wordsUsed) ? game.wordsUsed : [];
  const last = words[words.length - 1];
  const currentLetter = last ? last.slice(-1).toUpperCase() : "A";

  return {
    id: game.id,
    mode: game.mode,
    score: game.score ?? 0,
    wordsUsed: words,
    currentLetter,
  };
};

export const applyWord = (state: GameSnapshot, rawInput: string): GameSnapshot => {
  const word = normalizeWord(rawInput);
  const newScore = state.score + getLengthModeScore(word);
  const newWords = [...state.wordsUsed, word];
  const newLetter = word.slice(-1).toUpperCase();

  return {
    ...state,
    score: newScore,
    wordsUsed: newWords,
    currentLetter: newLetter,
  };
};
