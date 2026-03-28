import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json(
    {
      ok: false,
      message:
        "Stripe webhook is not configured yet. Add STRIPE_WEBHOOK_SECRET before enabling this endpoint.",
    },
    { status: 501 },
  );
}
