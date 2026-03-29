import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { AdminWorkspaceNav } from "@/components/admin/AdminWorkspaceNav";
import { ChapterContentEditor } from "@/components/admin/ChapterContentEditor";
import { OneClickChapterProvisionButton } from "@/components/admin/OneClickChapterProvisionButton";
import { ChapterProvisionForm } from "@/components/admin/ChapterProvisionForm";
import { requireAuthorizedAdmin } from "@/lib/admin-auth";
import { listProvisionedChapters } from "@/lib/chapters";
import { getSupabaseAdminClient } from "@/lib/supabase";

export default async function AdminPage() {
  const currentAdmin = await requireAuthorizedAdmin();
  const chapters = await listProvisionedChapters();
  const provisioningEnabled = Boolean(getSupabaseAdminClient());
  const existingChapterSlugs = new Set(chapters.map((chapter) => chapter.slug));
  const showOneClickChapterProvision =
    currentAdmin.role === "chapter_lead" &&
    !!currentAdmin.provisionSlug &&
    !existingChapterSlugs.has(currentAdmin.provisionSlug);
  const editableChapters =
    currentAdmin.role === "global_admin"
      ? chapters
      : chapters.filter((chapter) => chapter.slug === currentAdmin.chapterSlug);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12 sm:px-10">
      <section className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
              Admin
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
              Chapter provisioning
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-slate-700">
              This workspace provisions a live chapter record in Supabase and
              makes the new chapter available immediately through the shared
              WIAL route template.
            </p>
            <AdminWorkspaceNav
              currentPath="/admin"
              showAccessLink={currentAdmin.role === "global_admin"}
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
          Role: {currentAdmin.role}
        </div>
        <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-sm leading-7 text-slate-700 shadow-sm">
          {currentAdmin.chapterSlug
            ? `Assigned chapter: ${currentAdmin.chapterSlug}`
            : currentAdmin.provisionSlug
              ? `Pre-approved chapter: ${currentAdmin.provisionSlug}`
              : `Active chapters listed below: ${chapters.length}`}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {showOneClickChapterProvision ? (
          <OneClickChapterProvisionButton
            chapterSlug={currentAdmin.provisionSlug!}
          />
        ) : (
          <ChapterProvisionForm
            disabled={
              !provisioningEnabled || currentAdmin.role !== "global_admin"
            }
          />
        )}

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-950">
              Current chapter sites
            </h2>
            <p className="text-sm leading-7 text-slate-700">
              These routes are being served from provisioned chapter data.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {chapters.map((chapter) => (
              <div
                key={chapter.slug}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-7 text-slate-700"
              >
                <p className="font-semibold text-slate-950">{chapter.name}</p>
                <p>Route: /{chapter.slug}</p>
                <p>About: /{chapter.slug}/about</p>
                <p>Contact: /{chapter.slug}/contact</p>
                <p>Status: {chapter.status}</p>
                <p>Contact: {chapter.contactEmail}</p>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
            Chapter content overrides
          </h2>
          <p className="max-w-3xl text-base leading-8 text-slate-700">
            Update the live copy used by chapter overview, about, and contact
            pages. Changes save directly to Supabase and appear immediately on
            the chapter routes.
          </p>
        </div>

        <div className="grid gap-6">
          {editableChapters.map((chapter) => (
            <ChapterContentEditor
              key={chapter.slug}
              chapter={chapter}
              canEdit={provisioningEnabled}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
