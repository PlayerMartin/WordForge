'use client';

import { useState } from 'react';

import type { Language, WordValidationResult } from '@/types';
import type { Feedback } from '@/modules/game/components/forms/word-input-form';

import { validateWordLocally } from '../utils/validation';

import { useCheckWord } from './use-validation';

type UseWordInputOptions = {
	currentLetter: string;
	language: Language;
	usedWords: string[];
	canSubmit: boolean;
	challengePart?: string | null;
	onValidWord: (rawInput: string) => Promise<void> | void;
	onLocalValidationError?: (result: WordValidationResult) => void;
};

export const useWordInput = ({
	currentLetter,
	language,
	usedWords,
	canSubmit,
	challengePart,
	onValidWord,
	onLocalValidationError
}: UseWordInputOptions) => {
	const [wordInput, setWordInput] = useState('');
	const [feedback, setFeedback] = useState<Feedback>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const wordCheckMutation = useCheckWord();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!canSubmit || isSubmitting || !wordInput.trim()) return;

		setIsSubmitting(true);
		setFeedback(null);

		const localRes = validateWordLocally({
			rawInput: wordInput,
			startLetter: currentLetter,
			usedWords,
			challengePart
		});

		if (!localRes.valid) {
			onLocalValidationError?.(localRes);

			setFeedback({
				type: 'error',
				message: localRes.message ?? 'Invalid word'
			});
			setIsSubmitting(false);
			return;
		}

		const apiRes = await wordCheckMutation.mutateAsync({
			language,
			word: wordInput
		});

		if (!apiRes.ok) {
			setFeedback({
				type: 'error',
				message: apiRes.msg ?? 'Error'
			});
			setIsSubmitting(false);
			return;
		}

		try {
			await onValidWord(wordInput);
			setWordInput('');
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		wordInput,
		setWordInput,
		feedback,
		setFeedback,
		isSubmitting,
		handleSubmit
	};
};
