export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 py-12 sm:px-10">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
          About WIAL
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
          A simple public-facing foundation for the WIAL network.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-slate-700">
          WIAL supports Action Learning coaches and chapters around the world.
          This MVP focuses on a brochure-style site that is easy to navigate on
          mobile devices and lightweight enough for regions with slower
          connectivity.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          "Explain WIAL's mission and certification pathway clearly.",
          "Provide a dependable global home for chapter visibility.",
          "Create a stable base for future directory, admin, and payment work.",
        ].map((item) => (
          <div
            key={item}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm"
          >
            {item}
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-950">MVP scope</h2>
        <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
          <li>Public informational pages with low-bandwidth styling.</li>
          <li>Coach directory starter with regional filtering.</li>
          <li>Demo chapter landing pages that can become real chapter sites.</li>
          <li>Placeholder admin and API routes for later integrations.</li>
        </ul>
      </section>
    </main>
  );
}
