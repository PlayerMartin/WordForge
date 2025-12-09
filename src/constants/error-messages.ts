export const AUTH_ERRORS = {
	USER_NOT_FOUND: 'User does not exist',
	INVALID_PASSWORD: 'Incorrect password',
	PROVIDER_ACCOUNT:
		'This account uses social login. Please sign in with GitHub.',
	GENERIC: 'Something went wrong. Please try again.'
} as const;

export const GAME_ERRORS = {
	INVALID_MODE: (modeId: string) => `Invalid game mode: ${modeId}`,
	GAME_NOT_FOUND: 'Game not found'
} as const;
