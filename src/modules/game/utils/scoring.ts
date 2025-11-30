// modules/game/utils/scoring.ts
import { GAME_SCORING } from "@/modules/game/config/constants";
import { ScoringMode } from "@/modules/game/config/modes";


export const getLengthModeScore = (word: string): number => {
  const trimmed = word.trim();
  const length = trimmed.length;
  if (length === 0) return 0;

  return Math.floor((length * length) / GAME_SCORING.LENGTH_DIVISOR);
};


export const getTempoModeScore = (params: {}): number => {
  return GAME_SCORING.TEMPO_POINTS_PER_WORD;
};


export const getScoreForWord = (
  scoringMode: ScoringMode,
  word: string
): number => {
  switch (scoringMode) {
    case "length":
      return getLengthModeScore(word);
    case "tempo":
      return getTempoModeScore({});
    default:
      return 0;
  }
};
