import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";
import Spinner from "./Spinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 active:bg-primary-700",
      secondary:
        "bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 active:bg-secondary-700",
      danger:
        "bg-error-500 text-white hover:bg-error-600 focus:ring-error-500 active:bg-error-700",
      ghost:
        "bg-transparent text-surface-700 hover:bg-surface-100 focus:ring-surface-500 active:bg-surface-200",
      outline:
        "border-2 border-primary-500 text-primary-500 bg-transparent hover:bg-primary-50 focus:ring-primary-500 active:bg-primary-100",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-4 py-2 text-base gap-2",
      lg: "px-6 py-3 text-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Spinner size={size === "lg" ? "md" : "sm"} />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
