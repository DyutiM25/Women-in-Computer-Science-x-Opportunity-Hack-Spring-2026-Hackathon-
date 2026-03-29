import Link from "next/link";

type AdminWorkspaceNavProps = {
  currentPath: "/admin" | "/admin/access";
  showAccessLink: boolean;
};

function getLinkClasses(isActive: boolean) {
  return `rounded-full border px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? "border-slate-950 bg-slate-950 text-white"
      : "border-slate-300 bg-white text-slate-700 hover:border-slate-950 hover:text-slate-950"
  }`;
}

export function AdminWorkspaceNav({
  currentPath,
  showAccessLink,
}: AdminWorkspaceNavProps) {
  return (
    <nav className="flex flex-wrap gap-3">
      <Link href="/admin" className={getLinkClasses(currentPath === "/admin")}>
        Provisioning
      </Link>
      {showAccessLink ? (
        <Link
          href="/admin/access"
          className={getLinkClasses(currentPath === "/admin/access")}
        >
          Access Management
        </Link>
      ) : null}
    </nav>
  );
}
