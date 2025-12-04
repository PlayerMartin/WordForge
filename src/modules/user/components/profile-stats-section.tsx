import { GetRecentGamesForUser } from '@/actions/game-actions';
import { type DbGame } from '@/types/game';
import { Card } from '@/components/ui';

import ProfileHeaderCard from './profile-header-card';
import ProfileStatsGrid from './profile-stats-grid';

type ProfileStatsSectionProps = {
	userId: string;
	userName: string | null;
	userEmail: string | null;
};

const ProfileStatsSection = async ({
	userId,
	userName,
	userEmail
}: ProfileStatsSectionProps) => {
	const games = (await GetRecentGamesForUser(userId, 50)) as DbGame[];

	const gamesPlayed = games.length;
	const totalScore = games.reduce((sum, g) => sum + (g.score ?? 0), 0);
	const bestScore = games.reduce((max, g) => Math.max(max, g.score ?? 0), 0);
	const totalWords = games.reduce((sum, g) => {
		const words = Array.isArray(g.wordsUsed) ? g.wordsUsed : [];
		return sum + words.length;
	}, 0);

	return (
		<>
			<ProfileHeaderCard name={userName} email={userEmail} />
			<ProfileStatsGrid
				gamesPlayed={gamesPlayed}
				totalScore={totalScore}
				totalWords={totalWords}
				bestScore={bestScore}
			/>

			{/* Placeholder "Personal Records" for now */}
			<h2 className="mb-4 text-xl font-bold text-surface-900">
				Personal Records
			</h2>
			<div className="mb-8 grid gap-4 md:grid-cols-2">
				<Card>
					<p className="text-sm text-surface-500">Longest Word</p>
					<p className="text-lg font-semibold text-surface-900">-</p>
				</Card>
				<Card>
					<p className="text-sm text-surface-500">
						Most Words in Game
					</p>
					<p className="text-lg font-semibold text-surface-900">0</p>
				</Card>
				<Card>
					<p className="text-sm text-surface-500">Average WPM</p>
					<p className="text-lg font-semibold text-surface-900">0</p>
				</Card>
				<Card>
					<p className="text-sm text-surface-500">Accuracy</p>
					<p className="text-lg font-semibold text-surface-900">0%</p>
				</Card>
			</div>
		</>
	);
};

export default ProfileStatsSection;
