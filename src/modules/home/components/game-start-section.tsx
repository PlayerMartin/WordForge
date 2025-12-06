'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { type GameModeId } from '@/modules/game/config/modes';
import { StartGameForMode } from '@/actions/game-actions';
import { Button } from '@/components/ui';
import { useLanguageContext } from '@/components/utils/language-provider';

import HowToPlaySection from './how-to-play-section';
import GameModeSection from './game-mode-section';

export const GameStartSection = () => {
	const router = useRouter();
	const session = useSession();
	const { language } = useLanguageContext();

	const [isLoading, setIsLoading] = useState(false);
	const [selectedModeId, setSelectedModeId] = useState<GameModeId>('length');

	const handleStartGame = async () => {
		if (!session.data?.user.id) {
			router.push('/auth/sign-in');
			return;
		}

		setIsLoading(true);
		try {
			const gameID = await StartGameForMode(
				session.data.user.id,
				selectedModeId,
				language
			);

			router.push(`/game/${gameID}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Button
				size="lg"
				variant={
					session.status === 'authenticated' ? 'outline' : undefined
				}
				onClick={handleStartGame}
				loading={isLoading}
			>
				Start{' '}
				{session.status === 'authenticated' ? 'New Game' : 'Playing'}
			</Button>
			<div className="mx-auto mb-4 max-w-5xl">
				<div className="grid gap-8 md:grid-cols-2">
					<GameModeSection
						selectedModeId={selectedModeId}
						onChange={setSelectedModeId}
					/>
					<HowToPlaySection />
				</div>
			</div>
		</>
	);
};
