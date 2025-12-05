import { Suspense } from 'react';

import GameViewport from '@/modules/game/components/game-view-port';

import LoadingGame from './loading';

type PageProps = {
	params: { id: string };
};

const GamePage = ({ params }: PageProps) => (
	<Suspense fallback={<LoadingGame />}>
		<GameViewport gameId={params.id} />
	</Suspense>
);

export default GamePage;
