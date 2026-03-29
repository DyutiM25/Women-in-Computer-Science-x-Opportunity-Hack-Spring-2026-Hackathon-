"use client";

import { useDeferredValue, useState } from "react";
import type { Coach } from "@/lib/site-data";
import { CoachCard } from "@/components/coaches/CoachCard";
import { SearchBar } from "@/components/coaches/SearchBar";

type CoachDirectoryProps = {
  coaches: Coach[];
};

export function CoachDirectory({ coaches }: CoachDirectoryProps) {
  const [query, setQuery] = useState("");
  const [chapter, setChapter] = useState("All chapters");
  const [certification, setCertification] = useState("All certifications");

  const deferredQuery = useDeferredValue(query);
  const chapterOptions = Array.from(
    new Set(coaches.map((coach) => coach.chapter)),
  ).sort((left, right) => left.localeCompare(right));

  const filteredCoaches = coaches.filter((coach) => {
    const normalizedQuery = deferredQuery.trim().toLowerCase();
    const matchesQuery =
      normalizedQuery.length === 0 ||
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
        .includes(normalizedQuery);

    const matchesChapter =
      chapter === "All chapters" || coach.chapter === chapter;
    const matchesCertification =
      certification === "All certifications" ||
      coach.certification === certification;

    return matchesQuery && matchesChapter && matchesCertification;
  });

  return (
    <>
      <SearchBar
        query={query}
        chapter={chapter}
        certification={certification}
        chapterOptions={chapterOptions}
        onQueryChange={setQuery}
        onChapterChange={setChapter}
        onCertificationChange={setCertification}
        resultCount={filteredCoaches.length}
      />

      {filteredCoaches.length > 0 ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCoaches.map((coach) => (
            <CoachCard key={coach.email} coach={coach} />
          ))}
        </section>
      ) : (
        <section className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            No coaches match those filters
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Try a different name, location, chapter, or certification filter.
          </p>
        </section>
      )}
    </>
  );
}
