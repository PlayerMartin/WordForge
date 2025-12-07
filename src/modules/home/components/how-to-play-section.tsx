'use client';

import { useEffect, useState } from 'react';

import { Card } from '@/components/ui';
import { FloatingLettersBackground } from '@/components/ui/floating-letters-background';

const RULES = [
	{
		step: 1,
		title: 'Get a Letter',
		description:
			"You'll receive a starting letter to begin your word chain."
	},
	{
		step: 2,
		title: 'Type a Word',
		description: 'Enter a valid word that starts with the given letter.'
	},
	{
		step: 3,
		title: 'Chain It',
		description:
			'The last letter of your word becomes the next start letter!'
	}
];

const HowToPlaySection = () => {
	const [activeRule, setActiveRule] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveRule(prev => (prev + 1) % RULES.length);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	const current = RULES[activeRule];

	return (
		<div className="flex flex-col">
			<h2 className="mb-2 text-2xl font-bold">How to Play</h2>

			<div className="relative flex flex-1 flex-col">
				<Card className="relative flex-1 overflow-hidden bg-surface-900">
					<FloatingLettersBackground />

					<div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
						<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-500 text-2xl font-bold text-white transition-all duration-500">
							{current.step}
						</div>
						<h3 className="mb-2 text-xl font-semibold text-white transition-all duration-500">
							{current.title}
						</h3>
						<p className="text-surface-300 transition-all duration-500">
							{current.description}
						</p>
					</div>
				</Card>

				<div className="mt-4 flex justify-center gap-2">
					{RULES.map((_, index) => (
						<button
							key={index}
							onClick={() => setActiveRule(index)}
							className={`h-3 w-3 rounded-full transition-all duration-300 ${
								activeRule === index
									? 'w-6 bg-primary-500'
									: 'bg-surface-600 hover:bg-surface-700'
							}`}
							aria-label={`Go to rule ${index + 1}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default HowToPlaySection;
