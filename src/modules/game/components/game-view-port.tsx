import { redirect, notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { GetGame } from '@/actions/game-actions';
import { type DbGame } from '@/types/game';
import { authOptions } from '@/lib/auth/authOptions';

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

	return <GameClient game={game} />;
};

export default GameViewport;
