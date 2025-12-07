'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '../ui';

const Header = () => {
	const session = useSession();

	return (
		<header className="container mx-auto px-4 py-2">
			<nav className="flex items-center justify-between">
				<Link href="/" className="text-3xl font-bold text-primary-600">
					WordForge
				</Link>

				<div className="flex items-center gap-4">
					<Link
						href="/leaderboard"
						className="transition-colors hover:text-primary-600"
					>
						Leaderboard
					</Link>

					{session.data?.user && (
						<Link
							href="/profile"
							prefetch={false}
							className="transition-colors hover:text-primary-600"
						>
							Profile
						</Link>
					)}
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
							<Link href="/auth/sign-in">
								<Button variant="ghost" size="sm">
									Sign in
								</Button>
							</Link>
							<Link href="/auth/sign-up">
								<Button size="sm">Sign up</Button>
							</Link>
						</>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
