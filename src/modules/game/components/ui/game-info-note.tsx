// modules/game/components/ui/game-info-note.tsx
"use client";

type GameInfoNoteProps = {
  children: React.ReactNode;
};

const GameInfoNote = ({ children }: GameInfoNoteProps) => {
  return (
    <div className="mt-6 text-center text-sm text-surface-400">
      {children}
    </div>
  );
};

export default GameInfoNote;
