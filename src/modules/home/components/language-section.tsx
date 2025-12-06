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
						className=""
					>
						<Card
							padding="sm"
							className={`${lang.code === language ? 'border-2 border-primary-500' : 'border-1 border-surface-900'} bg-surface-900 px-6 ${lang.enabled ? '' : 'opacity-50'}`}
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
