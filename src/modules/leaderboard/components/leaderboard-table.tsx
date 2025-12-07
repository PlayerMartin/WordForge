import Link from 'next/link';

import { Card, Button } from '@/components/ui';
import { type LeaderboardEntry } from '@/types';

import { LEADERBOARD_COLUMNS } from '../config/constants';

import LeaderboardRow from './leaderboard-row';

type LeaderboardTableProps = {
	entries: LeaderboardEntry[];
	currentUserId?: string;
};

const LeaderboardTable = ({
	entries,
	currentUserId
}: LeaderboardTableProps) => {
	if (entries.length === 0) {
		return (
			<Card padding="sm">
				<div className="px-6 py-16 text-center">
					<div className="text-surface-500">
						<p className="font-medium">No entries yet</p>
						<p className="text-sm">Be the first to set a record!</p>
						<Link href="/">
							<Button className="mt-4">Play Now</Button>
						</Link>
					</div>
				</div>
			</Card>
		);
	}

	return (
		<Card padding="sm">
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-surface-200 bg-surface-50">
							{LEADERBOARD_COLUMNS.map(column => (
								<th
									key={column.key}
									className={`px-6 py-4 text-${column.align} text-sm font-semibold text-surface-600`}
								>
									{column.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{entries.map((entry, index) => (
							<LeaderboardRow
								key={entry.id}
								entry={entry}
								index={index}
								isCurrentUser={currentUserId === entry.userId}
							/>
						))}
					</tbody>
				</table>
			</div>
		</Card>
	);
};

export default LeaderboardTable;
