// modules/game/components/ui/current-letter-card.tsx
"use client";

import { Card } from "@/components/ui";

type CurrentLetterCardProps = {
  label?: string;
  letter: string;
};

const CurrentLetterCard = ({
  label = "Your word must start with",
  letter,
}: CurrentLetterCardProps) => {
  return (
    <Card className="mb-6 text-center">
      <p className="text-sm text-surface-500 mb-2">{label}</p>
      <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <span className="text-5xl font-bold text-white">{letter}</span>
      </div>
    </Card>
  );
};

export default CurrentLetterCard;
