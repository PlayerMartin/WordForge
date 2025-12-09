import { Card } from '@/components/ui';

type LanguageButtonProps = {
	name: string;
	code: string;
	enabled: boolean;
	selected: boolean;
	onClick: () => void;
};

export const LanguageButton = ({
	name,
	code,
	enabled,
	selected,
	onClick
}: LanguageButtonProps) => (
	<button onClick={onClick} disabled={!enabled}>
		<Card
			padding="sm"
			className={`px-6 transition-all ${
				selected
					? 'scale-105 border-2 border-primary-500 bg-surface-800 ring-1 ring-primary-400/30'
					: 'border border-surface-900 bg-surface-900'
			} ${enabled ? '' : 'opacity-40 saturate-50 backdrop-blur-[1px]'} `}
		>
			<div>
				<span className="mr-2 font-bold text-primary-400">{code}</span>
				<span
					className={`font-medium text-white ${enabled ? '' : 'text-opacity-50'}`}
				>
					{name}
				</span>
			</div>
			<div className="h-4">
				{!enabled && (
					<span className="text-xs text-white text-opacity-50">
						Coming soon
					</span>
				)}
			</div>
		</Card>
	</button>
);
