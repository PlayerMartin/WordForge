import { GAME_TIMERS } from './constants';

export const dbModeToModeId = (dbMode: GameDbMode): GameModeId =>
	dbMode.replace(/^solo_/, '') as GameModeId;

export type GameModeId =
	| 'tempo'
	| 'length'
	| 'hidden'
	| 'challenge_contain_part';

export type GameModeConfig = {
	id: GameModeId;
	title: string;
	filterLabel: string;
	description: string;
	borderColor: string;

	dbMode: `solo_${GameModeId}`;

	defaultTurnTimeLimit: number;
	defaultGlobalTimeLimit: number;
};

export const GAME_MODES: GameModeConfig[] = [
	{
		id: 'tempo',
		title: 'Tempo Mode',
		filterLabel: 'Tempo',
		description: 'The faster you answer, the more points you earn.',
		borderColor: 'border-l-primary-500',

		dbMode: 'solo_tempo',
		defaultTurnTimeLimit: GAME_TIMERS.DEFAULT_TURN_TIME,
		defaultGlobalTimeLimit: 180
	},
	{
		id: 'length',
		title: 'Length Mode',
		filterLabel: 'Length',
		description: 'Longer words give more points. Think big.',
		borderColor: 'border-l-secondary-500',

		dbMode: 'solo_length',
		defaultTurnTimeLimit: -1,
		defaultGlobalTimeLimit: -1
	},
	{
		id: 'hidden',
		title: 'Hidden Mode',
		filterLabel: 'Hidden',
		description:
			"You can't see used words, have 3 lives, and can't repeat words.",
		borderColor: 'border-l-warning-500',

		dbMode: 'solo_hidden',
		defaultTurnTimeLimit: -1,
		defaultGlobalTimeLimit: -1
	},
	{
		id: 'challenge_contain_part',
		title: 'Challenge: Contains Part',
		filterLabel: 'Challenge',
		description: 'Each word must contain a given letter or substring.',
		borderColor: 'border-l-success-500',

		dbMode: 'solo_challenge_contain_part',
		defaultTurnTimeLimit: -1,
		defaultGlobalTimeLimit: -1
	}
];

export const GAME_MODE_BY_ID: Record<GameModeId, GameModeConfig> =
	Object.fromEntries(GAME_MODES.map(m => [m.id, m])) as Record<
		GameModeId,
		GameModeConfig
	>;

export type GameDbMode = (typeof GAME_MODES)[number]['dbMode'];
