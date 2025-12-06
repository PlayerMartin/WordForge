import { type LeaderboardEntry } from '@/types';

import { getRankStyle } from '../config/constants';

type LeaderboardRowProps = {
	entry: LeaderboardEntry;
	index: number;
	isCurrentUser: boolean;
	rank?: number;
};

const LeaderboardRow = ({
	entry,
	index,
	isCurrentUser,
	rank
}: LeaderboardRowProps) => {
	const displayRank = rank ?? index + 1;
	const isHighlighted = rank !== undefined;

	const rankBadgeStyle = isHighlighted
		? 'bg-primary-200 text-primary-700'
		: getRankStyle(index);

	const textColor = isHighlighted ? 'text-primary-700' : 'text-surface-600';

	return (
		<tr
			className={`border-b border-surface-100 transition-colors ${
				isCurrentUser || isHighlighted
					? 'bg-primary-50 hover:bg-primary-100'
					: 'hover:bg-surface-50'
			}`}
		>
			<td className="px-6 py-4">
				<span
					className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${rankBadgeStyle}`}
				>
					{displayRank}
				</span>
			</td>
			<td className="px-6 py-4">
				<span
					className={`font-medium ${isCurrentUser || isHighlighted ? 'text-primary-700' : 'text-surface-900'}`}
				>
					{entry.playerName ?? 'Unknown'}
					{(isCurrentUser || isHighlighted) && ' (You)'}
				</span>
			</td>
			<td className="px-6 py-4 text-right">
				<span className="font-semibold text-primary-600">
					{entry.score}
				</span>
			</td>
			<td className={`px-6 py-4 text-right ${textColor}`}>
				{entry.wordCount}
			</td>
			<td className={`px-6 py-4 text-left ${textColor}`}>
				{entry.longestWord ?? '-'}
			</td>
			<td
				className={`px-6 py-4 text-right text-sm ${isHighlighted ? 'text-primary-600' : 'text-surface-500'}`}
			>
				{entry.achievedAt
					? new Date(entry.achievedAt).toLocaleDateString()
					: '-'}
			</td>
		</tr>
	);
};

export default LeaderboardRow;
