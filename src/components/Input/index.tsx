import { ComponentPropsWithRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

interface Props extends ComponentPropsWithRef<"input"> {
  label: string;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const { label, errorMessage, ...rest } = props;

    const containerVariant = tv({
      base: "flex flex-col bg-zinc-50 border border-zinc-800 p-2 relative",
      variants: {
        error: {
          true: "border-red-500 text-red-500",
        },
      },
      compoundVariants: [
        {
          error: [true, false],
        },
      ],
      defaultVariants: {
        error: false,
      },
    });

    const labelVariant = tv({
      base: "relative text-zinc-500",
      variants: {
        error: {
          true: "text-red-500",
        },
      },
    });

    const inputVariant = tv({
      base: "outline-none",
      variants: {
        error: {
          true: "text-red-500 placeholder:text-red-300",
        },
      },
    });

    return (
      <div>
        <label className={containerVariant({ error: !!errorMessage })}>
          <span className="text-xs uppercase px-1 absolute -top-2 before:bg-zinc-50 before:inset-x-0 before:h-1/2 before:top-1/3 before:absolute">
            <span className={labelVariant({ error: !!errorMessage })}>
              {label}
            </span>
          </span>
          <input
            data-testid="input"
            className={inputVariant({ error: !!errorMessage })}
            ref={ref}
            {...rest}
          />
        </label>
        <span className={"text-xs text-red-500"}>{errorMessage}</span>
      </div>
    );
  },
);

Input.displayName = "Input";
