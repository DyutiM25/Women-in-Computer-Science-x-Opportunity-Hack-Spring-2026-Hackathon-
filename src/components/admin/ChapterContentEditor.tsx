"use client";

import { useState, useTransition } from "react";
import type { ProvisionedChapter } from "@/lib/chapters";

type ChapterContentEditorProps = {
  chapter: ProvisionedChapter;
  canEdit: boolean;
};

type UpdateResult = {
  ok: boolean;
  message: string;
};

export function ChapterContentEditor({
  chapter,
  canEdit,
}: ChapterContentEditorProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<UpdateResult | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
    );

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/chapters/${chapter.slug}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = (await response.json()) as UpdateResult;
        setResult(data);
      } catch {
        setResult({
          ok: false,
          message: "Unable to save chapter content right now.",
        });
      }
    });
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
          Chapter Content
        </p>
        <h2 className="text-2xl font-semibold text-slate-950">
          Edit {chapter.name}
        </h2>
        <p className="text-sm leading-7 text-slate-700">
          Update the live copy used by `/{chapter.slug}`, `/{chapter.slug}/about`,
          and `/{chapter.slug}/contact`.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Summary</span>
          <textarea
            name="summary"
            defaultValue={chapter.summary}
            required
            rows={3}
            disabled={!canEdit || isPending}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Local focus</span>
          <textarea
            name="focus"
            defaultValue={chapter.focus}
            required
            rows={3}
            disabled={!canEdit || isPending}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">About heading</span>
          <input
            name="aboutHeading"
            defaultValue={chapter.aboutHeading}
            required
            disabled={!canEdit || isPending}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Contact heading</span>
          <input
            name="contactHeading"
            defaultValue={chapter.contactHeading}
            required
            disabled={!canEdit || isPending}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm md:col-span-2">
          <span className="font-medium text-slate-800">About body</span>
          <textarea
            name="aboutBody"
            defaultValue={chapter.aboutBody}
            required
            rows={5}
            disabled={!canEdit || isPending}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm md:col-span-2">
          <span className="font-medium text-slate-800">Contact body</span>
          <textarea
            name="contactBody"
            defaultValue={chapter.contactBody}
            required
            rows={4}
            disabled={!canEdit || isPending}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">Other offerings label</span>
          <input
            name="otherOfferingsLabel"
            defaultValue={chapter.otherOfferingsLabel}
            placeholder="Visit full affiliate site"
            disabled={!canEdit || isPending}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium text-slate-800">External site URL</span>
          <input
            name="externalSiteUrl"
            type="url"
            defaultValue={chapter.externalSiteUrl ?? ""}
            placeholder="https://affiliate.example.org"
            disabled={!canEdit || isPending}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500 disabled:bg-slate-100"
          />
        </label>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={!canEdit || isPending}
            className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            {isPending ? "Saving..." : "Save chapter content"}
          </button>
        </div>
      </form>

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
