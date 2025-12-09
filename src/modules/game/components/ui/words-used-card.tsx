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
	<Card className="p-6">
		<div className="mb-5 flex items-center justify-between">
			<h3 className="text-lg font-semibold text-surface-900">{title}</h3>
			<span className="text-base text-surface-500">
				{words.length} {words.length === 1 ? 'word' : 'words'}
			</span>
		</div>
		{words.length > 0 ? (
			<div className="flex flex-wrap gap-3">
				{words.map((word, index) => (
					<span
						key={`${word}-${index}`}
						className="rounded-full bg-surface-100 px-4 py-2 text-base text-surface-700"
					>
						{word}
					</span>
				))}
			</div>
		) : (
			<p className="py-6 text-center text-lg text-surface-400">
				{emptyText}
			</p>
		)}
	</Card>
);

export default WordsUsedCard;
