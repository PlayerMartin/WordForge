'use client';

import { Card } from '@/components/ui';

type CurrentLetterCardProps = {
	label?: string;
	letter: string;
};

const CurrentLetterCard = ({
	label = 'Your word must start with',
	letter
}: CurrentLetterCardProps) => (
	<Card className="mb-6 text-center">
		<p className="mb-2 text-sm text-surface-500">{label}</p>
		<div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400">
			<span className="text-5xl font-bold text-white">{letter}</span>
		</div>
	</Card>
);

export default CurrentLetterCard;
