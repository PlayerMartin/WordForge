'use client';

type GameTimerProps = {
	totalSeconds: number;
	remainingSeconds: number;
};

const Timer = ({ totalSeconds, remainingSeconds }: GameTimerProps) => {
	if (totalSeconds <= 0) return null;

	const safeRemaining = Math.max(0, remainingSeconds);
	const ratio = safeRemaining / totalSeconds;
	const percent = Math.round(ratio * 100);

	const isLow = ratio <= 0.25;

	return (
		<div className="mb-6">
			{/* Numeric display */}
			<div className="mb-2 flex items-center justify-center gap-2">
				<span
					className={`text-2xl font-semibold tabular-nums ${
						isLow ? 'text-error-500' : 'text-primary-600'
					}`}
				>
					{safeRemaining}s
				</span>
			</div>

			{/* Progress bar */}
			<div className="h-2 overflow-hidden rounded-full bg-surface-200">
				<div
					className={`h-full transition-all duration-300 ${
						isLow ? 'bg-error-500' : 'bg-primary-500'
					}`}
					style={{ width: `${percent}%` }}
				/>
			</div>
		</div>
	);
};

export default Timer;
