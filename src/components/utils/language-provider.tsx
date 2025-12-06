'use client';

import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState
} from 'react';

import { type Language } from '@/types';

type LanguageContextValue = {
	language: Language;
	setLanguage: (l: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const useLanguageContext = () => {
	const language = useContext(LanguageContext);

	if (!language) {
		throw new Error(
			'useLanguageContext must be used within a LanguageContextProvider'
		);
	}

	return language;
};

export const LanguageContextProvider = ({ children }: PropsWithChildren) => {
	const [language, setLanguage] = useState<Language>('EN');

	return (
		<LanguageContext.Provider value={{ language, setLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};
