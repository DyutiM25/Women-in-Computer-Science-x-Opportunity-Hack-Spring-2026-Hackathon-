export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-slate-600 sm:px-10 lg:px-12 md:flex-row md:items-center md:justify-between">
        <p>WIAL MVP starter built for low-bandwidth chapter discovery.</p>
        <a
          href="mailto:executivedirector@wial.org"
          className="font-medium text-sky-900"
        >
          executivedirector@wial.org
        </a>
      </div>
    </footer>
  );
}
