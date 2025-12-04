// modules/game/components/modes/length-mode-client.tsx
"use client";

import { DbGame } from "@/types/game";
import ScoreDisplay from "@/modules/game/components/ui/score-display";
import CurrentLetterCard from "@/modules/game/components/ui/current-letter-card";
import WordInputForm from "@/modules/game/components/forms/word-input-form";
import WordsUsedCard from "@/modules/game/components/ui/words-used-card";
import GameInfoNote from "@/modules/game/components/ui/game-info-note";
import { GAME_TIMERS } from "../../config/constants";
import { useLengthModeGame } from "../../hooks/use-lenght-mode-game";
import Timer from "../ui/timer";

interface LengthModeClientProps {
  game: DbGame;
}

const LengthModeClient = ({ game }: LengthModeClientProps) => {
  const {
    snapshot,
    wordInput,
    setWordInput,
    feedback,
    isSubmitting,
    turnTimeLeft,
    gameTimeLeft,
    isGameOver,
    handleSubmitWord,
  } = useLengthModeGame(game);

  const wordCount = snapshot.wordsUsed.length;

  if (isGameOver) {
    return (
      <div className="max-w-2xl mx-auto">
        <ScoreDisplay score={snapshot.score} />
        <WordsUsedCard words={snapshot.wordsUsed} />
        <GameInfoNote>
          Time&apos;s up! Final score: <strong>{snapshot.score}</strong> points,{" "}
          <strong>{wordCount}</strong> {wordCount === 1 ? "word" : "words"}.
        </GameInfoNote>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Timer
        totalSeconds={GAME_TIMERS.DEFAULT_GAME_TIME}
        remainingSeconds={gameTimeLeft}
      />

      <ScoreDisplay score={snapshot.score} />
      <CurrentLetterCard letter={snapshot.currentLetter} />

      <Timer
        totalSeconds={GAME_TIMERS.DEFAULT_TURN_TIME}
        remainingSeconds={turnTimeLeft}
      />

      <WordInputForm
        currentLetter={snapshot.currentLetter}
        wordInput={wordInput}
        onWordChange={setWordInput}
        onSubmit={handleSubmitWord}
        isSubmitting={isSubmitting}
        feedback={feedback}
      />
      <WordsUsedCard words={snapshot.wordsUsed} />
      <GameInfoNote>Longer words = more points (2^length)</GameInfoNote>
    </div>
  );
};

export default LengthModeClient;
