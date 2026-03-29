type SearchBarProps = {
  query: string;
  chapter: string;
  certification: string;
  chapterOptions: string[];
  resultCount: number;
  onQueryChange: (value: string) => void;
  onChapterChange: (value: string) => void;
  onCertificationChange: (value: string) => void;
};

export function SearchBar({
  query,
  chapter,
  certification,
  chapterOptions,
  resultCount,
  onQueryChange,
  onChapterChange,
  onCertificationChange,
}: SearchBarProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
      <form
        className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]"
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by name or location"
          className="rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
        />
        <select
          value={chapter}
          onChange={(event) => onChapterChange(event.target.value)}
          className="rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
        >
          <option>All chapters</option>
          {chapterOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <select
          value={certification}
          onChange={(event) => onCertificationChange(event.target.value)}
          className="rounded-full border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-sky-500"
        >
          <option>All certifications</option>
          <option>CALC</option>
          <option>PALC</option>
          <option>SALC</option>
          <option>MALC</option>
        </select>
        <div className="flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white">
          {resultCount} result{resultCount === 1 ? "" : "s"}
        </div>
      </form>
    </section>
  );
}
