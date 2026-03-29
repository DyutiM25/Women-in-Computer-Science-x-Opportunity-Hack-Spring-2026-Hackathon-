"use client";

import { useEffect, useState } from "react";
import { CoachCard, type CoachDirectoryItem } from "@/components/coaches/CoachCard";
import { SearchBar } from "@/components/coaches/SearchBar";
import { supabase } from "@/lib/supabase";

export default function CoachesPage() {
  const [coaches, setCoaches] = useState<CoachDirectoryItem[]>([]);

  useEffect(() => {
    async function fetchCoaches() {
      const { data } = await supabase
        .from("coaches")
        .select("id, full_name, photo_url, cert_level, location, email, bio, chapters(name, slug)")
        .eq("is_approved", true);

      setCoaches((data ?? []) as CoachDirectoryItem[]);
    }

    void fetchCoaches();
  }, []);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
          Coach Directory
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
          Searchable, chapter-aware coach profiles.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-700">
          Now powered by live Supabase data.
        </p>
      </section>

      <SearchBar />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {coaches.map((coach) => (
          <CoachCard key={coach.id} coach={coach} />
        ))}
      </section>
    </main>
  );
}
