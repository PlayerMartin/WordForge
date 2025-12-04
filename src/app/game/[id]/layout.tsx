type GameLayoutProps = {
	children: React.ReactNode;
	params: { id: string };
};

const GameLayout = ({ children }: GameLayoutProps) => (
	<div>
		<main className="container mx-auto px-4 py-8">{children}</main>
	</div>
);

export default GameLayout;
