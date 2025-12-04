'use client';

import Link from 'next/link';

import { Button, Card } from '@/components/ui';

const HiddenModeClient = () => (
	<Card className="mx-auto max-w-md text-center">
		<h1 className="mb-2 text-2xl font-bold text-surface-900">
			Hidden Mode
		</h1>
		<p className="mb-4 text-surface-500">
			We&apos;re still working on this mode.
		</p>
		<p className="mb-6 text-sm text-surface-400">
			The game record exists, but gameplay for Hidden Mode isn&apos;t
			implemented yet.
		</p>
		<Link href="/">
			<Button>Back to home</Button>
		</Link>
	</Card>
);

export default HiddenModeClient;
