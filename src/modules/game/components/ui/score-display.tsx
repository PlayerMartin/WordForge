type ScoreDisplayProps = {
	score: number;
	label?: string;
};

const ScoreDisplay = ({ score, label = 'Score' }: ScoreDisplayProps) => (
	<div className="mb-10 text-center">
		<p className="mb-2 text-lg text-surface-500">{label}</p>
		<p className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-7xl font-bold text-transparent">
			{score}
		</p>
	</div>
);

export default ScoreDisplay;
