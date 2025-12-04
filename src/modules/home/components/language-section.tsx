import Card from '../../../components/ui/card';

const LANGUAGES = [
	{ code: 'EN', name: 'English', isReady: true },
	{ code: 'CZ', name: 'Czech', isReady: false },
	{ code: 'SK', name: 'Slovak', isReady: false }
];

const LanguageSection = () => (
	<div className="mx-auto max-w-5xl text-center">
		<h2 className="mb-2 text-2xl font-bold text-surface-900">
			Multiple Languages
		</h2>
		<div className="flex justify-center gap-4">
			{LANGUAGES.map(lang => (
				<Card
					padding="sm"
					className={`border-2 border-primary-500 bg-surface-900 px-6 ${lang.isReady ? '' : 'opacity-50'}`}
					key={lang.code}
				>
					<span className="mr-2 font-bold text-primary-400">
						{lang.code}
					</span>
					<span className="font-medium text-white">{lang.name}</span>
					{!lang.isReady && (
						<span className="block text-xs text-surface-400">
							Coming soon
						</span>
					)}
				</Card>
			))}
		</div>
	</div>
);

export default LanguageSection;
