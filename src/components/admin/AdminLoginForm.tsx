"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/lib/supabase";

type AdminLoginFormProps = {
  redirectTo: string;
};

export function AdminLoginForm({ redirectTo }: AdminLoginFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  function submitWithMode(mode: "login" | "signup") {
    setErrorMessage(null);
    setInfoMessage(null);

    if (!formRef.current) {
      setErrorMessage("The admin form is not ready yet.");
      return;
    }

    const formData = new FormData(formRef.current);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setErrorMessage("Supabase auth is not configured in this environment.");
      return;
    }

    startTransition(async () => {
      const { error } =
        mode === "login"
          ? await supabase.auth.signInWithPassword({
              email,
              password,
            })
          : await supabase.auth.signUp({
              email,
              password,
            });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (mode === "signup") {
        setInfoMessage(
          "Account created. If email confirmation is enabled in Supabase, confirm your email first, then sign in.",
        );
        return;
      }

      router.replace(redirectTo || "/admin");
      router.refresh();
    });
  }

  return (
    <form
      ref={formRef}
      onSubmit={(event) => {
        event.preventDefault();
        submitWithMode("login");
      }}
      className="mt-8 space-y-4"
    >
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
          minLength={8}
          className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-sky-500"
        />
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-500"
        >
          {isPending ? "Working..." : "Sign in to admin"}
        </button>
        <button
          type="button"
          disabled={isPending}
          onClick={() => submitWithMode("signup")}
          className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Create account
        </button>
      </div>

      <p className="text-sm leading-7 text-slate-600">
        Only allowlisted admin or chapter-lead emails will get access after
        sign-in. Creating an account does not grant admin access by itself.
      </p>

      {errorMessage ? (
        <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm leading-7 text-rose-900">
          {errorMessage}
        </p>
      ) : null}

      {infoMessage ? (
        <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm leading-7 text-emerald-900">
          {infoMessage}
        </p>
      ) : null}
    </form>
  );
}
