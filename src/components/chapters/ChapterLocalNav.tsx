import Link from "next/link";

type ChapterLocalNavProps = {
  chapterSlug: string;
  currentPath: "" | "/about" | "/contact";
};

const navItems = [
  { suffix: "" as const, label: "Overview" },
  { suffix: "/about" as const, label: "About" },
  { suffix: "/contact" as const, label: "Contact" },
];

export function ChapterLocalNav({
  chapterSlug,
  currentPath,
}: ChapterLocalNavProps) {
  return (
    <nav className="flex flex-wrap gap-3">
      {navItems.map((item) => {
        const href = `/${chapterSlug}${item.suffix}`;
        const isActive = item.suffix === currentPath;

        return (
          <Link
            key={item.label}
            href={href}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "border-slate-950 bg-slate-950 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-sky-500 hover:text-sky-700"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
