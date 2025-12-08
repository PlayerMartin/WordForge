'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { StartGameForMode } from '@/actions/game-actions';
import { dbModeToModeId } from '@/modules/game/config/modes';
import type { DbGame } from '@/types/game';

export const usePlayAgain = (game: DbGame) => {
	const router = useRouter();
	const [isStarting, setIsStarting] = useState(false);

	const handlePlayAgain = async () => {
		if (isStarting) return;

		setIsStarting(true);
		try {
			const modeId = dbModeToModeId(game.mode);
			const newGameId = await StartGameForMode(
				game.userId,
				modeId,
				game.language
			);

			router.push(`/game/${newGameId}`);
		} catch {
			console.error('Could not start game');
		} finally {
			setIsStarting(false);
		}
	};

	return {
		isStarting,
		handlePlayAgain
	};
};
