type ScoreDisplayProps = {
	score: number;
	label?: string;
};

const ScoreDisplay = ({ score, label = 'Score' }: ScoreDisplayProps) => (
	<div className="mb-8 text-center">
		<p className="mb-1 text-sm text-surface-500">{label}</p>
		<p className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-5xl font-bold text-transparent">
			{score}
		</p>
	</div>
);

export default ScoreDisplay;
