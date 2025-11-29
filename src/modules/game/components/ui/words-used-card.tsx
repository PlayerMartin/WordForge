// modules/game/components/ui/words-used-card.tsx
"use client";

import { Card } from "@/components/ui";

type WordsUsedCardProps = {
  words: string[];
  title?: string;
  emptyText?: string;
};

const WordsUsedCard = ({
  words,
  title = "Words Used",
  emptyText = "No words yet. Start typing!",
}: WordsUsedCardProps) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-surface-900">{title}</h3>
        <span className="text-sm text-surface-500">
          {words.length} {words.length === 1 ? "word" : "words"}
        </span>
      </div>
      {words.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="px-3 py-1 bg-surface-100 text-surface-700 rounded-full text-sm"
            >
              {word}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-surface-400 text-center py-4">{emptyText}</p>
      )}
    </Card>
  );
};

export default WordsUsedCard;
