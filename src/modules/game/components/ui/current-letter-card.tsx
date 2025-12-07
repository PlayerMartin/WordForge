import { Card } from '@/components/ui';

type CurrentLetterCardProps = {
	letter: string;
	label?: string;
	challengePart?: string | null;
};

const CurrentLetterCard = ({
	label = 'Your word must start with',
	letter,
	challengePart
}: CurrentLetterCardProps) => {
	if (!challengePart) {
		return (
			<Card className="mb-6 text-center">
				<p className="mb-2 text-sm text-surface-500">{label}</p>
				<div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400">
					<span className="text-5xl font-bold text-white">
						{letter}
					</span>
				</div>
			</Card>
		);
	}

	return (
		<Card className="mb-6">
			<p className="mb-3 text-center text-sm text-surface-500">
				Your word must:
			</p>

			<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<div className="text-center">
					<p className="mb-1 text-xs font-semibold uppercase tracking-wide text-surface-400">
						Start with
					</p>
					<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400">
						<span className="text-4xl font-bold text-white">
							{letter}
						</span>
					</div>
				</div>

				<div className="text-center">
					<p className="mb-1 text-xs font-semibold uppercase tracking-wide text-surface-400">
						Contain
					</p>
					<div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400">
						<span className="text-3xl font-bold text-white">
							{challengePart}
						</span>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default CurrentLetterCard;
