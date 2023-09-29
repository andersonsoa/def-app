import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "deu bom", token: "abc-123" });
}
