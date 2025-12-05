import { Suspense } from 'react';

import GameViewport from '@/modules/game/components/game-view-port';

import LoadingGame from './loading';
//This was necesery change for next 15 pls review
type PageProps = {
	params: Promise<{ id: string }>;
};

const GamePage = async ({ params }: PageProps) => {
	const { id } = await params;
	return (
		<Suspense fallback={<LoadingGame />}>
			<GameViewport gameId={id} />
		</Suspense>
	);
};

export default GamePage;
