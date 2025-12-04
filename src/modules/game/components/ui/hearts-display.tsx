'use client';

type HeartsDisplayProps = {
	heartsLeft: number | null;
	maxHearts?: number;
};

const HeartsDisplay = ({ heartsLeft, maxHearts = 3 }: HeartsDisplayProps) => {
	if (heartsLeft === null) return null;

	return (
		<div className="mb-4 flex justify-center gap-1">
			{Array.from({ length: maxHearts }).map((_, i) => (
				<span
					key={i}
					className={
						i < heartsLeft
							? 'text-xl text-error-500'
							: 'text-xl text-surface-300'
					}
				>
					♥
				</span>
			))}
		</div>
	);
};

export default HeartsDisplay;
