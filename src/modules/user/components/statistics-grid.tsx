import { GetRecentGamesForUser } from '@/actions/game-actions';
import { Card } from '@/components/ui';
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
				<Card className="text-center">
					<p className="text-3xl font-bold text-primary-600">
						{gamesPlayed}
					</p>
					<p className="text-sm text-surface-500">
						Total Games Played
					</p>
				</Card>
				<Card className="text-center">
					<p className="text-3xl font-bold text-secondary-600">
						{totalScore}
					</p>
					<p className="text-sm text-surface-500">Total Score</p>
				</Card>
				<Card className="text-center">
					<p className="text-3xl font-bold text-accent-600">
						{totalWords}
					</p>
					<p className="text-sm text-surface-500">Total Words Used</p>
				</Card>
				<Card className="text-center">
					<p className="text-3xl font-bold text-warning-600">
						{bestScore}
					</p>
					<p className="text-sm text-surface-500">Best Score</p>
				</Card>
			</div>
		</div>
	);
};

export default StatisticsGrid;
