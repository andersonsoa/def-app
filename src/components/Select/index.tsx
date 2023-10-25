import { tv } from "tailwind-variants";

type DefaultOption = { value: number; text: string };

interface Props<TData> {
  options: TData[];
  value?: TData;
  label: string;
  fieldLabel: keyof TData;
  errorMessage?: string;
  render?: (value: TData) => React.ReactNode;
}

export function Select<T extends DefaultOption>(props: Props<T>) {
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
  return (
    <div>
      <label className={containerVariant()}>
        <span className="text-xs uppercase px-1 absolute -top-2 before:bg-zinc-50 before:inset-x-0 before:h-1/2 before:top-1/3 before:absolute">
          <span className={labelVariant({ error: !!props.errorMessage })}>
            {props.label}
          </span>
        </span>
        <select className="outline-none bg-transparent" placeholder="Hum">
          <option value="" className="text-zinc-900">
            Selecione um Perfil
          </option>
          {props.options.map((option) =>
            props.render ? (
              props.render(option)
            ) : (
              <option
                key={option.value}
                value={option.value}
                className="text-zinc-900"
              >
                {option.text}
              </option>
            ),
          )}
        </select>
      </label>
      <span className={"text-xs text-red-500"}>{props.errorMessage}</span>
    </div>
  );
}
