import Link from "next/link";
import { chapters, coaches } from "@/lib/site-data";

const featuredStats = [
  { label: "Global chapters in focus", value: "3 demo chapters" },
  { label: "Coach directory records", value: `${coaches.length} seeded profiles` },
  { label: "Primary delivery goal", value: "Fast on slow 3G" },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-6 py-12 sm:px-10 lg:px-12">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
            World Institute for Action Learning
          </p>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              A low-bandwidth MVP for a global network of WIAL chapter sites.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700">
              This starter focuses on the bare-minimum public experience first:
              clear information, chapter landing pages, a searchable coach
              directory, and a clean path to future admin and payment features.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-sky-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              Explore the MVP
            </Link>
            <Link
              href="/coaches"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white"
            >
              View coach directory
            </Link>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
            MVP focus
          </p>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
            <li>Static-first pages for fast chapter landing pages.</li>
            <li>System fonts and minimal JavaScript for low-bandwidth regions.</li>
            <li>Supabase, Stripe, and OpenAI wired as placeholders for later work.</li>
          </ul>
        </aside>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {featuredStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4 rounded-[2rem] bg-slate-950 p-8 text-slate-50">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-200">
            What ships first
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            Public information before platform complexity.
          </h2>
          <p className="text-base leading-7 text-slate-300">
            The initial MVP can stand on its own as a polished, brochure-style
            website while still leaving room for chapter provisioning, payments,
            and coach self-service later.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            "About WIAL and certification overview",
            "Global coach directory with chapter filters",
            "Chapter microsites at /usa, /nigeria, and /philippines",
            "Admin area placeholder for future RBAC work",
          ].map((item) => (
            <div
              key={item}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Demo chapters
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Ready-to-style chapter landing pages
            </h2>
          </div>
          <Link
            href="/admin"
            className="text-sm font-semibold text-sky-900 underline decoration-sky-300 underline-offset-4"
          >
            Open admin placeholder
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {chapters.map((chapter) => (
            <Link
              key={chapter.slug}
              href={`/${chapter.slug}`}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-800">
                {chapter.region}
              </p>
              <h3 className="mt-3 text-xl font-semibold text-slate-950">
                {chapter.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-700">
                {chapter.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
