import Link from "next/link";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { getCurrentAuthorizedAdmin } from "@/lib/admin-auth";

export default async function AdminUnauthorizedPage() {
  const { user } = await getCurrentAuthorizedAdmin();

  return (
    <main className="mx-auto flex w-full max-w-[780px] flex-1 items-center px-6 py-16 sm:px-8">
      <section className="w-full rounded-[2rem] bg-white px-8 py-12 shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">
          Access Restricted
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#5b5b5b]">
          You are signed in, but not authorized for admin provisioning.
        </h1>
        <p className="mt-5 text-lg leading-8 text-[#555]">
          Signed in as {user?.email ?? "unknown user"}. Ask a WIAL platform
          administrator to add your email to the chapter admin allowlist.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex rounded-xl bg-[#0d809b] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#0b6c84]"
          >
            Back to site
          </Link>
          <AdminSignOutButton />
        </div>
      </section>
    </main>
  );
}
