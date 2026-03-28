import { notFound } from "next/navigation";
import { chapters } from "@/lib/site-data";

type ChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

export function generateStaticParams() {
  return chapters.map((chapter) => ({ chapter: chapter.slug }));
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapter: chapterSlug } = await params;
  const chapter = chapters.find((entry) => entry.slug === chapterSlug);

  if (!chapter) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-12 sm:px-10">
      <section className="rounded-[2rem] bg-slate-950 p-8 text-slate-50">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">
          {chapter.region}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {chapter.name}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          {chapter.summary}
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Local focus</p>
          <p className="mt-3 text-lg font-semibold text-slate-950">
            {chapter.focus}
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Contact</p>
          <p className="mt-3 text-lg font-semibold text-slate-950">
            {chapter.contactEmail}
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Status</p>
          <p className="mt-3 text-lg font-semibold text-slate-950">
            Template-ready MVP page
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-950">
          What this page proves
        </h2>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
          <li>Chapter routes can be generated as lightweight static pages.</li>
          <li>Global branding can stay consistent while local content changes.</li>
          <li>Subdirectory-based chapter rollout works for the first MVP.</li>
        </ul>
      </section>
    </main>
  );
}
