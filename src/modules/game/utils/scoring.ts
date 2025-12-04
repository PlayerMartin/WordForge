import { GAME_SCORING, GAME_TIMERS } from '@/modules/game/config/constants';
import { type GameMode } from '@/types';

export const getLengthModeScore = (word: string): number => {
	const trimmed = word.trim();
	const length = trimmed.length;
	if (length === 0) return 0;

	return Math.floor((length * length) / GAME_SCORING.LENGTH_DIVISOR);
};

export const getTempoModeScore = (timeTaken: number): number =>
	(GAME_TIMERS.DEFAULT_TURN_TIME - timeTaken) *
	GAME_SCORING.TEMPO_POINTS_PER_WORD;

export const getScoreForWord = (
	scoringMode: GameMode,
	word: string,
	timeTaken?: number
): number => {
	switch (scoringMode) {
		case 'solo_length':
			return getLengthModeScore(word);
		case 'solo_tempo':
			if (timeTaken !== undefined) {
				return getTempoModeScore(timeTaken);
			}
			return -10000;
		case 'solo_hidden':
			// TODO
			return 0;
		case 'solo_challenge_contain_part':
			// TODO
			return 0;
		default:
			return 0;
	}
};
