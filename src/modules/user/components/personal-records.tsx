import { GetRecentGamesForUser } from '@/actions/game-actions';
import { Card } from '@/components/ui';
import { type DbGame } from '@/types';

import {
	getLongestWord,
	getAverageScorePerGame,
	getAverageWPG,
	getMostWordsInGame
} from '../utils/calc-records';

const PersonalRecords = async ({
	userId,
	language
}: {
	userId: string;
	language: string;
}) => {
	const games = (await GetRecentGamesForUser(
		userId,
		Number.MAX_SAFE_INTEGER
	)) as DbGame[];

	const filtered = games.filter(g => g.language === language);

	const longestWord = getLongestWord(filtered);
	const mostWordsInGame = getMostWordsInGame(filtered);
	const averageWordsPerGame = getAverageWPG(filtered);
	const averageScorePerGame = getAverageScorePerGame(filtered);

	return (
		<div>
			<h2 className="mb-2 text-xl font-bold">
				Personal Records - {language}
			</h2>
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
