// modules/game/components/ui/score-display.tsx
"use client";

type ScoreDisplayProps = {
  score: number;
  label?: string;
};

const ScoreDisplay = ({ score, label = "Score" }: ScoreDisplayProps) => {
  return (
    <div className="text-center mb-8">
      <p className="text-sm text-surface-500 mb-1">{label}</p>
      <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
        {score}
      </p>
    </div>
  );
};

export default ScoreDisplay;
