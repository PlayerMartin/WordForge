import { redirect, notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { GetGame } from '@/actions/game-actions';
import { type DbGame } from '@/types/game';
import { authOptions } from '@/lib/auth/authOptions';
import ComingSoon from './coming-soon';
import GameClient from './game-client';

type Props = {
	gameId: string;
};

const GameViewport = async ({ gameId }: Props) => {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		redirect('/auth/sign-in');
	}

	const game = (await GetGame(gameId)) as DbGame | null;

	if (!game) {
		notFound();
	}

	if (game.userId !== session.user.id) {
		redirect('/');
	}

	if (game.finishedAt) {
		redirect('/');
	}

	return ['solo_length', 'solo_tempo'].includes(game.mode) ? (
		<GameClient game={game} />
	) : (
		<ComingSoon />
	);
};

export default GameViewport;
