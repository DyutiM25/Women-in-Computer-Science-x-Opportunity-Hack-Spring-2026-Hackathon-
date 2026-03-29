"use client";

import { useState, useTransition } from "react";

type ChapterProvisionFormProps = {
  disabled?: boolean;
};

type ProvisionResult = {
  ok: boolean;
  message: string;
  chapterUrl?: string;
};

export function ChapterProvisionForm({
  disabled = false,
}: ChapterProvisionFormProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ProvisionResult | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
    );

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/chapters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = (await response.json()) as ProvisionResult;
        setResult(data);

        if (response.ok) {
          form.reset();
        }
      } catch {
        setResult({
          ok: false,
          message: "Unable to provision the chapter right now.",
        });
      }
    });
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
          Chapter Provisioning
        </p>
        <h2 className="text-2xl font-semibold text-slate-950">
          Create a chapter site
        </h2>
        <p className="text-sm leading-7 text-slate-700">
          This provisions a new subdirectory chapter site using the shared WIAL
          chapter template and makes it available immediately at{" "}
          <code>/chapter-slug</code>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Chapter name</span>
          <input
            name="name"
            required
            disabled={disabled || isPending}
            placeholder="WIAL Canada"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Slug</span>
          <input
            name="slug"
            required
            disabled={disabled || isPending}
            placeholder="canada"
            pattern="^[a-z0-9-]+$"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Region</span>
          <input
            name="region"
            required
            disabled={disabled || isPending}
            placeholder="North America"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Contact email</span>
          <input
            name="contactEmail"
            type="email"
            required
            disabled={disabled || isPending}
            placeholder="canada@wial.org"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm md:col-span-2">
          <span className="font-medium text-slate-800">Summary</span>
          <textarea
            name="summary"
            required
            rows={3}
            disabled={disabled || isPending}
            placeholder="A newly provisioned chapter site created from the shared WIAL chapter template."
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm md:col-span-2">
          <span className="font-medium text-slate-800">Local focus</span>
          <textarea
            name="focus"
            required
            rows={3}
            disabled={disabled || isPending}
            placeholder="National chapter launch planning and bilingual community visibility"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={disabled || isPending}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            {isPending ? "Provisioning..." : "Provision chapter"}
          </button>
        </div>
      </form>

      {disabled ? (
        <p className="mt-4 text-sm leading-7 text-amber-700">
          Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and
          `SUPABASE_SERVICE_ROLE_KEY` to enable authenticated provisioning.
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
          <p>{result.message}</p>
          {result.chapterUrl ? (
            <p className="mt-1 font-medium">New route: {result.chapterUrl}</p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
