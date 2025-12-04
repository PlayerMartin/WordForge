'use client';

import { useEffect, useState } from 'react';

type UseTurnTimerOptions = {
	durationSeconds: number;
	isRunning: boolean;
	onExpire?: () => void;
};

export const useTimer = ({
	durationSeconds,
	isRunning,
	onExpire
}: UseTurnTimerOptions) => {
	const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);

	useEffect(() => {
		setRemainingSeconds(durationSeconds);
	}, [durationSeconds]);

	useEffect(() => {
		if (!isRunning) return;

		const id = setInterval(() => {
			setRemainingSeconds(prev => prev - 1);
		}, 1000);

		return () => clearInterval(id);
	}, [isRunning]);

	useEffect(() => {
		if (remainingSeconds === 0 && isRunning) {
			onExpire?.();
		}
	}, [remainingSeconds, isRunning, onExpire]);

	const reset = () => setRemainingSeconds(durationSeconds);

	return {
		remainingSeconds,
		reset
	};
};
