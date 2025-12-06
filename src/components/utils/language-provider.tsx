'use client';

import { Language } from '@/types';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const LanguageContext = createContext<Language>('EN');

export const useLanguageContext = () => {
	const lang = useContext(LanguageContext);

	if (!lang) {
		throw new Error(
			'useLanguageContext must be used within a LanguageContextProvider'
		);
	}

	return lang;
};

export const LanguageContextProvider = ({ children }: PropsWithChildren) => {
	const [lang, setLang] = useState<Language>('EN');

	return (
		<LanguageContext.Provider value={lang}>
			{children}
		</LanguageContext.Provider>
	);
};
