import { Card } from '@/components/ui';
import {
	type GameModeConfig,
	type GameModeId
} from '@/modules/game/config/modes';

type GameModeButtonProps = {
	mode: GameModeConfig;
	isSelected: boolean;
	onChange: (modeId: GameModeId) => void;
};

export const GameModeButton = ({
	mode,
	isSelected,
	onChange
}: GameModeButtonProps) => (
	<button
		type="button"
		onClick={() => onChange(mode.id)}
		role="radio"
		aria-checked={isSelected}
		className="text-left"
	>
		<Card
			hover
			className={`transition-all' border-l-4 bg-surface-900 ${mode.borderColor} ${
				isSelected
					? 'scale-[1.01] border-primary-500 ring-2 ring-primary-400 hover:border-primary-500'
					: 'border-transparent hover:border-surface-700'
			}`}
		>
			<div className="flex items-center justify-between gap-4">
				<div>
					<h3 className="mb-1 font-semibold text-white">
						{mode.title}
					</h3>
					<p className="text-sm text-surface-300">
						{mode.description}
					</p>
				</div>

				<span
					className={`font-bold' flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
						isSelected
							? 'border-primary-500 bg-primary-500 text-white'
							: 'border-surface-500 text-surface-500'
					}`}
				>
					{isSelected ? '✓' : ''}
				</span>
			</div>
		</Card>
	</button>
);
