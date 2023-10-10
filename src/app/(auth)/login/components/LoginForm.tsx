"use client";

import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import Swal from "sweetalert2";

export function LoginForm() {
  const { handleSubmit, register } = useForm();
  const { data } = useSession();

  async function onSubmit(data: any) {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      return Swal.fire({
        text: "Falha ao logar",
        color: "red",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 space-y-2 bg-zinc-50 ring-1 ring-zinc-300 shadow"
    >
      <label className="block">
        <span className="text-xs text-zinc-600">e-mail</span>
        <input
          type="text"
          className="w-full px-2 py-1 bg-zinc-50 shadow ring-1 ring-zinc-300 outline-none"
          placeholder="foo@example.com"
          {...register("email")}
        />
      </label>

      <label className="block">
        <span className="text-xs text-zinc-600">password</span>
        <input
          type="password"
          className="w-full px-2 py-1 bg-zinc-50 shadow ring-1 ring-zinc-300 outline-none"
          {...register("password")}
        />
      </label>

      <div>
        <button className="w-full px-2 py-2 bg-zinc-100 shadow ring-1 ring-zinc-300 outline-none mt-4">
          Entrar
        </button>
      </div>

      <div>
        <code>
          <pre>{JSON.stringify(data ?? {}, null, 2)}</pre>
        </code>
      </div>
    </form>
  );
}
