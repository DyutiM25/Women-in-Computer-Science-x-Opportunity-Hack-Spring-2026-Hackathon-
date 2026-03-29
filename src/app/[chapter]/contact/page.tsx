import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterLocalNav } from "@/components/chapters/ChapterLocalNav";
import { getChapterBySlug } from "@/lib/chapters";

type ChapterContactPageProps = {
  params: Promise<{ chapter: string }>;
};

export default async function ChapterContactPage({
  params,
}: ChapterContactPageProps) {
  const { chapter: chapterSlug } = await params;
  const chapter = await getChapterBySlug(chapterSlug);

  if (!chapter) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10">
      <section className="rounded-[2rem] bg-slate-950 p-8 text-slate-50">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">
          Contact This Chapter
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {chapter.contactHeading}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
          {chapter.contactBody}
        </p>
        <div className="mt-6">
          <ChapterLocalNav chapterSlug={chapter.slug} currentPath="/contact" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[1.75rem] bg-white px-8 py-10 shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
          <p className="text-sm uppercase tracking-[0.24em] text-[#8da7ff]">
            Chapter Contact
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#5b5b5b]">
            {chapter.contactHeading}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#555]">
            {chapter.contactBody}
          </p>
          <a
            href={`mailto:${chapter.contactEmail}`}
            className="mt-8 inline-flex text-xl font-medium text-[#0b4a9c] underline decoration-[#d50f45] underline-offset-4"
          >
            {chapter.contactEmail}
          </a>
        </article>

        <article className="rounded-[1.75rem] bg-white px-8 py-10 shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
          <p className="text-sm uppercase tracking-[0.24em] text-[#14c9ad]">
            Routing Model
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight text-[#5b5b5b]">
            Shared template, local destination
          </h2>
          <ul className="mt-5 space-y-3 text-[1rem] leading-8 text-[#555]">
            <li>Launch mode: {chapter.launchMode}</li>
            <li>Template version: {chapter.templateVersion}</li>
            <li>Status: {chapter.status}</li>
          </ul>
        </article>
      </section>

      <section className="rounded-[2rem] bg-[#f7f9fd] px-8 py-10 shadow-[0_12px_40px_rgba(28,40,70,0.06)]">
        <h2 className="text-3xl font-semibold tracking-tight text-[#0b4a9c]">
          Need other offerings?
        </h2>
        <p className="mt-5 max-w-4xl text-[1rem] leading-8 text-[#555]">
          {chapter.externalSiteUrl
            ? "This affiliate offers additional services outside Action Learning and can direct visitors to its broader external website."
            : "This chapter currently uses its WIAL chapter site as the primary public destination for local chapter activity."}
        </p>
        {chapter.externalSiteUrl ? (
          <a
            href={chapter.externalSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-xl bg-[#0d809b] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#0b6c84]"
          >
            {chapter.otherOfferingsLabel}
          </a>
        ) : (
          <Link
            href={`/${chapter.slug}/about`}
            className="mt-6 inline-flex rounded-xl bg-[#0d809b] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#0b6c84]"
          >
            Learn about this chapter
          </Link>
        )}
      </section>
    </main>
  );
}
