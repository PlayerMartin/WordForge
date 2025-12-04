'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Button, Card } from '@/components/ui';
import {
	StartGameForMode,
	GetActiveGameIdForUser
} from '@/actions/gameActions';
import GameModeSelector from '@/modules/game/components/game-mode-selector';
import { type GameModeId } from '@/modules/game/config/modes';
import HowToPlaySection from '@/components/ui/how-to-play-section';

const Home = () => {
	const router = useRouter();
	const session = useSession();

	const [isLoading, setIsLoading] = useState(false);
	const [selectedModeId, setSelectedModeId] = useState<GameModeId>('length');

	const [activeGameId, setActiveGameId] = useState<string | null>(null);
	const [isLoadingActiveGame, setIsLoadingActiveGame] = useState(false);

	// load active game once user is known
	useEffect(() => {
		if (session.status !== 'authenticated' || !session.data?.user?.id)
			return;

		setIsLoadingActiveGame(true);
		GetActiveGameIdForUser(session.data.user.id)
			.then(id => setActiveGameId(id))
			.finally(() => setIsLoadingActiveGame(false));
	}, [session.status, session.data?.user?.id]);

	const handleStartGame = async () => {
		if (!session.data?.user.id) {
			router.push('/auth/signin');
			return;
		}

		setIsLoading(true);
		try {
			const gameID = await StartGameForMode(
				session.data.user.id,
				selectedModeId,
				'en'
			);

			router.push(`/game/${gameID}`);
		} finally {
			setIsLoading(false);
		}
	};

	const handleContinueGame = () => {
		if (!activeGameId) return;
		router.push(`/game/${activeGameId}`);
	};

	// --- render ---

	return (
		<div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
			{/* Header */}
			<header className="container mx-auto px-4 py-6">
				<nav className="flex items-center justify-between">
					<div className="text-2xl font-bold text-primary-600">
						WordForge
					</div>
					<div className="flex items-center gap-4">
						{session.data?.user ? (
							<>
								<span className="text-surface-600">
									{session.data.user.name}
								</span>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => signOut()}
								>
									Sign out
								</Button>
							</>
						) : (
							<>
								<Link href="/auth/signin">
									<Button variant="ghost" size="sm">
										Sign in
									</Button>
								</Link>
								<Link href="/auth/signup">
									<Button size="sm">Sign up</Button>
								</Link>
							</>
						)}
					</div>
				</nav>
			</header>

			{/* Main Section */}
			<main className="container mx-auto px-4 py-16">
				<div className="mx-auto mb-16 max-w-3xl text-center">
					<h1 className="mb-6 text-5xl font-bold text-surface-900 md:text-6xl">
						Build Words,{' '}
						<span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
							Chain Victory
						</span>
					</h1>
					<p className="mb-8 text-xl text-surface-600">
						A fast-paced word chain game. Start with a letter, type
						a word, and the last letter becomes the next challenge.
						Race against time!
					</p>

					{/* CTA area – difference between start vs continue */}
					{session.status === 'authenticated' && activeGameId ? (
						<div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
							<Button
								size="lg"
								onClick={handleContinueGame}
								loading={isLoadingActiveGame}
							>
								Continue Game
							</Button>
							<Button
								size="lg"
								variant="outline"
								onClick={handleStartGame}
								loading={isLoading}
							>
								Start New Game
							</Button>
						</div>
					) : (
						<Button
							size="lg"
							onClick={handleStartGame}
							loading={isLoading}
						>
							Start Playing
						</Button>
					)}
				</div>

				{/* Rules Section */}
				<div className="mx-auto mb-16 max-w-5xl">
					<div className="grid gap-8 md:grid-cols-2">
						{/* Game Modes (Left Side) */}
						<div>
							<h2 className="mb-6 text-2xl font-bold text-surface-900">
								Game Modes
							</h2>
							<GameModeSelector
								selectedModeId={selectedModeId}
								onChange={setSelectedModeId}
							/>
						</div>

						{/* How to Play (Right Side) */}
						<HowToPlaySection />
					</div>
				</div>

				{/* Languagess */}
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="mb-6 text-2xl font-bold text-surface-900">
						{' '}
						Multiple Languages{' '}
					</h2>
					<div className="flex justify-center gap-4">
						<Card
							padding="sm"
							className="border-2 border-primary-500 bg-surface-900 px-6"
						>
							<span className="mr-2 font-bold text-primary-400">
								EN
							</span>
							<span className="font-medium text-white">
								English
							</span>
						</Card>
						<Card
							padding="sm"
							className="bg-surface-900 px-6 opacity-50"
						>
							<span className="mr-2 font-bold text-primary-400">
								CZ
							</span>
							<span className="font-medium text-white">
								Czech
							</span>
							<span className="block text-xs text-surface-400">
								Coming soon
							</span>
						</Card>{' '}
						<Card
							padding="sm"
							className="bg-surface-900 px-6 opacity-50"
						>
							<span className="mr-2 font-bold text-primary-400">
								SK
							</span>
							<span className="font-medium text-white">
								Slovak
							</span>
							<span className="block text-xs text-surface-400">
								Coming soon
							</span>
						</Card>
					</div>
				</div>
			</main>
			{/* Foter */}
			<footer className="container mx-auto mt-16 border-t border-surface-200 px-4 py-8">
				<div className="flex flex-col items-center justify-between gap-4 text-sm text-surface-500 md:flex-row">
					<div>WordForge - Word Chain Game</div>{' '}
					<div className="flex gap-6">
						<Link
							href="/leaderboard"
							className="transition-colors hover:text-primary-600"
						>
							Leaderboard
						</Link>
						<Link
							href="/profile"
							className="transition-colors hover:text-primary-600"
						>
							Profile
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Home;
