// modules/game/hooks/use-word-input.ts
"use client";

import { useState } from "react";
import { validateWordLocally } from "@/modules/game/utils/validation";
import type { Feedback } from "@/modules/game/components/forms/word-input-form";

type UseWordInputOptions = {
  currentLetter: string;
  usedWords: string[];
  canSubmit: boolean;
  onValidWord: (rawInput: string) => Promise<void> | void;
};

export const useWordInput = ({
  currentLetter,
  usedWords,
  canSubmit,
  onValidWord,
}: UseWordInputOptions) => {
  const [wordInput, setWordInput] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || isSubmitting || !wordInput.trim()) return;

    setIsSubmitting(true);
    setFeedback(null);

    const result = validateWordLocally({
      rawInput: wordInput,
      requiredLetter: currentLetter,
      usedWords,
    });

    if (!result.valid) {
      setFeedback({
        type: "error",
        message: result.message ?? "Invalid word",
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
    setFeedback,     // ✅ expose setter so caller can set success message
    isSubmitting,
    handleSubmit,
  };
};
