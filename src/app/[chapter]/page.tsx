import Link from "next/link";
import { notFound } from "next/navigation";
import { ChapterLocalNav } from "@/components/chapters/ChapterLocalNav";
import { StaticPicture } from "@/components/media/StaticPicture";
import { getChapterBySlug } from "@/lib/chapters";
export const dynamic = "force-dynamic";

type ChapterPageProps = {
  params: Promise<{ chapter: string }>;
};

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapter: chapterSlug } = await params;
  const chapter = await getChapterBySlug(chapterSlug);

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
        <div className="mt-6">
          <ChapterLocalNav chapterSlug={chapter.slug} currentPath="" />
        </div>
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
            {chapter.status === "active" ? "Active chapter site" : chapter.status}
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
          <li>{chapter.launchMode}-based chapter rollout works for the first MVP.</li>
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Link
          href={`/${chapter.slug}/about`}
          className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-500"
        >
          <p className="text-sm uppercase tracking-[0.18em] text-sky-700">
            Chapter page
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            About {chapter.name}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Shared template copy adapted for this chapter&apos;s regional focus
            and launch posture.
          </p>
        </Link>

        <Link
          href={`/${chapter.slug}/contact`}
          className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:border-sky-500"
        >
          <p className="text-sm uppercase tracking-[0.18em] text-sky-700">
            Chapter page
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            Contact {chapter.name}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            A chapter-specific contact path using the provisioned chapter email
            and WIAL template structure.
          </p>
        </Link>
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-950">
            Chapter pages stay within a low-bandwidth footprint
          </h2>
          <p className="text-sm leading-7 text-slate-700">
            Media loads lazily below the fold and uses a multi-format fallback
            chain so chapter pages remain compact even when regional teams add
            visuals later. Template version: {chapter.templateVersion}.
          </p>
        </div>

        <StaticPicture
          alt={`${chapter.name} chapter visual`}
          width={960}
          height={720}
          fallbackSrc={chapter.heroImageUrl ?? "/images/wial-usa-placeholder.png"}
          sources={chapter.heroImageUrl ? [{ srcSet: chapter.heroImageUrl, type: "image/jpeg" }] : []}
          className="overflow-hidden rounded-[1.5rem]"
        />
      </section>

      <footer
        style={{
          background: "#1a1a1a",
          color: "#888",
          padding: "24px 40px",
          textAlign: "center",
          fontSize: 13,
          marginTop: 80,
        }}
      >
        Copyright WIAL Global. All rights reserved.
      </footer>
    </main>
  );
}
