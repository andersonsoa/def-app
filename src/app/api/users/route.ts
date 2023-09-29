import { usuarios } from "@/app/api/users/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (userId) {
    const user = usuarios.find((usuario) => usuario.id === +userId);
    if (user) {
      return NextResponse.json(user);
    }

    return NextResponse.json({ error: "Usuário não encontrado" });
  }

  return NextResponse.json(usuarios);
}
