import Link from "next/link";

type MarketingPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  highlights: string[];
  cta?: {
    href: string;
    label: string;
  };
};

export function MarketingPage({
  eyebrow,
  title,
  intro,
  sections,
  highlights,
  cta,
}: MarketingPageProps) {
  return (
    <main className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-10 px-6 py-12 sm:px-8 lg:px-10">
      <section className="grid gap-8 rounded-[2rem] bg-white px-8 py-10 shadow-[0_12px_40px_rgba(28,40,70,0.08)] lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8da7ff]">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#5b5b5b] sm:text-5xl">
            {title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[#2d2d2d]">{intro}</p>
          {cta ? (
            <Link
              href={cta.href}
              className="inline-flex rounded-xl bg-[#0d809b] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#0b6c84]"
            >
              {cta.label}
            </Link>
          ) : null}
        </div>

        <aside className="rounded-[1.5rem] bg-[#f7f9fd] p-6">
          <h2 className="text-xl font-semibold text-[#0b4a9c]">At a glance</h2>
          <ul className="mt-5 space-y-4 text-sm leading-7 text-[#555]">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[1.75rem] bg-white px-7 py-8 shadow-[0_12px_36px_rgba(28,40,70,0.08)]"
          >
            <h2 className="text-2xl font-semibold leading-tight text-[#0b4a9c]">
              {section.title}
            </h2>
            <p className="mt-4 text-[1rem] leading-8 text-[#666]">
              {section.body}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
