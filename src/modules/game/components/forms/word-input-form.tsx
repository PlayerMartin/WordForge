'use client';

import { Button, Card, Input } from '@/components/ui';

export type Feedback =
	| { type: 'success'; message: string }
	| { type: 'error'; message: string }
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
	feedback
}: WordInputFormProps) => (
	<Card className="mb-6">
		<form onSubmit={onSubmit}>
			<div className="flex gap-3">
				<Input
					placeholder={`Enter a word starting with "${currentLetter}"...`}
					value={wordInput}
					onChange={e => onWordChange(e.target.value)}
					// eslint-disable-next-line jsx-a11y/no-autofocus
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
				className={`mt-4 animate-fade-in rounded-lg p-3 text-center font-medium ${
					feedback.type === 'success'
						? 'bg-success-50 text-success-600'
						: 'bg-error-50 text-error-600'
				}`}
			>
				{feedback.message}
			</div>
		)}
	</Card>
);

export default WordInputForm;
