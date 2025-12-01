// modules/game/hooks/use-turn-timer.ts
"use client";

import { useEffect, useState } from "react";

type UseTurnTimerOptions = {
  durationSeconds: number;
  isRunning: boolean;
  onExpire?: () => void | Promise<void>;
};

export const useTurnTimer = ({
  durationSeconds,
  isRunning,
  onExpire,
}: UseTurnTimerOptions) => {
  const [remainingSeconds, setRemainingSeconds] = useState(durationSeconds);

  useEffect(() => {
    setRemainingSeconds(durationSeconds);
  }, [durationSeconds]);

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
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
    reset,
  };
};
