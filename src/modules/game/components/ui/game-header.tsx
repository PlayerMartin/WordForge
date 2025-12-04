'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui';

type GameHeaderProps = {
	gameId: string;
};

const GameHeader = ({ gameId }: GameHeaderProps) => {
	const router = useRouter();

	const leaveGame = () => {
		router.push('/');
	};

	return (
		<header className="container mx-auto px-4 py-4">
			<nav className="flex items-center justify-between">
				<Link href="/" className="text-xl font-bold text-primary-600">
					WordForge
				</Link>
				<Button variant="ghost" size="sm" onClick={leaveGame}>
					Leave Game
				</Button>
			</nav>
		</header>
	);
};

export default GameHeader;
