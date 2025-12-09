'use client';

import { useState, useRef, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

import { Button } from '../ui';

const Header = () => {
	const session = useSession();
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<header className="container mx-auto px-4 py-3">
			<nav className="flex items-center justify-between">
				<Link href="/" className="text-3xl font-bold text-primary-600">
					WordForge
				</Link>

				<div className="flex items-center gap-6">
					<Link
						href="/leaderboard"
						className="text-surface-600 transition-colors hover:text-primary-600"
					>
						Leaderboard
					</Link>

					{session.data?.user ? (
						<div className="relative" ref={dropdownRef}>
							<button
								onClick={() =>
									setIsDropdownOpen(!isDropdownOpen)
								}
								className="flex items-center gap-2 rounded-lg px-3 py-2 text-surface-700 transition-colors hover:bg-surface-100"
							>
								<span className="font-medium">
									{session.data.user.name}
								</span>
								<svg
									className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>

							{isDropdownOpen && (
								<div className="absolute right-0 mt-2 w-48 rounded-lg border border-surface-200 bg-white py-2 shadow-lg">
									<Link
										href="/profile"
										prefetch={false}
										className="block px-4 py-2 text-surface-700 transition-colors hover:bg-surface-50"
										onClick={() => setIsDropdownOpen(false)}
									>
										Profile
									</Link>
									<button
										onClick={() => signOut()}
										className="block w-full px-4 py-2 text-left text-surface-700 transition-colors hover:bg-surface-50"
									>
										Sign out
									</button>
								</div>
							)}
						</div>
					) : (
						<div className="flex items-center gap-3">
							<Link href="/auth/sign-in">
								<Button variant="ghost" size="sm">
									Sign in
								</Button>
							</Link>
							<Link href="/auth/sign-up">
								<Button size="sm">Sign up</Button>
							</Link>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Header;
