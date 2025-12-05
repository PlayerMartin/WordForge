const CHALLENGE_PARTS = [
	'A',
	'E',
	'I',
	'O',
	'U',
	'S',
	'T',
	'R',
	'N',
	'L',
	'ST',
	'TR',
	'CH',
	'SH',
	'PR',
	'PL',
	'BR',
	'CR'
] as const;

export type ChallengePart = (typeof CHALLENGE_PARTS)[number];

export const generateChallengePart = (): ChallengePart => {
	const idx = Math.floor(Math.random() * CHALLENGE_PARTS.length);
	return CHALLENGE_PARTS[idx];
};
