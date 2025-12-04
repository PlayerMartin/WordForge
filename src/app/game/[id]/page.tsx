import GameClient from '@/modules/game/components/game-client';

type PageProps = {
	params: { id: string };
};

const Game = ({ params }: PageProps) => <GameClient gameId={params.id} />;

export default Game;
