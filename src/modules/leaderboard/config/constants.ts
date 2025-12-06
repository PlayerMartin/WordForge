type ColumnAlign = 'left' | 'right';

export type LeaderboardColumn = {
	key: string;
	label: string;
	align: ColumnAlign;
};

export const LEADERBOARD_COLUMNS: LeaderboardColumn[] = [
	{ key: 'rank', label: 'Rank', align: 'left' },
	{ key: 'player', label: 'Player', align: 'left' },
	{ key: 'score', label: 'Score', align: 'right' },
	{ key: 'words', label: 'Words', align: 'right' },
	{ key: 'longestWord', label: 'Longest Word', align: 'left' },
	{ key: 'date', label: 'Date', align: 'right' }
];

export const RANK_STYLES: Record<number, string> = {
	0: 'bg-yellow-100 text-yellow-700',
	1: 'bg-slate-200 text-slate-600',
	2: 'bg-orange-100 text-orange-700'
};

export const DEFAULT_RANK_STYLE = 'bg-surface-100 text-surface-600';

export const getRankStyle = (index: number): string =>
	RANK_STYLES[index] ?? DEFAULT_RANK_STYLE;
