import { GAME_RULES } from '@/modules/game/config/constants';
import { type WordValidationResult } from '@/types/game';

export const normalizeWord = (input: string): string =>
	input.trim().toLowerCase();

export const validateWordLocally = (params: {
	rawInput: string;
	startLetter: string;
	usedWords: string[];
	challengePart?: string | null;
}): WordValidationResult => {
	const normalized = normalizeWord(params.rawInput);

	if (!normalized) {
		return {
			valid: false,
			error: 'too_short',
			message: 'Please enter a word.'
		};
	}

	if (normalized.split(/\s+/).length > 1) {
		return {
			valid: false,
			error: 'many_words',
			message: 'Please enter a single word'
		};
	}

	const start = params.startLetter.toLowerCase();
	if (!normalized.startsWith(start)) {
		return {
			valid: false,
			error: 'wrong_letter',
			message: `Word must start with "${params.startLetter}"`
		};
	}

	if (
		params.challengePart &&
		!normalized.includes(params.challengePart.toLowerCase())
	) {
		return {
			valid: false,
			error: 'wrong_letter',
			message: `Word must contain "${params.challengePart}"`
		};
	}

	if (normalized.length < GAME_RULES.MIN_WORD_LENGTH) {
		return {
			valid: false,
			error: 'too_short',
			message: `Word must be at least ${GAME_RULES.MIN_WORD_LENGTH} characters`
		};
	}

	if (params.usedWords.includes(normalized)) {
		return {
			valid: false,
			error: 'already_used',
			message: 'Word already used!'
		};
	}

	return { valid: true };
};
