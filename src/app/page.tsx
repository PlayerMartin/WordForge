'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui';
import { StartGameForMode } from '@/actions/game-actions';
import { type GameModeId } from '@/modules/game/config/modes';
import {
	MainTopTextSection,
	GameModeSection,
	HowToPlaySection,
	LanguageSection
} from '@/modules/home/components';

const Home = () => {
	const router = useRouter();
	const session = useSession();

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
				'EN'
			);

			router.push(`/game/${gameID}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className="mx-auto mb-4 max-w-5xl text-center">
				<MainTopTextSection />
				<Button
					size="lg"
					variant={
						session.status === 'authenticated'
							? 'outline'
							: undefined
					}
					onClick={handleStartGame}
					loading={isLoading}
				>
					Start{' '}
					{session.status === 'authenticated'
						? 'New Game'
						: 'Playing'}
				</Button>
			</div>

			<div className="mx-auto mb-4 max-w-5xl">
				<div className="grid gap-8 md:grid-cols-2">
					<GameModeSection
						selectedModeId={selectedModeId}
						onChange={setSelectedModeId}
					/>
					<HowToPlaySection />
				</div>
			</div>

			<LanguageSection />
		</>
	);
};

export default Home;
