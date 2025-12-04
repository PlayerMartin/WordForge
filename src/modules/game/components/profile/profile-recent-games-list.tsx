import Link from 'next/link';

import { Card, Button } from '@/components/ui';
import { type DbGame } from '@/types/game';

type ProfileRecentGamesListProps = {
	games: DbGame[];
};

const ProfileRecentGamesList = ({ games }: ProfileRecentGamesListProps) => {
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
		<Card>
			<div className="divide-y divide-surface-200">
				{games.map(game => {
					const started = game.startedAt
						? game.startedAt instanceof Date
							? game.startedAt.toLocaleString()
							: new Date(game.startedAt).toLocaleString()
						: 'Unknown';

					const status = game.finishedAt ? 'Finished' : 'Active';

					return (
						<div
							key={game.id}
							className="flex items-center justify-between px-2 py-3 text-sm"
						>
							<div>
								<p className="font-medium text-surface-900">
									Mode:{' '}
									<span className="uppercase">
										{game.mode}
									</span>
								</p>
								<p className="text-xs text-surface-500">
									Started: {started}
								</p>
							</div>
							<div className="flex items-center gap-3">
								<span
									className={`rounded-full px-2 py-1 text-xs ${
										game.finishedAt
											? 'bg-success-50 text-success-600'
											: 'bg-warning-50 text-warning-600'
									}`}
								>
									{status}
								</span>
								<span className="text-sm font-semibold text-primary-600">
									Score: {game.score}
								</span>
								{!game.finishedAt && (
									<Link href={`/game/${game.id}`}>
										<Button size="sm" variant="ghost">
											Continue
										</Button>
									</Link>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</Card>
	);
};

export default ProfileRecentGamesList;
