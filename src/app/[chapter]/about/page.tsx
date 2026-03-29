import { notFound } from "next/navigation";
import { ChapterLocalNav } from "@/components/chapters/ChapterLocalNav";
import { getChapterBySlug } from "@/lib/chapters";

type ChapterAboutPageProps = {
  params: Promise<{ chapter: string }>;
};

export default async function ChapterAboutPage({
  params,
}: ChapterAboutPageProps) {
  const { chapter: chapterSlug } = await params;
  const chapter = await getChapterBySlug(chapterSlug);

  if (!chapter) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10">
      <section className="rounded-[2rem] bg-slate-950 p-8 text-slate-50">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">
          About This Chapter
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {chapter.aboutHeading}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          {chapter.aboutBody}
        </p>
        <div className="mt-6">
          <ChapterLocalNav chapterSlug={chapter.slug} currentPath="/about" />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.75rem] bg-white px-7 py-8 shadow-[0_12px_36px_rgba(28,40,70,0.08)]">
          <h2 className="text-2xl font-semibold text-[#0b4a9c]">Mission</h2>
          <p className="mt-4 text-[1rem] leading-8 text-[#666]">
            This chapter extends the WIAL mission by helping teams solve real
            problems, take action, and learn together through locally relevant
            programming.
          </p>
        </article>
        <article className="rounded-[1.75rem] bg-white px-7 py-8 shadow-[0_12px_36px_rgba(28,40,70,0.08)]">
          <h2 className="text-2xl font-semibold text-[#0b4a9c]">Local Focus</h2>
          <p className="mt-4 text-[1rem] leading-8 text-[#666]">
            {chapter.focus}. The chapter uses the shared WIAL template so the
            local experience stays consistent with the broader network.
          </p>
        </article>
        <article className="rounded-[1.75rem] bg-white px-7 py-8 shadow-[0_12px_36px_rgba(28,40,70,0.08)]">
          <h2 className="text-2xl font-semibold text-[#0b4a9c]">
            Offering Model
          </h2>
          <p className="mt-4 text-[1rem] leading-8 text-[#666]">
            {chapter.externalSiteUrl
              ? "This chapter can connect visitors to a broader affiliate site for offerings outside Action Learning."
              : "This chapter currently uses its WIAL chapter site as the primary public front door for local outreach."}
          </p>
        </article>
      </section>

      <section className="rounded-[2rem] bg-white px-8 py-10 shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
        <p className="text-sm uppercase tracking-[0.24em] text-[#d50f45]">
          Template Notes
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#5b5b5b]">
          Auto-populated from chapter provisioning
        </h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-[#555]">
          This page is generated from the chapter record rather than a
          chapter-specific file. That means every new authorized chapter lead
          can launch a consistent WIAL chapter microsite without engineering
          work for each region.
        </p>
      </section>
    </main>
  );
}
