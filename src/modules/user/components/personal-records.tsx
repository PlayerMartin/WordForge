import { GetRecentGamesForUser } from '@/actions/game-actions';
import { Card } from '@/components/ui';
import { type DbGame } from '@/types';

const getLongestWord = (games: DbGame[]): string =>
	games.reduce((longest, g) => {
		const words = Array.isArray(g.wordsUsed) ? g.wordsUsed : [];
		for (const w of words) {
			if (w.length > longest.length) longest = w;
		}
		return longest;
	}, '???');

const getMostWordsInGame = (games: DbGame[]): number =>
	games.reduce((max, g) => Math.max(max, g.wordsUsed?.length ?? 0), 0);

const getAverageWPG = (games: DbGame[]): number => {
	if (games.length === 0) return 0;

	const total = games.reduce((sum, g) => sum + (g.wordsUsed?.length ?? 0), 0);

	return Math.round(total / games.length);
};

const getAverageScorePerGame = (games: DbGame[]): number => {
	if (games.length === 0) return 0;

	const total = games.reduce((sum, g) => sum + (g.score ?? 0), 0);

	return Math.round(total / games.length);
};

const PersonalRecords = async ({ userId }: { userId: string }) => {
	const games = (await GetRecentGamesForUser(
		userId,
		Number.MAX_SAFE_INTEGER
	)) as DbGame[];

	// TODO - prepinani jazyku a podle toho menit
	const longestWord = getLongestWord(games.filter(g => g.language === 'en'));
	const mostWordsInGame = getMostWordsInGame(
		games.filter(g => g.language === 'en')
	);
	const averageWordsPerGame = getAverageWPG(
		games.filter(g => g.language === 'en')
	);
	const averageScorePerGame = getAverageScorePerGame(
		games.filter(g => g.language === 'en')
	);

	return (
		<div>
			<h2 className="mb-2 text-xl font-bold">Personal Records</h2>
			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<p className="text-sm text-surface-500">Longest Word</p>
					<p className="text-lg font-semibold">{longestWord}</p>
				</Card>
				<Card>
					<p className="text-sm text-surface-500">
						Most Words in Game
					</p>
					<p className="text-lg font-semibold">{mostWordsInGame}</p>
				</Card>
				<Card>
					<p className="text-sm text-surface-500">
						Average Words per Game
					</p>
					<p className="text-lg font-semibold">
						{averageWordsPerGame}
					</p>
				</Card>
				<Card>
					<p className="text-sm text-surface-500">
						Average Score per Game
					</p>
					<p className="text-lg font-semibold">
						{averageScorePerGame}
					</p>
				</Card>
			</div>
		</div>
	);
};

export default PersonalRecords;
