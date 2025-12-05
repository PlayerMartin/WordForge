import { Card } from '@/components/ui';

type WordsUsedCardProps = {
	words: string[];
	title?: string;
	emptyText?: string;
};

const WordsUsedCard = ({
	words,
	title = 'Words Used',
	emptyText = 'No words yet. Start typing!'
}: WordsUsedCardProps) => (
	<Card>
		<div className="mb-4 flex items-center justify-between">
			<h3 className="font-semibold text-surface-900">{title}</h3>
			<span className="text-sm text-surface-500">
				{words.length} {words.length === 1 ? 'word' : 'words'}
			</span>
		</div>
		{words.length > 0 ? (
			<div className="flex flex-wrap gap-2">
				{words.map((word, index) => (
					<span
						key={`${word}-${index}`}
						className="rounded-full bg-surface-100 px-3 py-1 text-sm text-surface-700"
					>
						{word}
					</span>
				))}
			</div>
		) : (
			<p className="py-4 text-center text-surface-400">{emptyText}</p>
		)}
	</Card>
);

export default WordsUsedCard;
