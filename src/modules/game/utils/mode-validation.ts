import {
	GAME_MODE_BY_ID,
	type GameModeId,
	type GameModeConfig
} from '@/modules/game/config/modes';
import { GAME_ERRORS } from '@/constants/error-messages';

export const getValidatedModeConfig = (modeId: GameModeId): GameModeConfig => {
	const modeConfig = GAME_MODE_BY_ID[modeId];

	if (!modeConfig) {
		throw new Error(GAME_ERRORS.INVALID_MODE(modeId));
	}

	return modeConfig;
};
