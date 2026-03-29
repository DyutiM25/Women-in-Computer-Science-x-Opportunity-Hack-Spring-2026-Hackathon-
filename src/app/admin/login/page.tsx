import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { getCurrentAuthorizedAdmin } from "@/lib/admin-auth";

type AdminLoginPageProps = {
  searchParams: Promise<{ redirectTo?: string }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const redirectTo = params.redirectTo || "/admin";
  const { admin } = await getCurrentAuthorizedAdmin();

  if (admin) {
    redirect("/admin");
  }

  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-1 items-center px-6 py-16 sm:px-8">
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
        <AdminLoginForm redirectTo={redirectTo} />
      </section>
    </main>
  );
}
