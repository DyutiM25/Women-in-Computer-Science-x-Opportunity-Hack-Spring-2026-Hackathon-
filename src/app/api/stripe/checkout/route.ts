import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Stripe checkout is not configured yet. Add Stripe keys before enabling payments.",
    },
    { status: 501 },
  );
}
