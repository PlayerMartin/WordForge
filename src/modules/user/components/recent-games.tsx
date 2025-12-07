import Link from 'next/link';

import { GetRecentGamesForUser } from '@/actions/game-actions';
import { type DbGame } from '@/types/game';
import { Button, Card } from '@/components/ui';

const RecentGames = async ({ userId }: { userId: string }) => {
	const games = (await GetRecentGamesForUser(userId, 10)) as DbGame[];

	if (games.length === 0) {
		return (
			<Card>
				<div className="py-8 text-center text-surface-500">
					<p>No games played yet</p>
					<Link href="/">
						<Button className="mt-4">Play Your First Game</Button>
					</Link>
				</div>
			</Card>
		);
	}

	return (
		<div>
			<h2 className="mb-2 text-xl font-bold">Recent Games</h2>
			<Card padding="sm">
				<div className="divide-y divide-surface-200">
					{games.map(game => (
						<div
							key={game.id}
							className="flex items-center justify-between gap-4 px-3 py-3 text-sm"
						>
							<div>
								<p className="text-md font-bold">
									Mode:{' '}
									<span className="uppercase">
										{game.mode}
									</span>
								</p>
								<p className="text-xs text-surface-500">
									Finished:{' '}
									{game.finishedAt
										? game.finishedAt.toLocaleString()
										: 'Unknown'}
								</p>
							</div>
							<div className="flex items-center justify-between gap-6">
								<span className="text-md font-bold text-primary-600">
									Score: {game.score}
								</span>
								<span className="text-md font-bold text-surface-500">
									Words used: {game.wordsUsed?.length}
								</span>
								<span className="rounded-full bg-secondary-100 px-2 py-2 text-xs">
									{game.language}
								</span>
								<span
									className={`rounded-full px-2 py-2 text-xs ${
										game.finishedAt
											? 'bg-success-100 text-success-600'
											: 'bg-warning-100 text-warning-600'
									}`}
								>
									{game.finishedAt ? 'Finished' : 'DNF'}
								</span>
							</div>
						</div>
					))}
				</div>
			</Card>
		</div>
	);
};

export default RecentGames;
