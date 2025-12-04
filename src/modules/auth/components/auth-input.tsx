import { type InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/components/ui';

type AuthFormInputProps = {
	label: string;
	name: string;
	placeholder: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const AuthFormInput = ({
	label,
	name,
	placeholder,
	...props
}: AuthFormInputProps) => {
	const {
		register,
		formState: { errors }
	} = useFormContext();

	const fieldError = errors[label];

	return (
		<Input
			label={label}
			placeholder={placeholder}
			error={fieldError?.message?.toString()}
			{...register(name)}
			{...props}
		/>
	);
};
