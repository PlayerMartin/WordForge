'use client';

import { SUPPORTED_LANGUAGES } from '@/modules/game/config/constants';
import Card from '../../../components/ui/card';
import { useLanguageContext } from '@/components/utils/language-provider';

const LanguageSection = () => {
	const { language, setLanguage } = useLanguageContext();

	return (
		<div className="mx-auto max-w-5xl text-center">
			<h2 className="mb-2 text-2xl font-bold text-surface-900">
				Multiple Languages
			</h2>
			<div className="flex justify-center gap-4">
				{Object.values(SUPPORTED_LANGUAGES).map(lang => (
					<button
						key={lang.code}
						onClick={() => {
							if (lang.enabled) {
								setLanguage(lang.code);
							}
						}}
						disabled={!lang.enabled}
					>
						<Card
							padding="sm"
							className={`px-6 transition-all ${
								lang.code === language
									? 'scale-105 border-2 border-primary-500 bg-surface-800 ring-1 ring-primary-400/30'
									: 'border border-surface-900 bg-surface-900'
							} ${
								lang.enabled
									? ''
									: 'opacity-40 saturate-50 backdrop-blur-[1px]'
							} `}
							key={lang.code}
						>
							<span className="mr-2 font-bold text-primary-400">
								{lang.code}
							</span>
							<span
								className={`font-medium text-white ${lang.enabled ? '' : 'text-opacity-50'}`}
							>
								{lang.name}
							</span>
						</Card>
					</button>
				))}
			</div>
		</div>
	);
};

export default LanguageSection;
