'use client';

type FloatingLetter = {
	letter: string;
	size: number;
	left: number;
	top: number;
	delay: number;
	duration: number;
};

const DEFAULT_FLOATING_LETTERS: FloatingLetter[] = [
	{ letter: 'A', size: 32, left: 5, top: 10, delay: 0, duration: 2.5 },
	{ letter: 'B', size: 28, left: 14, top: 27, delay: 0.3, duration: 3.2 },
	{ letter: 'C', size: 45, left: 23, top: 44, delay: 0.6, duration: 2.8 },
	{ letter: 'W', size: 35, left: 32, top: 61, delay: 0.9, duration: 3.5 },
	{ letter: 'O', size: 25, left: 41, top: 18, delay: 1.2, duration: 2.3 },
	{ letter: 'R', size: 40, left: 50, top: 35, delay: 1.5, duration: 3.0 },
	{ letter: 'D', size: 30, left: 59, top: 52, delay: 1.8, duration: 2.7 },
	{ letter: 'F', size: 38, left: 68, top: 69, delay: 2.1, duration: 3.3 },
	{ letter: 'G', size: 33, left: 77, top: 26, delay: 2.4, duration: 2.9 },
	{ letter: 'E', size: 42, left: 86, top: 43, delay: 2.7, duration: 3.1 }
];

type FloatingLettersBackgroundProps = {
	letters?: FloatingLetter[];
};

export const FloatingLettersBackground = ({
	letters = DEFAULT_FLOATING_LETTERS
}: FloatingLettersBackgroundProps) => (
	<div className="pointer-events-none absolute inset-0 overflow-hidden">
		{letters.map(item => (
			<span
				key={`${item.letter}-${item.left}-${item.top}`}
				className="absolute animate-bounce select-none font-bold text-primary-500/20"
				style={{
					fontSize: `${item.size}px`,
					left: `${item.left}%`,
					top: `${item.top}%`,
					animationDelay: `${item.delay}s`,
					animationDuration: `${item.duration}s`,
					transform: 'translateY(0)',
					animationFillMode: 'both'
				}}
			>
				{item.letter}
			</span>
		))}
	</div>
);
