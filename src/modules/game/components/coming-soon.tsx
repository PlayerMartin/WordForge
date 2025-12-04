'use client';

import Link from 'next/link';
import { Button, Card } from '@/components/ui';

const ComingSoon = ({}) => {
	return (
		<Card className="mx-auto max-w-md text-center">
			<h1 className="mb-2 text-2xl font-bold text-surface-900">
				{'Mode in progress'}
			</h1>

			<p className="mb-4 text-surface-500">
				{"We're still working on this mode."}
			</p>

			<Link href="/">
				<Button>Back to home</Button>
			</Link>
		</Card>
	);
};

export default ComingSoon;
