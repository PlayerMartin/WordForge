// modules/game/components/forms/word-input-form.tsx
"use client";

import { Button, Card, Input } from "@/components/ui";

export type Feedback =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

type WordInputFormProps = {
  currentLetter: string;
  wordInput: string;
  onWordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  feedback: Feedback;
};

const WordInputForm = ({
  currentLetter,
  wordInput,
  onWordChange,
  onSubmit,
  isSubmitting,
  feedback,
}: WordInputFormProps) => {
  return (
    <Card className="mb-6">
      <form onSubmit={onSubmit}>
        <div className="flex gap-3">
          <Input
            placeholder={`Enter a word starting with "${currentLetter}"...`}
            value={wordInput}
            onChange={(e) => onWordChange(e.target.value)}
            autoFocus
            autoComplete="off"
            className="text-lg"
          />
          <Button type="submit" loading={isSubmitting} size="lg">
            Submit
          </Button>
        </div>
      </form>

      {/* Feedback */}
      {feedback && (
        <div
          className={`mt-4 p-3 rounded-lg text-center font-medium animate-fade-in ${
            feedback.type === "success"
              ? "bg-success-50 text-success-600"
              : "bg-error-50 text-error-600"
          }`}
        >
          {feedback.message}
        </div>
      )}
    </Card>
  );
};

export default WordInputForm;
