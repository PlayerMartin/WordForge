import { type DbGame } from '@/types';

export const getLongestWord = (games: DbGame[]): string =>
	games.reduce((longest, g) => {
		const words = Array.isArray(g.wordsUsed) ? g.wordsUsed : [];
		for (const w of words) {
			if (w.length > longest.length) longest = w;
		}
		return longest;
	}, '???');

export const getMostWordsInGame = (games: DbGame[]): number =>
	games.reduce((max, g) => Math.max(max, g.wordsUsed?.length ?? 0), 0);

export const getAverageWPG = (games: DbGame[]): number => {
	if (games.length === 0) return 0;

	const total = games.reduce((sum, g) => sum + (g.wordsUsed?.length ?? 0), 0);

	return Math.round(total / games.length);
};

export const getAverageScorePerGame = (games: DbGame[]): number => {
	if (games.length === 0) return 0;

	const total = games.reduce((sum, g) => sum + (g.score ?? 0), 0);

	return Math.round(total / games.length);
};
