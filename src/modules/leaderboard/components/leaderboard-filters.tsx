import Link from 'next/link';

import { Card } from '@/components/ui';
import { GAME_MODES, type GameModeId } from '@/modules/game/config/modes';
import { type Language } from '@/types';
import { SUPPORTED_LANGUAGES } from '@/modules/game/config/constants';

const gameModes = GAME_MODES.map(mode => ({
	value: mode.id,
	label: mode.filterLabel
}));

const languages = Object.values(SUPPORTED_LANGUAGES).map(lang => ({
	value: lang.code as Language,
	label: `${lang.flag} ${lang.name}`,
	enabled: lang.enabled
}));

type LeaderboardFiltersProps = {
	currentMode: GameModeId;
	currentLanguage: Language;
};

const buildUrl = (mode: GameModeId, language: Language) =>
	`/leaderboard?mode=${mode}&language=${language}`;

const LeaderboardFilters = ({
	currentMode,
	currentLanguage
}: LeaderboardFiltersProps) => (
	<Card className="mb-8">
		<div className="flex flex-wrap justify-center gap-6">
			{/* Game Mode */}
			<div>
				<p className="mb-2 text-center text-sm text-surface-500">
					Mode
				</p>
				<div className="flex gap-2">
					{gameModes.map(mode => (
						<Link
							key={mode.value}
							href={buildUrl(mode.value, currentLanguage)}
							className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
								currentMode === mode.value
									? 'bg-primary-500 text-white'
									: 'bg-surface-100 text-surface-600 hover:bg-surface-200'
							}`}
						>
							{mode.label}
						</Link>
					))}
				</div>
			</div>

			{/* Language */}
			<div>
				<p className="mb-2 text-center text-sm text-surface-500">
					Language
				</p>
				<div className="flex gap-2">
					{languages.map(lang =>
						lang.enabled ? (
							<Link
								key={lang.value}
								href={buildUrl(currentMode, lang.value)}
								className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
									currentLanguage === lang.value
										? 'bg-accent-500 text-white'
										: 'bg-surface-100 text-surface-600 hover:bg-surface-200'
								}`}
							>
								{lang.label}
							</Link>
						) : (
							<span
								key={lang.value}
								className="cursor-not-allowed rounded-lg bg-surface-100 px-4 py-2 text-sm font-medium text-surface-400 opacity-50"
								title="Coming soon"
							>
								{lang.label}
							</span>
						)
					)}
				</div>
			</div>
		</div>
	</Card>
);

export default LeaderboardFilters;
