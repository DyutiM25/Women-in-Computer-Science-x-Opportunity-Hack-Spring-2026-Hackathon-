import { CoachDirectory } from "@/components/coaches/CoachDirectory";
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
          Search by coach name, location, chapter, and certification level
          using the integrated directory experience.
        </p>
      </section>

      <CoachDirectory coaches={coaches} />
    </main>
  );
}
