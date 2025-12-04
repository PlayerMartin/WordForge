'use client';

import { useCallback, useState } from 'react';

import { FinishGame } from '@/actions/game-actions';

export const useGameEnd = ({ gameId }: { gameId: string }) => {
	const [isGameOver, setIsGameOver] = useState(false);
	const [isFinishing, setIsFinishing] = useState(false);

	const endGame = useCallback(async () => {
		if (isGameOver || isFinishing) return;

		setIsGameOver(true);
		setIsFinishing(true);

		const res = await FinishGame(gameId);
		if (!res.ok) {
			console.error('Failed to finish game', res.err);
		}
		setIsFinishing(false);
	}, [gameId, isGameOver, isFinishing]);

	return {
		isGameOver,
		isFinishing,
		endGame
	};
};
