// modules/game/hooks/use-word-input.ts
"use client";

import { useState } from "react";
import { validateWordLocally } from "@/modules/game/utils/validation";
import type { Feedback } from "@/modules/game/components/forms/word-input-form";
import { useCheckWord } from "./use-validation";
import { Language } from "@/types";

type UseWordInputOptions = {
  currentLetter: string;
  language: Language;
  usedWords: string[];
  canSubmit: boolean;
  onValidWord: (rawInput: string) => Promise<void> | void;
};

export const useWordInput = ({
  currentLetter,
  language,
  usedWords,
  canSubmit,
  onValidWord,
}: UseWordInputOptions) => {
  const [wordInput, setWordInput] = useState("");
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
      requiredLetter: currentLetter,
      usedWords,
    });

    if (!localRes.valid) {
      setFeedback({
        type: "error",
        message: localRes.message ?? "Invalid word",
      });
      setIsSubmitting(false);
      return;
    }

    const apiRes = await wordCheckMutation.mutateAsync({
      language: language,
      word: wordInput,
    });

    if (!apiRes.ok) {
      setFeedback({
        type: "error",
        message: apiRes.msg ?? "Error",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await onValidWord(wordInput);
      setWordInput("");
      // leave feedback as whatever onValidWord decided (success, etc.)
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
    handleSubmit,
  };
};
