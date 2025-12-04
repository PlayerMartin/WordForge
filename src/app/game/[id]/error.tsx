'use client';

import Link from 'next/link';

import { Button, Card } from '@/components/ui';

const GameError = () => (
	<div className="flex min-h-screen items-center justify-center">
		<Card className="max-w-md text-center">
			<h1 className="mb-2 text-xl font-bold text-surface-900">
				Something went wrong
			</h1>
			<p className="mb-4 text-surface-500">
				We couldn&apos;t load this game.
			</p>
			<Link href="/">
				<Button>Back to Home</Button>
			</Link>
		</Card>
	</div>
);

export default GameError;
