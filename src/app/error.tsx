'use client';

import { Card } from '@/components/ui';
import { type ValidationError } from '@/lib/utils/validation-error';

type ErrorProps = {
	error: ValidationError;
};

const Error = ({ error }: ErrorProps) => (
	<div className="flex min-h-screen items-center justify-center p-6">
		<Card
			padding="lg"
			className="max-w-md border-red-300 bg-red-50 text-center"
		>
			{error.status && (
				<p className="mb-4 text-6xl font-extrabold text-red-500">
					{error.status}
				</p>
			)}

			<p className="mb-4 text-lg text-gray-700">{error.message}</p>
		</Card>
	</div>
);

export default Error;
