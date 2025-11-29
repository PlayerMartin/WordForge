// modules/game/components/modes/length-mode-client.tsx
"use client";

import { DbGame } from "@/types/game";
import { useState } from "react";
import { getLengthModeScore } from "@/modules/game/utils/scoring";
import {
  normalizeWord,
  validateWordLocally,
} from "@/modules/game/utils/validation";
import WordInputForm, {
  Feedback,
} from "@/modules/game/components/forms/word-input-form";
import CurrentLetterCard from "@/modules/game/components/ui/current-letter-card";
import ScoreDisplay from "@/modules/game/components/ui/score-display";
import WordsUsedCard from "@/modules/game/components/ui/words-used-card";
import GameInfoNote from "@/modules/game/components/ui/game-info-note";

interface LengthModeClientProps {
  game: DbGame;
}

const LengthModeClient = ({ game }: LengthModeClientProps) => {
  const [wordsUsed, setWordsUsed] = useState<string[]>(
    Array.isArray(game.wordsUsed) ? game.wordsUsed : []
  );

  const [currentLetter, setCurrentLetter] = useState(
    wordsUsed.length > 0
      ? wordsUsed[wordsUsed.length - 1].slice(-1).toUpperCase()
      : "A"
  );

  const [wordInput, setWordInput] = useState("");
  const [score, setScore] = useState(game.score ?? 0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordInput.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setFeedback(null);

    const result = validateWordLocally({
      rawInput: wordInput,
      requiredLetter: currentLetter,
      usedWords: wordsUsed,
    });

    if (!result.valid) {
      setFeedback({
        type: "error",
        message: result.message ?? "Invalid word",
      });
      setIsSubmitting(false);
      return;
    }

    const word = normalizeWord(wordInput);
    const newLetter = word.charAt(word.length - 1).toUpperCase();
    const wordScore = getLengthModeScore(word);

    setWordsUsed((prev) => [...prev, word]);
    setCurrentLetter(newLetter);
    setScore((prev) => prev + wordScore);
    setWordInput("");
    setFeedback({ type: "success", message: `+${wordScore} points!` });
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ScoreDisplay score={score} />
      <CurrentLetterCard letter={currentLetter} />
      <WordInputForm
        currentLetter={currentLetter}
        wordInput={wordInput}
        onWordChange={setWordInput}
        onSubmit={handleSubmitWord}
        isSubmitting={isSubmitting}
        feedback={feedback}
      />
      <WordsUsedCard words={wordsUsed} />
      <GameInfoNote>
        Longer words = more points (2^length)
      </GameInfoNote>
    </div>
  );
};

export default LengthModeClient;
