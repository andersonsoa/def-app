"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

const schema = z.object({
  email: z.string().email("Email incorreto"),
  password: z.string().min(4),
});

type FormType = z.infer<typeof schema>;

export function CreateUserForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema) });

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
      <Select
        label="Perfil"
        options={[
          {
            value: 1,
            text: "Administrador",
            sigla: "ADM",
          },
          {
            value: 2,
            text: "Servidor Efetivo",
            sigla: "SE",
          },
        ]}
        fieldLabel="text"
      />

      <button>Salvar</button>
    </form>
  );
}
