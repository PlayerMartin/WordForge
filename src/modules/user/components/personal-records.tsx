import { GetRecentGamesForUser } from '@/actions/game-actions';
import { StatCard } from '@/components/ui';
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
				<StatCard
					value={longestWord}
					label="Longest Word"
					size="sm"
					colorClass="default"
				/>
				<StatCard
					value={mostWordsInGame}
					label="Most Words in Game"
					size="sm"
					colorClass="default"
				/>
				<StatCard
					value={averageWordsPerGame}
					label="Average Words per Game"
					size="sm"
					colorClass="default"
				/>
				<StatCard
					value={averageScorePerGame}
					label="Average Score per Game"
					size="sm"
					colorClass="default"
				/>
			</div>
		</div>
	);
};

export default PersonalRecords;
