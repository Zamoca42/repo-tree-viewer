import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/util";
import { ErrorMessageProps } from "@/type";


export const ErrorMessage = ({ title, message, action }: ErrorMessageProps) => (
  <CenteredMessage>
    <h2 className="message-title">{title}</h2>
    <p className="mb-4">{message}</p>
    {action}
  </CenteredMessage>
);

const centeredMessageVariants = cva("flex items-center justify-center", {
  variants: {
    height: {
      default: "min-h-screen",
      full: "h-full",
      custom: "h-96",
    },
    border: {
      none: "",
      dashed: "border-4 border-dashed border-gray-200",
      solid: "border-4 border-solid border-gray-200",
    },
    padding: {
      default: "p-8",
      large: "p-12",
      small: "p-4",
    },
    maxWidth: {
      default: "max-w-full",
      large: "max-w-lg",
      md: "max-w-md",
    },
  },
  defaultVariants: {
    height: "default",
    border: "none",
    padding: "default",
    maxWidth: "default",
  },
});

interface CenteredMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof centeredMessageVariants> {
  children: React.ReactNode;
}

export const CenteredMessage: React.FC<CenteredMessageProps> = ({
  className,
  height,
  border,
  padding,
  maxWidth,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        centeredMessageVariants({ height, border, padding, maxWidth }),
        className
      )}
      {...props}
    >
      <div className={cn("text-center rounded-lg", maxWidth)}>{children}</div>
    </div>
  );
};
