export default function ContactPage() {
  return (
    <main className="mx-auto flex w-full max-w-[780px] flex-1 items-center justify-center px-6 py-16 sm:px-8">
      <section className="w-full rounded-[2rem] bg-white px-8 py-12 text-center shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
        <p className="text-sm uppercase tracking-[0.28em] text-[#8da7ff]">
          Contact
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#5b5b5b]">
          Reach the Executive Director
        </h1>
        <a
          href="mailto:executivedirector@wial.org"
          className="mt-8 inline-flex text-xl font-medium text-[#0b4a9c] underline decoration-[#d50f45] underline-offset-4"
        >
          executivedirector@wial.org
        </a>
      </section>
    </main>
  );
}
