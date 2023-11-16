import { ComponentProps, forwardRef, useState } from "react";

interface Props extends ComponentProps<"input"> {
  label: string;
  mark?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, mark, onChange, ...rest }, ref) => {
    const [checked, setChecked] = useState(() => rest.checked);

    return (
      <label className="flex items-center gap-2 group">
        <span className="text-sm">{label}</span>

        <input
          {...rest}
          ref={ref}
          type="checkbox"
          onChange={(e) => {
            if (onChange) {
              setChecked(e.currentTarget.checked);
              onChange(e);
            }
          }}
          hidden
        />
        <div className="w-4 aspect-square grid relative place-items-center rounded border-2 bg-zinc-200 border-emerald-400 group-hover:border-emerald-500 group-hover:bg-emerald-200 transition-colors">
          {checked ? (
            <span className="absolute left-[1px] bottom-[-1px]">
              {mark ? mark : "🍆"}
            </span>
          ) : null}
        </div>
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
