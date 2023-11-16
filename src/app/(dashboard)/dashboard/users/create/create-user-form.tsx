"use client";

import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Checkbox } from "@/components/Checkbox";

const schema = z.object({
  email: z.string().email("Email incorreto"),
  password: z.string().min(4, "A senha precisa conter no minimo 4 caracteres"),
  saldo: z.number(),
  temArquivo: z.string(),
  arquivo: z
    .custom<File>()
    .superRefine((obj, ctx) => {
      console.log(obj.type);
      if (obj && !["application/pdf", "image/png"].includes(obj.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Arquivo Inválido",
        });
      }
    })
    .optional(),
  typeID: z
    .object({
      text: z.string(),
      value: z.number(),
    })
    .transform((obj) => obj.value),
  roles: z
    .array(z.string().transform(Number))
    .min(1, "Selecione no minimo um nivel de acesso"),
});

type FormType = z.infer<typeof schema>;

const tipoServidor = [
  {
    value: 1,
    text: "Servidor Comissionado",
    sigla: "SC",
  },
  {
    value: 2,
    text: "Servidor Efetivo",
    sigla: "SE",
  },
];

export function CreateUserForm() {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      roles: [],
      temArquivo: "SIM",
    },
  });

  async function onSubmit(data: any) {
    console.log({ data });
  }

  const temArquivo = watch("temArquivo") === "SIM";

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h2>Criar Usuário</h2>

      <Input
        label="E-Mail"
        placeholder="example@mail.com"
        type="text"
        errorMessage={errors?.email?.message}
        {...register("email", {
          onChange: (e) => {
            const value = getValues("email");
            setValue("email", value.toLocaleUpperCase());
          },
        })}
      />
      <Input
        label="Senha"
        placeholder="****"
        type="password"
        errorMessage={errors?.password?.message}
        {...register("password")}
      />

      <Controller
        control={control}
        name="saldo"
        render={({ field: { ref, ...rest }, fieldState }) => (
          <>
            <div className="flex flex-col bg-zinc-50 border border-zinc-700 px-2 py-2">
              <NumericFormat
                className="bg-transparent outline-none"
                thousandSeparator="."
                decimalSeparator=","
                placeholder="R$ 00,00"
                prefix="R$ "
                decimalScale={2}
                getInputRef={ref}
                onValueChange={(state) => rest.onChange(state.floatValue)}
                value={rest.value}
              />
            </div>
            <span className="text-xs text-red-500">
              {fieldState.error?.message}
            </span>
          </>
        )}
      />

      <Controller
        control={control}
        name="typeID"
        render={({ field, fieldState }) => (
          <Select
            options={tipoServidor}
            label="Tipo de Servidor"
            value={field.value}
            onChange={field.onChange}
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <div>
        <p className="text-xs text-zinc-500 mb-1 uppercase">Niveis de Acesso</p>

        <div className="flex gap-4">
          <Checkbox label="Administrador" value={1} {...register("roles")} />

          <Checkbox label="Servidor" value={2} {...register("roles")} />

          <Checkbox label="Estagiario" value={3} {...register("roles")} />
        </div>

        <span className="text-xs text-red-500">{errors.roles?.message}</span>
      </div>

      <div className="flex gap-5">
        <p>Anexar Documentos?</p>
        <label>
          SIM <input type="radio" value="SIM" {...register("temArquivo")} />
        </label>
        <label>
          NAO{" "}
          <input
            type="radio"
            value="NAO"
            {...register("temArquivo", {
              onChange: () => setValue("arquivo", undefined),
            })}
          />
        </label>
      </div>

      {temArquivo ? (
        <div>
          <Controller
            name="arquivo"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(event) => {
                  const files = event.target.files;
                  if (files) {
                    field.onChange(files[0]);
                  }
                }}
                accept="application/pdf"
              />
            )}
          />
          <br />
          {errors.arquivo?.message}
        </div>
      ) : null}

      <button className="bg-zinc-600 px-4 py-1 text-white rounded shadow">
        Salvar
      </button>
    </form>
  );
}
