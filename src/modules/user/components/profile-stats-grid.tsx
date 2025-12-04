import { Card } from '@/components/ui';

type ProfileStatsGridProps = {
	gamesPlayed: number;
	totalScore: number;
	totalWords: number;
	bestScore: number;
};

const ProfileStatsGrid = ({
	gamesPlayed,
	totalScore,
	totalWords,
	bestScore
}: ProfileStatsGridProps) => (
	<>
		<h2 className="mb-4 text-xl font-bold text-surface-900">Statistics</h2>
		<div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
			<Card className="text-center">
				<p className="text-3xl font-bold text-primary-600">
					{gamesPlayed}
				</p>
				<p className="text-sm text-surface-500">Games Played</p>
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
				<p className="text-sm text-surface-500">Words Used</p>
			</Card>
			<Card className="text-center">
				<p className="text-3xl font-bold text-warning-600">
					{bestScore}
				</p>
				<p className="text-sm text-surface-500">Best Score</p>
			</Card>
		</div>
	</>
);

export default ProfileStatsGrid;
