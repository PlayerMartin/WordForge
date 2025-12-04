'use client';

import { useState, useMemo } from 'react';

import { type DbGame } from '@/types/game';
import { GAME_TIMERS } from '@/modules/game/config/constants';
import {
	type GameSnapshot,
	createSnapshotFromDb,
	applyWord
} from '@/modules/game/core/engine';
import { UpdateGameProgress } from '@/actions/gameActions';

import { useTurnTimer } from './use-turn-timer';
import { useGameEnd } from './use-game-end';
import { useWordInput } from './use-word-input';

export const useTempoModeGame = (game: DbGame) => {
	const [snapshot, setSnapshot] = useState<GameSnapshot>(() =>
		createSnapshotFromDb(game)
	);

	// === game end ===
	const { isGameOver, isFinishing, endGame } = useGameEnd({
		gameId: game.id,
		getPayload: () => ({
			score: snapshot.score,
			wordsUsed: snapshot.wordsUsed
		})
	});

	// === timer ===
	const { remainingSeconds: turnTimeLeft, reset: resetTurnTimer } =
		useTurnTimer({
			durationSeconds: GAME_TIMERS.DEFAULT_TURN_TIME,
			isRunning: !isGameOver,
			onExpire: endGame
		});

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
		usedWords: snapshot.wordsUsed,
		canSubmit: !isGameOver && !isFinishing,
		onValidWord: async rawInput => {
			const before = snapshot.score;
			const next = applyWord(
				snapshot,
				rawInput,
				GAME_TIMERS.DEFAULT_TURN_TIME - turnTimeLeft
			);
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
		isGameOver,
		handleSubmitWord: handleSubmit
	};
};
