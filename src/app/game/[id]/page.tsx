import { Suspense } from 'react';

import LoadingGame from './loading';
import GameViewport from '@/modules/game/components/game-view-port';

type PageProps = {
	params: { id: string };
};

const GamePage = ({ params }: PageProps) => (
	<Suspense fallback={<LoadingGame />}>
		<GameViewport gameId={params.id} />
	</Suspense>
);

export default GamePage;
