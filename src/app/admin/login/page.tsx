import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getCurrentAuthorizedAdmin } from "@/lib/admin-auth";
import { getSupabaseAdminClient } from "@/lib/supabase";

type AdminLoginPageProps = {
  searchParams: Promise<{ redirectTo?: string }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const redirectTo = params.redirectTo || "/admin";
  const { admin } = await getCurrentAuthorizedAdmin();
  const adminClient = getSupabaseAdminClient();
  const envConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );

  if (admin) {
    redirect("/admin");
  }

  let allowlistCount: number | null = null;

  if (adminClient) {
    const { count } = await adminClient
      .from("chapter_admins")
      .select("*", { count: "exact", head: true });
    allowlistCount = count ?? 0;
  }

  return (
    <main className="mx-auto flex w-full max-w-[860px] flex-1 flex-col gap-8 px-6 py-16 sm:px-8">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm">
          Public envs: {envConfigured ? "configured" : "missing"}
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm">
          Service role: {adminClient ? "configured" : "missing"}
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm">
          Allowlisted admins:{" "}
          {allowlistCount === null ? "unverified" : allowlistCount}
        </div>
      </section>

      <section className="w-full rounded-[2rem] bg-white px-8 py-12 shadow-[0_12px_40px_rgba(28,40,70,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8da7ff]">
          Admin Login
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-[#5b5b5b]">
          Sign in to chapter provisioning
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#555]">
          Only authorized WIAL platform admins and approved chapter leads can
          access the provisioning workspace.
        </p>
        <div className="mt-5 rounded-[1.5rem] bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-700">
          <p className="font-semibold text-slate-950">Bootstrap path</p>
          <p>
            If your email is already allowlisted in `chapter_admins`, you can
            use Create account below to create your Supabase Auth user first,
            then sign in normally.
          </p>
        </div>
        <AdminLoginForm redirectTo={redirectTo} />
      </section>
    </main>
  );
}
