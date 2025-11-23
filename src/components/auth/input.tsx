import { useFormContext } from "react-hook-form";

type InputProps = {
  name: string;
  placeholder: string;
  type: string;
};

export const Input = ({ name, placeholder, type }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[name];

  return (
    <div className="mb-2">
      <input type={type} placeholder={placeholder} {...register(name)} />
      {fieldError && <p>{fieldError.message?.toString()}</p>}
    </div>
  );
};
