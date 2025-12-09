type GameInfoNoteProps = {
	children: React.ReactNode;
};

const GameInfoNote = ({ children }: GameInfoNoteProps) => (
	<div className="mt-8 text-center text-lg text-surface-500">{children}</div>
);

export default GameInfoNote;
