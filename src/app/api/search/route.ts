import { NextResponse } from "next/server";
import { coaches } from "@/lib/site-data";

export function GET() {
  return NextResponse.json({
    ok: true,
    source: "seed-data",
    count: coaches.length,
    results: coaches,
  });
}
