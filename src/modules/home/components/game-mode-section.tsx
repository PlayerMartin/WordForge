import { GAME_MODES, type GameModeId } from '@/modules/game/config/modes';
import { GameModeButton } from './game-mode-button';

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
				return (
					<GameModeButton
						key={mode.id}
						mode={mode}
						isSelected={selectedModeId === mode.id}
						onChange={onChange}
					/>
				);
			})}
		</div>
	</div>
);

export default GameModeSection;
