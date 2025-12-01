// modules/game/hooks/use-game-end.ts
"use client";

import { useCallback, useState } from "react";
import { FinishGame } from "@/actions/gameActions";

type GameEndPayload = {
  score: number;
  wordsUsed: string[];
};

type UseGameEndOptions = {
  gameId: string;
  getPayload: () => GameEndPayload;
};

export const useGameEnd = ({ gameId, getPayload }: UseGameEndOptions) => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const endGame = useCallback(async () => {
    if (isGameOver || isFinishing) return;

    setIsGameOver(true);
    setIsFinishing(true);

    try {
      const payload = getPayload();
      await FinishGame(gameId, payload);
    } catch (err) {
      console.error("Failed to finish game", err);
    } finally {
      setIsFinishing(false);
    }
  }, [gameId, getPayload, isGameOver, isFinishing]);

  return {
    isGameOver,
    isFinishing,
    endGame,
  };
};
