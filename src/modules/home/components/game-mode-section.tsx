import { Card } from '@/components/ui';
import { GAME_MODES, type GameModeId } from '@/modules/game/config/modes';

type GameModeSectionProps = {
	selectedModeId: GameModeId;
	onChange: (modeId: GameModeId) => void;
};

const GameModeSection = ({
	selectedModeId,
	onChange
}: GameModeSectionProps) => (
	<div>
		<h2 className="mb-4 text-2xl font-bold text-surface-900">Game Modes</h2>
		<div
			className="flex flex-col gap-4"
			role="radiogroup"
			aria-label="Game modes"
		>
			{GAME_MODES.map(mode => {
				const isSelected = selectedModeId === mode.id;

				return (
					<button
						key={mode.id}
						type="button"
						onClick={() => onChange(mode.id)}
						role="radio"
						aria-checked={isSelected}
						className="text-left"
					>
						<Card
							hover
							className={[
								'border-l-4 bg-surface-900 transition-all',
								mode.borderColor,
								isSelected
									? 'scale-[1.01] border-primary-500 ring-2 ring-primary-400'
									: 'border-transparent hover:border-surface-700'
							].join(' ')}
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

								{/* Selection indicator */}
								<span
									className={[
										'flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold',
										isSelected
											? 'border-primary-500 bg-primary-500 text-white'
											: 'border-surface-500 text-surface-500'
									].join(' ')}
								>
									{isSelected ? '✓' : ''}
								</span>
							</div>
						</Card>
					</button>
				);
			})}
		</div>
	</div>
);

export default GameModeSection;
