'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { GetGame } from '@/actions/game-actions';
import { Button, Card } from '@/components/ui';
import { type DbGame } from '@/types/game';

import LengthModeClient from './modes/length-mode-client';
import TempoModeClient from './modes/tempo-mode-client';
import HiddenModeClient from './modes/hidden-mode-client';
import ChallangeContainPartModeClient from './modes/challange-contain-part-mode-client';

type GameClientProps = {
	gameId: string;
};

const GameClient = ({ gameId }: GameClientProps) => {
	const session = useSession();
	const [game, setGame] = useState<DbGame | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadGame = async () => {
			if (session.status === 'loading') return;

			const dbGame = (await GetGame(gameId)) as DbGame | null;

			if (!dbGame) {
				setError('Game ID is not valid');
				return;
			}
			if (dbGame.userId !== session.data?.user.id) {
				setError('Unauthorized');
				return;
			}
			if (dbGame.finishedAt) {
				setError('Game already ended');
				return;
			}

			setGame(dbGame);
		};

		loadGame();
	}, [session.status, session.data?.user?.id, gameId]);

	if (session.status === 'loading' || (!game && !error)) {
		return (
			<div className="flex items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex items-center justify-center">
				<Card className="max-w-md text-center">
					<h1 className="mb-2 text-xl font-bold text-surface-900">
						{error}
					</h1>
					<p className="mb-4 text-surface-500">
						Something went wrong with this game.
					</p>
					<Link href="/">
						<Button>Back to Home</Button>
					</Link>
				</Card>
			</div>
		);
	}

	if (!game) {
		return null;
	}

	switch (game.mode) {
		case 'solo_length':
			return <LengthModeClient game={game} />;

		case 'solo_tempo':
			return <TempoModeClient game={game} />;

		case 'solo_challenge_contain_part':
			return <ChallangeContainPartModeClient />;

		case 'solo_hidden':
			return <HiddenModeClient />;
	}
};

export default GameClient;
