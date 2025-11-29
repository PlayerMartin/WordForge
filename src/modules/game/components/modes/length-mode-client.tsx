// modules/game/components/modes/length-mode-client.tsx
"use client";

import { FinishGame } from "@/actions/gameActions";
import { Button, Card, Input } from "@/components/ui";
import { DbGame } from "@/types/game";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getLengthModeScore } from "../../utils/scoring";

interface LengthModeClientProps {
  game: DbGame;
}

const LengthModeClient = ({ game }: LengthModeClientProps) => {
  const router = useRouter();

  const [currentLetter, setCurrentLetter] = useState("A");
  const [wordInput, setWordInput] = useState("");
  const [score, setScore] = useState(game.score ?? 0);
  const [wordsUsed, setWordsUsed] = useState<string[]>(
    Array.isArray(game.wordsUsed) ? game.wordsUsed : []
  );
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (wordsUsed.length > 0) {
      const lastWord = wordsUsed[wordsUsed.length - 1];
      const lastChar = lastWord.charAt(lastWord.length - 1).toUpperCase();
      setCurrentLetter(lastChar);
    } else {
      setCurrentLetter("A"); // fallback – later you can make this random or from settings
    }
  }, []); // run once on mount

  const handleSubmitWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wordInput.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setFeedback(null);

    const word = wordInput.trim().toLowerCase();

    // Basic validation (frontend)
    if (!word.startsWith(currentLetter.toLowerCase())) {
      setFeedback({ type: "error", message: `Word must start with "${currentLetter}"` });
      setIsSubmitting(false);
      return;
    }

    if (wordsUsed.includes(word)) {
      setFeedback({ type: "error", message: "Word already used!" });
      setIsSubmitting(false);
      return;
    }

    if (word.length < 2) {
      setFeedback({ type: "error", message: "Word must be at least 2 characters" });
      setIsSubmitting(false);
      return;
    }

    // TODO: backend validation once dictionary support is ready

    const newLetter = word.charAt(word.length - 1).toUpperCase();
    const wordScore = getLengthModeScore(word);

    setWordsUsed((prev) => [...prev, word]);
    setCurrentLetter(newLetter);
    setScore((prev) => prev + wordScore);
    setWordInput("");
    setFeedback({ type: "success", message: `+${wordScore} points!` });
    setIsSubmitting(false);
  };

  const leaveGame = async () => {
    await FinishGame(game.id);
    router.push("/");
  };

  return (
    <>
      {/* Header */}
      <header className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary-600">
            WordForge
          </Link>
          <Button variant="ghost" size="sm" onClick={leaveGame}>
            Leave Game
          </Button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Score Display */}
          <div className="text-center mb-8">
            <p className="text-sm text-surface-500 mb-1">Score</p>
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
              {score}
            </p>
          </div>

          {/* Current Letter */}
          <Card className="mb-6 text-center">
            <p className="text-sm text-surface-500 mb-2">Your word must start with</p>
            <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl font-bold text-white">{currentLetter}</span>
            </div>
          </Card>

          {/* Word Input */}
          <Card className="mb-6">
            <form onSubmit={handleSubmitWord}>
              <div className="flex gap-3">
                <Input
                  placeholder={`Enter a word starting with "${currentLetter}"...`}
                  value={wordInput}
                  onChange={(e) => setWordInput(e.target.value)}
                  autoFocus
                  autoComplete="off"
                  className="text-lg"
                />
                <Button type="submit" loading={isSubmitting} size="lg">
                  Submit
                </Button>
              </div>
            </form>

            {/* Feedback */}
            {feedback && (
              <div
                className={`mt-4 p-3 rounded-lg text-center font-medium animate-fade-in ${
                  feedback.type === "success"
                    ? "bg-success-50 text-success-600"
                    : "bg-error-50 text-error-600"
                }`}
              >
                {feedback.message}
              </div>
            )}
          </Card>

          {/* Words Used */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-surface-900">Words Used</h3>
              <span className="text-sm text-surface-500">
                {wordsUsed.length} words
              </span>
            </div>
            {wordsUsed.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {wordsUsed.map((word, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-surface-100 text-surface-700 rounded-full text-sm"
                  >
                    {word}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-surface-400 text-center py-4">
                No words yet. Start typing!
              </p>
            )}
          </Card>

          {/* Game Info */}
          <div className="mt-6 text-center text-sm text-surface-400">
            <p>Longer words = more points (2^length)</p>
          </div>
        </div>
      </main>
    </>
  );
};

export default LengthModeClient;
