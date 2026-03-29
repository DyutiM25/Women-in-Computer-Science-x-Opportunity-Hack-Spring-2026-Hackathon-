import { NextResponse } from "next/server";
import { coaches } from "@/lib/site-data";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const chapter = searchParams.get("chapter") ?? "All chapters";
  const certification =
    searchParams.get("certification") ?? "All certifications";

  const results = coaches.filter((coach) => {
    const matchesQuery =
      query.length === 0 ||
      [
        coach.name,
        coach.location,
        coach.email,
        coach.bio,
        coach.chapter,
        coach.certification,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesChapter =
      chapter === "All chapters" || coach.chapter === chapter;
    const matchesCertification =
      certification === "All certifications" ||
      coach.certification === certification;

    return matchesQuery && matchesChapter && matchesCertification;
  });

  return NextResponse.json({
    ok: true,
    source: "seed-data",
    count: results.length,
    results,
  });
}
