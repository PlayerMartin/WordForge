import { getServerSession } from 'next-auth';

import {
	GetLeaderboard,
	GetUserRankAndEntry
} from '@/actions/leaderboard-actions';
import { type LeaderboardEntry, type Language } from '@/types';
import { type GameModeId } from '@/modules/game/config/modes';
import { authOptions } from '@/lib/auth/authOptions';

import LeaderboardTable from './leaderboard-table';
import LeaderboardUserPosition from './leaderboard-user-position';

type LeaderboardSectionProps = {
	mode: GameModeId;
	language: Language;
};

const LeaderboardSection = async ({
	mode,
	language
}: LeaderboardSectionProps) => {
	const [entries, session] = await Promise.all([
		GetLeaderboard(mode, language, 10) as Promise<LeaderboardEntry[]>,
		getServerSession(authOptions)
	]);

	const currentUserId = session?.user?.id;
	const isUserInTop10 = entries.some(entry => entry.userId === currentUserId);

	let userRankEntry = null;
	if (currentUserId && !isUserInTop10) {
		userRankEntry = await GetUserRankAndEntry(
			currentUserId,
			mode,
			language
		);
	}

	return (
		<>
			<LeaderboardTable entries={entries} currentUserId={currentUserId} />
			{userRankEntry && <LeaderboardUserPosition entry={userRankEntry} />}
		</>
	);
};

export default LeaderboardSection;
