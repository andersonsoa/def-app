"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

const schema = z.object({
  email: z.string().email("Email incorreto"),
  password: z.string().min(4, "A senha precisa conter no minimo 4 caracteres"),
  typeID: z
    .object({
      text: z.string(),
      value: z.number(),
    })
    .transform((obj) => obj.value),
  roles: z.array(z.string()),
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
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      roles: [],
    },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(console.log)}>
      <h2>Criar usuario</h2>

      <Input
        label="E-Mail"
        placeholder="example@mail.com"
        type="text"
        errorMessage={errors?.email?.message}
        {...register("email")}
      />
      <Input
        label="Senha"
        placeholder="####"
        type="password"
        errorMessage={errors?.password?.message}
        {...register("password")}
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
        <p className="text-sm text-zinc-500 mb-1">Niveis de Acesso</p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <span className="text-sm">Administrador</span>
            <input type="checkbox" value="1" {...register("roles")} />
          </label>

          <label className="flex items-center gap-2">
            <span className="text-sm">Servidor</span>
            <input type="checkbox" value="2" {...register("roles")} />
          </label>

          <label className="flex items-center gap-2">
            <span className="text-sm">Estagiario</span>
            <input type="checkbox" value="3" {...register("roles")} />
          </label>
        </div>
        {errors.roles?.message}
      </div>

      <button>Salvar</button>
    </form>
  );
}
