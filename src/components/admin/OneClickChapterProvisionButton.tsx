"use client";

import { useState, useTransition } from "react";

type OneClickChapterProvisionButtonProps = {
  chapterSlug: string;
};

type ProvisionResult = {
  ok: boolean;
  message: string;
  chapterUrl?: string;
};

export function OneClickChapterProvisionButton({
  chapterSlug,
}: OneClickChapterProvisionButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ProvisionResult | null>(null);

  function handleClick() {
    setResult(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/chapters/one-click", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = (await response.json()) as ProvisionResult;
        setResult(data);
      } catch {
        setResult({
          ok: false,
          message: "Unable to create the chapter right now.",
        });
      }
    });
  }

  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-800">
          One-Click Provisioning
        </p>
        <h2 className="text-2xl font-semibold text-slate-950">
          Create your chapter site
        </h2>
        <p className="text-sm leading-7 text-slate-700">
          Your chapter lead account already has a pre-approved chapter profile.
          This button creates `/{chapterSlug}` and applies the shared WIAL
          starter template in one step.
        </p>
      </div>

      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className="mt-6 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        {isPending ? "Creating chapter..." : `Create /${chapterSlug}`}
      </button>

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
