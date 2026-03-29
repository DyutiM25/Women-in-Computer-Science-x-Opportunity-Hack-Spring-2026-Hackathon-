export default function AboutPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col gap-8 px-6 py-12 sm:px-8 lg:px-10">
      <section className="rounded-[2rem] bg-white px-8 py-10 shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8da7ff]">
          About WIAL
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#5b5b5b] sm:text-5xl">
          A global Action Learning network with one shared mission.
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-[#555]">
          WIAL advances Action Learning around the world through certification,
          coach development, and a shared global community. The organization
          supports chapter leads, experienced coaches, and new practitioners who
          need one trusted public identity with room for regional growth.
        </p>
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        <article className="rounded-[1.75rem] bg-white px-7 py-8 shadow-[0_12px_36px_rgba(28,40,70,0.08)]">
          <h2 className="text-2xl font-semibold text-[#0b4a9c]">Mission</h2>
          <p className="mt-4 text-[1rem] leading-8 text-[#666]">
            WIAL helps people solve real problems, take action, and learn as
            individuals, teams, and organizations. Its mission is not only to
            teach a method, but to strengthen leadership and create cultures of
            inquiry and learning.
          </p>
        </article>
        <article className="rounded-[1.75rem] bg-white px-7 py-8 shadow-[0_12px_36px_rgba(28,40,70,0.08)]">
          <h2 className="text-2xl font-semibold text-[#0b4a9c]">History</h2>
          <p className="mt-4 text-[1rem] leading-8 text-[#666]">
            Action Learning traces back to Reg Revans, whose work showed that
            learning and action belong together. Over time, WIAL helped shape
            that tradition into a structured global model used for leadership
            development, team effectiveness, and complex problem solving.
          </p>
        </article>
        <article className="rounded-[1.75rem] bg-white px-7 py-8 shadow-[0_12px_36px_rgba(28,40,70,0.08)]">
          <h2 className="text-2xl font-semibold text-[#0b4a9c]">
            Global Network
          </h2>
          <p className="mt-4 text-[1rem] leading-8 text-[#666]">
            WIAL operates through chapters, affiliates, coaches, and partners
            around the world. That global reach is why the website needs to
            support local activity while still presenting one recognizable WIAL
            experience across regions.
          </p>
        </article>
      </section>

      <section className="grid gap-6 rounded-[2rem] bg-white px-8 py-10 shadow-[0_12px_40px_rgba(28,40,70,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-[#d50f45]">
            Dr. Marquardt
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#5b5b5b]">
            Michael Marquardt helped shape the WIAL model into a practical
            leadership framework.
          </h2>
        </div>
        <p className="text-[1rem] leading-8 text-[#666]">
          Dr. Michael Marquardt is closely associated with the development and
          international spread of the WIAL approach. His work helped position
          Action Learning as a practical framework for solving difficult
          organizational challenges while simultaneously developing leaders and
          teams.
        </p>
      </section>

      <section className="rounded-[2rem] bg-[#f7f9fd] px-8 py-10 shadow-[0_12px_40px_rgba(28,40,70,0.06)]">
        <h2 className="text-3xl font-semibold tracking-tight text-[#0b4a9c]">
          Why this matters for the website
        </h2>
        <ul className="mt-5 space-y-3 text-[1rem] leading-8 text-[#555]">
          <li>Chapter leads need a platform that keeps branding consistent.</li>
          <li>Certified coaches need one place to understand the pathway.</li>
          <li>Global administrators need a strong shared public identity.</li>
          <li>Prospective coaches need a clear, low-friction introduction.</li>
        </ul>
      </section>
    </main>
  );
}
