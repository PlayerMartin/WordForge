import { GetRecentGamesForUser } from '@/actions/game-actions';
import { StatCard } from '@/components/ui';
import { type DbGame } from '@/types';

const StatisticsGrid = async ({ userId }: { userId: string }) => {
	const games = (await GetRecentGamesForUser(userId, 50)) as DbGame[];

	const gamesPlayed = games.length;
	const totalScore = games.reduce((sum, g) => sum + (g.score ?? 0), 0);
	const bestScore = games.reduce((max, g) => Math.max(max, g.score ?? 0), 0);
	const totalWords = games.reduce((sum, g) => {
		const words = Array.isArray(g.wordsUsed) ? g.wordsUsed : [];
		return sum + words.length;
	}, 0);

	return (
		<div>
			<h2 className="mb-2 text-xl font-bold">Statistics</h2>
			<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
				<StatCard
					value={gamesPlayed}
					label="Total Games Played"
					colorClass="primary"
				/>
				<StatCard
					value={totalScore}
					label="Total Score"
					colorClass="secondary"
				/>
				<StatCard
					value={totalWords}
					label="Total Words Used"
					colorClass="accent"
				/>
				<StatCard
					value={bestScore}
					label="Best Score"
					colorClass="warning"
				/>
			</div>
		</div>
	);
};

export default StatisticsGrid;
