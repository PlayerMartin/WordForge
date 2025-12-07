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

const buildUrl = (mode: GameModeId, language: Language) =>
	`/leaderboard?mode=${mode}&language=${language}`;

type FilterButtonProps = {
	href: string;
	isActive: boolean;
	activeColor?: string;
	children: React.ReactNode;
};

const FilterButton = ({
	href,
	isActive,
	activeColor = 'bg-primary-500',
	children
}: FilterButtonProps) => (
	<Link
		href={href}
		className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
			isActive
				? `${activeColor} text-white`
				: 'bg-surface-100 text-surface-600 hover:bg-surface-200'
		}`}
	>
		{children}
	</Link>
);

type DisabledFilterButtonProps = {
	children: React.ReactNode;
};

const DisabledFilterButton = ({ children }: DisabledFilterButtonProps) => (
	<span
		className="cursor-not-allowed rounded-lg bg-surface-100 px-4 py-2 text-sm font-medium text-surface-400 opacity-50"
		title="Coming soon"
	>
		{children}
	</span>
);

type ModeFilterProps = {
	currentMode: GameModeId;
	currentLanguage: Language;
};

const ModeFilter = ({ currentMode, currentLanguage }: ModeFilterProps) => (
	<div>
		<p className="mb-2 text-center text-sm text-surface-500">Mode</p>
		<div className="flex gap-2">
			{gameModes.map(mode => (
				<FilterButton
					key={mode.value}
					href={buildUrl(mode.value, currentLanguage)}
					isActive={currentMode === mode.value}
				>
					{mode.label}
				</FilterButton>
			))}
		</div>
	</div>
);

type LanguageFilterProps = {
	currentMode: GameModeId;
	currentLanguage: Language;
};

const LanguageFilter = ({
	currentMode,
	currentLanguage
}: LanguageFilterProps) => (
	<div>
		<p className="mb-2 text-center text-sm text-surface-500">Language</p>
		<div className="flex gap-2">
			{languages.map(lang =>
				lang.enabled ? (
					<FilterButton
						key={lang.value}
						href={buildUrl(currentMode, lang.value)}
						isActive={currentLanguage === lang.value}
						activeColor="bg-accent-500"
					>
						{lang.label}
					</FilterButton>
				) : (
					<DisabledFilterButton key={lang.value}>
						{lang.label}
					</DisabledFilterButton>
				)
			)}
		</div>
	</div>
);

type LeaderboardFiltersProps = {
	currentMode: GameModeId;
	currentLanguage: Language;
};

const LeaderboardFilters = ({
	currentMode,
	currentLanguage
}: LeaderboardFiltersProps) => (
	<Card className="mb-8">
		<div className="flex flex-wrap justify-center gap-6">
			<ModeFilter
				currentMode={currentMode}
				currentLanguage={currentLanguage}
			/>
			<LanguageFilter
				currentMode={currentMode}
				currentLanguage={currentLanguage}
			/>
		</div>
	</Card>
);

export default LeaderboardFilters;
