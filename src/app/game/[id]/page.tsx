import GameClient from '@/modules/game/components/game-client';

type PageProps = {
	params: { id: string };
};

const Game = ({ params }: PageProps) => {
	const gameId = params.id;

	return <GameClient gameId={gameId} />;
};

export default Game;
