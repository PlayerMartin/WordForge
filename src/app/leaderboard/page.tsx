import { Suspense } from 'react';

import { GAME_MODES, type GameModeId } from '@/modules/game/config/modes';
import { SUPPORTED_LANGUAGES } from '@/modules/game/config/constants';
import { type Language } from '@/types';
import {
	LeaderboardSection,
	LeaderboardSkeleton,
	LeaderboardFilters
} from '@/modules/leaderboard/components';

type LeaderboardPageProps = {
	searchParams: Promise<{
		mode?: string;
		language?: string;
	}>;
};

const VALID_MODES = GAME_MODES.map(m => m.id);
const VALID_LANGUAGES = Object.values(SUPPORTED_LANGUAGES).map(l => l.code);

const LeaderboardPage = async ({ searchParams }: LeaderboardPageProps) => {
	const params = await searchParams;

	const mode = VALID_MODES.includes(params.mode as GameModeId)
		? (params.mode as GameModeId)
		: 'length';

	const language = VALID_LANGUAGES.includes(params.language as Language)
		? (params.language as Language)
		: 'EN';

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mx-auto max-w-4xl">
				<h1 className="mb-8 text-center text-3xl font-bold text-surface-900">
					Leaderboard
				</h1>

				<LeaderboardFilters
					currentMode={mode}
					currentLanguage={language}
				/>

				<Suspense
					key={`${mode}-${language}`}
					fallback={<LeaderboardSkeleton />}
				>
					<LeaderboardSection mode={mode} language={language} />
				</Suspense>
			</div>
		</div>
	);
};

export default LeaderboardPage;
