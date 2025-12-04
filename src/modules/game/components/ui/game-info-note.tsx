'use client';

type GameInfoNoteProps = {
	children: React.ReactNode;
};

const GameInfoNote = ({ children }: GameInfoNoteProps) => (
	<div className="mt-6 text-center text-sm text-surface-500">{children}</div>
);

export default GameInfoNote;
