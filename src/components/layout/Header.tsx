import Link from "next/link";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/coaches", label: "Coaches" },
  { href: "/usa", label: "Chapters" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  return (
    <header className="border-b border-slate-200/80 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-12">
        <Link href="/" className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-800">
            WIAL
          </span>
          <span className="text-sm text-slate-600">
            Global Action Learning MVP
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm font-medium text-slate-700">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-sky-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
