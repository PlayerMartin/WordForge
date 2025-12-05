type CardErrorProps = {
	error: string;
};

export const CardError = ({ error }: CardErrorProps) => (
	<div className="mb-6 rounded-lg border border-error-200 bg-error-50 p-4">
		<p className="text-sm text-error-600">{error}</p>
	</div>
);
