"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ManagedChapterAdmin } from "@/lib/admin-auth";

type ChapterAdminsManagerProps = {
  admins: ManagedChapterAdmin[];
  chapterSlugs: string[];
  disabled: boolean;
};

type AdminFormState = {
  email: string;
  displayName: string;
  role: "global_admin" | "chapter_lead";
  chapterSlug: string;
  provisionSlug: string;
  provisionName: string;
  provisionRegion: string;
  provisionContactEmail: string;
  provisionSummary: string;
  provisionFocus: string;
  isActive: boolean;
};

type MutationResult = {
  ok: boolean;
  message: string;
};

const emptyAdminForm: AdminFormState = {
  email: "",
  displayName: "",
  role: "chapter_lead",
  chapterSlug: "",
  provisionSlug: "",
  provisionName: "",
  provisionRegion: "",
  provisionContactEmail: "",
  provisionSummary: "",
  provisionFocus: "",
  isActive: true,
};

function mapAdminToForm(admin: ManagedChapterAdmin): AdminFormState {
  return {
    email: admin.email,
    displayName: admin.display_name ?? "",
    role: admin.role,
    chapterSlug: admin.chapter_slug ?? "",
    provisionSlug: admin.provision_slug ?? "",
    provisionName: admin.provision_name ?? "",
    provisionRegion: admin.provision_region ?? "",
    provisionContactEmail: admin.provision_contact_email ?? "",
    provisionSummary: admin.provision_summary ?? "",
    provisionFocus: admin.provision_focus ?? "",
    isActive: admin.is_active,
  };
}

function ChapterLeadFields({
  value,
  onChange,
  chapterSlugs,
  disabled,
}: {
  value: AdminFormState;
  onChange: (field: keyof AdminFormState, nextValue: string | boolean) => void;
  chapterSlugs: string[];
  disabled: boolean;
}) {
  if (value.role !== "chapter_lead") {
    return null;
  }

  return (
    <>
      <label className="block space-y-2 text-sm">
        <span className="font-medium text-slate-800">Assigned chapter</span>
        <select
          value={value.chapterSlug}
          onChange={(event) => onChange("chapterSlug", event.target.value)}
          disabled={disabled}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
        >
          <option value="">Not attached yet</option>
          {chapterSlugs.map((slug) => (
            <option key={slug} value={slug}>
              {slug}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-slate-800">Provision slug</span>
        <input
          value={value.provisionSlug}
          onChange={(event) => onChange("provisionSlug", event.target.value)}
          disabled={disabled}
          placeholder="kenya"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-slate-800">Provision name</span>
        <input
          value={value.provisionName}
          onChange={(event) => onChange("provisionName", event.target.value)}
          disabled={disabled}
          placeholder="WIAL Kenya"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-slate-800">Provision region</span>
        <input
          value={value.provisionRegion}
          onChange={(event) => onChange("provisionRegion", event.target.value)}
          disabled={disabled}
          placeholder="East Africa"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-slate-800">
          Provision contact email
        </span>
        <input
          type="email"
          value={value.provisionContactEmail}
          onChange={(event) =>
            onChange("provisionContactEmail", event.target.value)
          }
          disabled={disabled}
          placeholder="kenya@wial.org"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
        />
      </label>

      <label className="block space-y-2 text-sm md:col-span-2">
        <span className="font-medium text-slate-800">Provision summary</span>
        <textarea
          value={value.provisionSummary}
          onChange={(event) => onChange("provisionSummary", event.target.value)}
          disabled={disabled}
          rows={3}
          placeholder="A ready-to-launch chapter site created from the shared WIAL template."
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
        />
      </label>

      <label className="block space-y-2 text-sm md:col-span-2">
        <span className="font-medium text-slate-800">Provision focus</span>
        <textarea
          value={value.provisionFocus}
          onChange={(event) => onChange("provisionFocus", event.target.value)}
          disabled={disabled}
          rows={3}
          placeholder="Regional network building and local Action Learning visibility."
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
        />
      </label>
    </>
  );
}

function ChapterAdminCard({
  admin,
  chapterSlugs,
  disabled,
}: {
  admin: ManagedChapterAdmin;
  chapterSlugs: string[];
  disabled: boolean;
}) {
  const router = useRouter();
  const [form, setForm] = useState<AdminFormState>(() => mapAdminToForm(admin));
  const [result, setResult] = useState<MutationResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function setField(field: keyof AdminFormState, nextValue: string | boolean) {
    setForm((current) => ({
      ...current,
      [field]: nextValue,
    }));
  }

  function saveChanges(nextForm: AdminFormState) {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/chapter-admins/${admin.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nextForm),
        });

        const data = (await response.json()) as MutationResult;
        setResult(data);

        if (response.ok) {
          router.refresh();
        }
      } catch {
        setResult({
          ok: false,
          message: "Unable to update this admin record right now.",
        });
      }
    });
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
            Access Record
          </p>
          <h3 className="text-2xl font-semibold text-slate-950">
            {admin.display_name ?? admin.email}
          </h3>
          <p className="text-sm leading-7 text-slate-700">
            Created for {admin.email}
          </p>
        </div>
        <button
          type="button"
          disabled={disabled || isPending}
          onClick={() => saveChanges({ ...form, isActive: !form.isActive })}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {form.isActive ? "Deactivate access" : "Reactivate access"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => setField("email", event.target.value)}
            disabled={disabled || isPending}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Display name</span>
          <input
            value={form.displayName}
            onChange={(event) => setField("displayName", event.target.value)}
            disabled={disabled || isPending}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Role</span>
          <select
            value={form.role}
            onChange={(event) =>
              setField(
                "role",
                event.target.value as AdminFormState["role"],
              )
            }
            disabled={disabled || isPending}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          >
            <option value="global_admin">Global admin</option>
            <option value="chapter_lead">Chapter lead</option>
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(event) => setField("isActive", event.target.checked)}
            disabled={disabled || isPending}
          />
          Access is active
        </label>

        <ChapterLeadFields
          value={form}
          onChange={setField}
          chapterSlugs={chapterSlugs}
          disabled={disabled || isPending}
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={disabled || isPending}
          onClick={() => saveChanges(form)}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
        >
          {isPending ? "Saving..." : "Save access record"}
        </button>
        <p className="text-sm text-slate-500">
          Status: {form.isActive ? "active" : "inactive"}
        </p>
      </div>

      {result ? (
        <div
          className={`mt-4 rounded-2xl px-4 py-3 text-sm leading-7 ${
            result.ok
              ? "bg-emerald-50 text-emerald-900"
              : "bg-rose-50 text-rose-900"
          }`}
        >
          {result.message}
        </div>
      ) : null}
    </section>
  );
}

export function ChapterAdminsManager({
  admins,
  chapterSlugs,
  disabled,
}: ChapterAdminsManagerProps) {
  const router = useRouter();
  const [form, setForm] = useState<AdminFormState>(emptyAdminForm);
  const [result, setResult] = useState<MutationResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function setField(field: keyof AdminFormState, nextValue: string | boolean) {
    setForm((current) => ({
      ...current,
      [field]: nextValue,
    }));
  }

  function handleCreate() {
    setResult(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/chapter-admins", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = (await response.json()) as MutationResult;
        setResult(data);

        if (response.ok) {
          setForm(emptyAdminForm);
          router.refresh();
        }
      } catch {
        setResult({
          ok: false,
          message: "Unable to create the admin record right now.",
        });
      }
    });
  }

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950">
          Admin access management
        </h2>
        <p className="max-w-3xl text-base leading-8 text-slate-700">
          Global admins can add chapter leads, assign active chapter access,
          attach one-click provisioning profiles, and deactivate access without
          touching SQL directly.
        </p>
      </div>

      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
            Add Admin User
          </p>
          <h3 className="text-2xl font-semibold text-slate-950">
            Create an admin access record
          </h3>
          <p className="text-sm leading-7 text-slate-700">
            Use this for platform admins or chapter leads. Chapter-lead entries
            can also carry a pre-approved one-click provisioning profile.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block space-y-2 text-sm">
            <span className="font-medium text-slate-800">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setField("email", event.target.value)}
              disabled={disabled || isPending}
              placeholder="kenya.lead@wial.org"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span className="font-medium text-slate-800">Display name</span>
            <input
              value={form.displayName}
              onChange={(event) => setField("displayName", event.target.value)}
              disabled={disabled || isPending}
              placeholder="WIAL Kenya Chapter Lead"
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span className="font-medium text-slate-800">Role</span>
            <select
              value={form.role}
              onChange={(event) =>
                setField(
                  "role",
                  event.target.value as AdminFormState["role"],
                )
              }
              disabled={disabled || isPending}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
            >
              <option value="chapter_lead">Chapter lead</option>
              <option value="global_admin">Global admin</option>
            </select>
          </label>

          <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(event) => setField("isActive", event.target.checked)}
              disabled={disabled || isPending}
            />
            Access is active
          </label>

          <ChapterLeadFields
            value={form}
            onChange={setField}
            chapterSlugs={chapterSlugs}
            disabled={disabled || isPending}
          />
        </div>

        <div className="mt-6">
          <button
            type="button"
            disabled={disabled || isPending}
            onClick={handleCreate}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            {isPending ? "Saving..." : "Add admin access"}
          </button>
        </div>

        {disabled ? (
          <p className="mt-4 text-sm leading-7 text-amber-700">
            Supabase admin access is required before global admins can manage
            chapter lead records from this workspace.
          </p>
        ) : null}

        {result ? (
          <div
            className={`mt-4 rounded-2xl px-4 py-3 text-sm leading-7 ${
              result.ok
                ? "bg-emerald-50 text-emerald-900"
                : "bg-rose-50 text-rose-900"
            }`}
          >
            {result.message}
          </div>
        ) : null}
      </section>

      <div className="grid gap-6">
        {admins.map((admin) => (
          <ChapterAdminCard
            key={admin.id}
            admin={admin}
            chapterSlugs={chapterSlugs}
            disabled={disabled}
          />
        ))}
      </div>
    </section>
  );
}
