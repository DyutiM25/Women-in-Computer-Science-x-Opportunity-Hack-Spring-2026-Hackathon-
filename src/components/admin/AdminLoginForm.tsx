"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type AdminLoginFormProps = {
  redirectTo: string;
};

export function AdminLoginForm({ redirectTo }: AdminLoginFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setErrorMessage("Supabase auth is not configured in this environment.");
      return;
    }

    startTransition(async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      router.replace(redirectTo || "/admin");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <label className="block space-y-2 text-sm">
        <span className="font-medium text-slate-800">Email</span>
        <input
          name="email"
          type="email"
          required
          placeholder="admin@wial.org"
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
        />
      </label>

      <label className="block space-y-2 text-sm">
        <span className="font-medium text-slate-800">Password</span>
        <input
          name="password"
          type="password"
          required
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        {isPending ? "Signing in..." : "Sign in to admin"}
      </button>

      {errorMessage ? (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm leading-7 text-rose-900">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
