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
    if (durationSeconds <= 0) return;

    if (remainingSeconds <= 0) {
      if (onExpire) {
        void onExpire();
      }
      return;
    }

    const id = window.setInterval(() => {
      setRemainingSeconds((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(id);
  }, [isRunning, durationSeconds, remainingSeconds, onExpire]);

  const reset = () => setRemainingSeconds(durationSeconds);

  return {
    remainingSeconds,
    reset,
  };
};
