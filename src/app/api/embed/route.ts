import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Embedding is not configured yet. Add OPENAI_API_KEY before wiring this route.",
    },
    { status: 501 },
  );
}
