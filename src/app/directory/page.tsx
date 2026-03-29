import { CoachDirectory } from "@/components/coaches/CoachDirectory";
import { coaches } from "@/lib/site-data";

export default function DirectoryPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-8 px-6 py-12 sm:px-8 lg:px-10">
      <section className="rounded-[2rem] bg-white px-8 py-10 shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
        <p className="text-sm uppercase tracking-[0.3em] text-[#8da7ff]">
          People
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#5b5b5b] sm:text-5xl">
          Search for Action Learning Coaches
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#2d2d2d]">
          Find WIAL certified coaches by chapter, certification level, and
          location. This internal page replaces the previous external directory
          handoff and keeps visitors inside the WIAL site flow.
        </p>
      </section>

      <CoachDirectory coaches={coaches} />
    </main>
  );
}
