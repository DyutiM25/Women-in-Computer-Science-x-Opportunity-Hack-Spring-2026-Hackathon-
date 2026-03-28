import { CoachCard } from "@/components/coaches/CoachCard";
import { SearchBar } from "@/components/coaches/SearchBar";
import { coaches } from "@/lib/site-data";

export default function CoachesPage() {
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
          This MVP ships with seeded coaches and a static search UI. Later, the
          same page can read live data from Supabase without redesigning the
          experience.
        </p>
      </section>

      <SearchBar />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {coaches.map((coach) => (
          <CoachCard key={coach.email} coach={coach} />
        ))}
      </section>
    </main>
  );
}
