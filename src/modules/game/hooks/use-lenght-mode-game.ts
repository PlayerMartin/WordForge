// modules/game/hooks/use-length-mode-game.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import { DbGame } from "@/types/game";
import { GAME_TIMERS } from "@/modules/game/config/constants";
import { validateWordLocally } from "@/modules/game/utils/validation";
import { GameSnapshot, createSnapshotFromDb, applyWord } from "@/modules/game/core/engine";
import { FinishGame, UpdateGameProgress } from "@/actions/gameActions";
import type { Feedback } from "@/modules/game/components/forms/word-input-form";

export const useLengthModeGame = (game: DbGame) => {
  const [snapshot, setSnapshot] = useState<GameSnapshot>(() =>
    createSnapshotFromDb(game)
  );
  const [wordInput, setWordInput] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [turnTimeLeft, setTurnTimeLeft] = useState<number>(
    GAME_TIMERS.DEFAULT_TURN_TIME
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [isFinishing, setIsFinishing] = useState(false);

  const endGame = useCallback(async () => {
    if (isFinishing || isGameOver) return;

    setIsGameOver(true);
    setIsFinishing(true);

    try {
      await FinishGame(game.id, {
        score: snapshot.score,
        wordsUsed: snapshot.wordsUsed,
      });
    } catch (err) {
      console.error("Failed to finish game", err);
    } finally {
      setIsFinishing(false);
    }
  }, [game.id, snapshot.score, snapshot.wordsUsed, isFinishing, isGameOver]);

  useEffect(() => {
    if (isGameOver) return;
    setTurnTimeLeft(GAME_TIMERS.DEFAULT_TURN_TIME);
  }, [snapshot.wordsUsed.length, isGameOver]);

  useEffect(() => {
    if (isGameOver) return;

    if (turnTimeLeft <= 0) {
      void endGame();
      return;
    }

    const id = window.setInterval(() => {
      setTurnTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearInterval(id);
  }, [turnTimeLeft, isGameOver, endGame]);

  const handleSubmitWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordInput.trim() || isSubmitting || isGameOver) return;

    setIsSubmitting(true);
    setFeedback(null);

    const result = validateWordLocally({
      rawInput: wordInput,
      requiredLetter: snapshot.currentLetter,
      usedWords: snapshot.wordsUsed,
    });

    if (!result.valid) {
      setFeedback({
        type: "error",
        message: result.message ?? "Invalid word",
      });
      setIsSubmitting(false);
      return;
    }

    const nextSnapshot = applyWord(snapshot, wordInput);

    setSnapshot(nextSnapshot);
    setWordInput("");
    setFeedback({
      type: "success",
      message: `+${nextSnapshot.score - snapshot.score} points!`,
    });
    setIsSubmitting(false);

    try {
      await UpdateGameProgress(game.id, {
        score: nextSnapshot.score,
        wordsUsed: nextSnapshot.wordsUsed,
      });
    } catch (err) {
      console.error("Failed to sync game progress", err);
    }
  };

  return {
    snapshot,
    wordInput,
    setWordInput,
    feedback,
    isSubmitting: isSubmitting || isFinishing,
    turnTimeLeft,
    isGameOver,
    handleSubmitWord,
  };
};
