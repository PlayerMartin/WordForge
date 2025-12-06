import { Card } from '@/components/ui';
import { type LeaderboardEntry } from '@/types';

import LeaderboardRow from './leaderboard-row';

type UserPositionEntry = LeaderboardEntry & { rank: number };

type LeaderboardUserPositionProps = {
	entry: UserPositionEntry;
};

const LeaderboardUserPosition = ({ entry }: LeaderboardUserPositionProps) => (
	<Card padding="sm" className="mt-4 border-primary-200 bg-primary-50">
		<div className="overflow-x-auto">
			<table className="w-full">
				<tbody>
					<LeaderboardRow
						entry={entry}
						index={0}
						isCurrentUser
						rank={entry.rank}
					/>
				</tbody>
			</table>
		</div>
	</Card>
);

export default LeaderboardUserPosition;
