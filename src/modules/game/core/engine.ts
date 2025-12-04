import { type DbGame, type Language } from '@/types/game';

import { getScoreForWord } from '../utils/scoring';
import { normalizeWord } from '../utils/validation';
import { generateChallengePart } from '../config/challange-parts';

export type GameSnapshot = {
	id: string;
	mode: DbGame['mode'];
	language: Language;
	score: number;
	wordsUsed: string[];
	currentLetter: string;
	challengePart: string | null;
};

export const createSnapshotFromDb = (game: DbGame): GameSnapshot => {
	const words = Array.isArray(game.wordsUsed) ? game.wordsUsed : [];
	const last = words[words.length - 1];
	const currentLetter = last ? last.slice(-1).toUpperCase() : 'A';

	const challengePart =
		game.mode === 'solo_challenge_contain_part'
			? generateChallengePart()
			: null;

	return {
		id: game.id,
		mode: game.mode,
		language: game.language,
		score: game.score ?? 0,
		wordsUsed: words,
		currentLetter: currentLetter,
		challengePart: challengePart
	};
};

export const applyWord = (
	state: GameSnapshot,
	rawInput: string,
	timeTaken?: number
): GameSnapshot => {
	const word = normalizeWord(rawInput);
	const newScore = state.score + getScoreForWord(state.mode, word, timeTaken);
	const newWords = [...state.wordsUsed, word];
	const newLetter = word.slice(-1).toUpperCase();

	return {
		...state,
		score: newScore,
		wordsUsed: newWords,
		currentLetter: newLetter
	};
};
