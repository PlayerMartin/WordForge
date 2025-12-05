'use client';

import { useState, useMemo } from 'react';

import type { WordValidationResult, DbGame } from '@/types/game';
import { GAME_TIMERS } from '@/modules/game/config/constants';
import {
	type GameSnapshot,
	createSnapshotFromDb,
	applyWord
} from '@/modules/game/core/engine';
import { UpdateGameProgress } from '@/actions/game-actions';

import { useTimer } from './use-timer';
import { useGameEnd } from './use-game-end';
import { useWordInput } from './use-word-input';

type GameMode = DbGame['mode'];

type ModeConfig = {
	hasGameTimer: boolean;
	usesTempoScoring: boolean;
	bottomNote: string;
	hearts: number | null;
	usesChallengePart: boolean;
};

const MODE_CONFIG: Record<GameMode, ModeConfig> = {
	solo_length: {
		hasGameTimer: true,
		usesTempoScoring: false,
		bottomNote: 'Longer words = more points (2^length)',
		hearts: null,
		usesChallengePart: false
	},
	solo_tempo: {
		hasGameTimer: true,
		usesTempoScoring: true,
		bottomNote: 'The faster the answer, the more points!',
		hearts: null,
		usesChallengePart: false
	},
	solo_hidden: {
		hasGameTimer: false,
		usesTempoScoring: false,
		bottomNote: 'Hidden mode – focus on each turn!',
		hearts: 3,
		usesChallengePart: false
	},
	solo_challenge_contain_part: {
		hasGameTimer: true,
		usesTempoScoring: false,
		bottomNote: 'Words must contain the given part!',
		hearts: null,
		usesChallengePart: true
	}
};

export const useWordGame = (game: DbGame) => {
	const [snapshot, setSnapshot] = useState<GameSnapshot>(() =>
		createSnapshotFromDb(game)
	);

	const modeConfig = MODE_CONFIG[game.mode];
	const {
		hasGameTimer,
		usesTempoScoring,
		bottomNote,
		hearts,
		usesChallengePart
	} = modeConfig;

	// === hearts (hidden mode) ===
	const [heartsLeft, setHeartsLeft] = useState<number | null>(hearts);

	// === game end ===
	const { isGameOver, isFinishing, endGame } = useGameEnd({
		gameId: game.id
	});

	// === turn timer ===
	const { remainingSeconds: turnTimeLeft, reset: resetTurnTimer } = useTimer({
		durationSeconds: GAME_TIMERS.DEFAULT_TURN_TIME,
		isRunning: !isGameOver,
		onExpire: endGame
	});

	// === game timer ===
	const { remainingSeconds: rawGameTimeLeft } = useTimer({
		durationSeconds: GAME_TIMERS.DEFAULT_GAME_TIME,
		isRunning: hasGameTimer && !isGameOver,
		onExpire: hasGameTimer ? endGame : undefined
	});

	const gameTimeLeft = hasGameTimer ? rawGameTimeLeft : null;

	const handleLocalValidationError = (result: WordValidationResult) => {
		if (heartsLeft === null) return;
		if (result.error !== 'already_used') return;

		setHeartsLeft(prev => {
			if (prev === null) return prev;
			const next = prev - 1;
			if (next <= 0) {
				endGame();
				return 0;
			}
			return next;
		});
	};

	const challengePart = usesChallengePart ? snapshot.challengePart : null;

	// === word input UX ===
	const {
		wordInput,
		setWordInput,
		feedback,
		setFeedback,
		isSubmitting,
		handleSubmit
	} = useWordInput({
		currentLetter: snapshot.currentLetter,
		language: snapshot.language,
		usedWords: snapshot.wordsUsed,
		canSubmit: !isGameOver && !isFinishing,
		challengePart,
		onLocalValidationError: handleLocalValidationError,
		onValidWord: async rawInput => {
			const before = snapshot.score;
			const elapsedTurn = GAME_TIMERS.DEFAULT_TURN_TIME - turnTimeLeft;

			const next = usesTempoScoring
				? applyWord(snapshot, rawInput, elapsedTurn)
				: applyWord(snapshot, rawInput);

			const gained = next.score - before;

			setSnapshot(next);
			resetTurnTimer();

			setFeedback({
				type: 'success',
				message: `+${gained} points!`
			});

			try {
				await UpdateGameProgress(game.id, {
					score: next.score,
					wordsUsed: next.wordsUsed
				});
			} catch (err) {
				console.error('Failed to sync game progress', err);
			}
		}
	});

	const isBusy = useMemo(
		() => isSubmitting || isFinishing,
		[isSubmitting, isFinishing]
	);

	return {
		snapshot,
		wordInput,
		setWordInput,
		feedback,
		isSubmitting: isBusy,
		turnTimeLeft,
		gameTimeLeft,
		hasGameTimer,
		bottomNote,
		heartsLeft,
		isGameOver,
		handleSubmitWord: handleSubmit,
		challengePart
	};
};
