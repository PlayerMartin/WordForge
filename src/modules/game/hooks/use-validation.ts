import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { type Language } from '@/types';

const DictionaryEntrySchema = z.object({
	entries: z.array(z.unknown())
});

const requestWord = async (language: Language, word: string) => {
	const lang = language === 'CZ' ? 'cs' : language.toLocaleLowerCase();

	const res = await fetch(
		`https://freedictionaryapi.com/api/v1/entries/${lang}/${word}`
	);

	if (res.status >= 500 && res.status < 600) {
		return { ok: false, msg: 'Validation API not reachable' };
	}

	if (res.status === 429) {
		return { ok: false, msg: 'Exceeded API limit' };
	}

	const json = await res.json();

	const parsed = DictionaryEntrySchema.safeParse(json);

	if (!parsed.success) {
		return { ok: false, msg: 'Invalid API format received' };
	}

	const data = parsed.data;

	if (!data.entries || data.entries.length === 0) {
		return { ok: false, msg: 'Word does not exist' };
	}

	return { ok: true };
};

export const useCheckWord = () =>
	useMutation({
		mutationFn: ({
			language,
			word
		}: {
			language: Language;
			word: string;
		}) => requestWord(language, word)
	});
