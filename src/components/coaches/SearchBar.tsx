export function SearchBar() {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
      <form className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]">
        <input
          type="search"
          placeholder="Search by name or location"
          className="rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
        />
        <select className="rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500">
          <option>All chapters</option>
          <option>USA</option>
          <option>Nigeria</option>
          <option>Philippines</option>
        </select>
        <select className="rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500">
          <option>All certifications</option>
          <option>CALC</option>
          <option>PALC</option>
          <option>SALC</option>
          <option>MALC</option>
        </select>
        <button
          type="submit"
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Search
        </button>
      </form>
    </section>
  );
}
