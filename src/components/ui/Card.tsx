import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = ({
  className,
  hover = false,
  padding = "md",
  children,
  ...props
}: CardProps) => {
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-surface-200 shadow-sm",
        paddings[padding],
        hover && "transition-all duration-200 hover:shadow-md hover:border-surface-300 cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
