import { GetRecentGamesForUser } from '@/actions/gameActions';
import { type DbGame } from '@/types/game';

import ProfileRecentGamesList from './profile-recent-games-list';

type RecentGamesSectionProps = {
	userId: string;
};

const RecentGamesSection = async ({ userId }: RecentGamesSectionProps) => {
	const games = (await GetRecentGamesForUser(userId, 10)) as DbGame[];

	return (
		<>
			<h2 className="mb-4 text-xl font-bold text-surface-900">
				Recent Games
			</h2>
			<ProfileRecentGamesList games={games} />
		</>
	);
};

export default RecentGamesSection;
