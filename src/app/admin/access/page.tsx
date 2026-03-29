import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { AdminWorkspaceNav } from "@/components/admin/AdminWorkspaceNav";
import { ChapterAdminsManager } from "@/components/admin/ChapterAdminsManager";
import {
  listManagedChapterAdmins,
  requireAuthorizedAdmin,
} from "@/lib/admin-auth";
import { listProvisionedChapters } from "@/lib/chapters";
import { getSupabaseAdminClient } from "@/lib/supabase";

export default async function AdminAccessPage() {
  const currentAdmin = await requireAuthorizedAdmin();

  if (currentAdmin.role !== "global_admin") {
    redirect("/admin");
  }

  const chapterAdmins = await listManagedChapterAdmins();
  const chapters = await listProvisionedChapters();
  const provisioningEnabled = Boolean(getSupabaseAdminClient());
  const chapterSlugs = chapters.map((chapter) => chapter.slug);

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10">
      <section className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
              Admin
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
              Access management
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">
              Manage platform admins, chapter leads, and the pre-approved
              one-click provisioning profiles that make chapter creation
              operational without direct database edits.
            </p>
            <AdminWorkspaceNav
              currentPath="/admin/access"
              showAccessLink={true}
            />
          </div>
          <AdminSignOutButton />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm">
          Signed in as: {currentAdmin.email}
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm">
          Managed access records: {chapterAdmins.length}
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm">
          Live chapters available for assignment: {chapterSlugs.length}
        </div>
      </section>

      {!provisioningEnabled ? (
        <section className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-900 shadow-sm">
          Supabase admin access is not configured, so this page cannot save or
          load real access records yet.
        </section>
      ) : null}

      {provisioningEnabled && chapterAdmins.length === 0 ? (
        <section className="rounded-[1.75rem] border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-900 shadow-sm">
          No access records were found in `chapter_admins`. Apply the latest
          Supabase schema and seed SQL so the admin demo loop has real global
          admins and chapter leads to manage.
        </section>
      ) : null}

      <ChapterAdminsManager
        admins={chapterAdmins}
        chapterSlugs={chapterSlugs}
        disabled={!provisioningEnabled}
      />
    </main>
  );
}
