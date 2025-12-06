'use client';

import { SUPPORTED_LANGUAGES } from '@/modules/game/config/constants';
import { useLanguageContext } from '@/components/utils/language-provider';
import { LanguageButton } from './language-button';

const LanguageSection = () => {
	const { language, setLanguage } = useLanguageContext();

	return (
		<div className="mx-auto max-w-5xl text-center">
			<h2 className="mb-2 text-2xl font-bold text-surface-900">
				Multiple Languages
			</h2>
			<div className="flex justify-center gap-4">
				{Object.values(SUPPORTED_LANGUAGES).map(lang => (
					<LanguageButton
						key={lang.code}
						{...lang}
						selected={lang.code === language}
						onClick={() => {
							if (lang.enabled) {
								setLanguage(lang.code);
							}
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default LanguageSection;
