import "server-only";

import { redirect } from "next/navigation";
import { getSupabaseServerAuthClient } from "@/lib/supabase-auth";
import { getSupabaseAdminClient } from "@/lib/supabase";

export type AuthorizedAdmin = {
  email: string;
  displayName: string | null;
  role: "global_admin" | "chapter_lead";
  chapterSlug: string | null;
};

type ChapterAdminRow = {
  email: string;
  display_name: string | null;
  role: "global_admin" | "chapter_lead";
  chapter_slug: string | null;
  is_active: boolean;
};

export async function getCurrentAuthorizedAdmin() {
  const authClient = await getSupabaseServerAuthClient();

  if (!authClient) {
    return { user: null, admin: null as AuthorizedAdmin | null };
  }

  const {
    data: { user },
  } = await authClient.auth.getUser();

  if (!user?.email) {
    return { user: null, admin: null as AuthorizedAdmin | null };
  }

  const adminClient = getSupabaseAdminClient();

  if (!adminClient) {
    return { user, admin: null as AuthorizedAdmin | null };
  }

  const normalizedEmail = user.email.trim().toLowerCase();

  const { data, error } = await adminClient
    .from("chapter_admins")
    .select("email, display_name, role, chapter_slug, is_active")
    .eq("email", normalizedEmail)
    .eq("is_active", true)
    .maybeSingle<ChapterAdminRow>();

  if (error || !data) {
    return { user, admin: null as AuthorizedAdmin | null };
  }

  return {
    user,
    admin: {
      email: data.email,
      displayName: data.display_name,
      role: data.role,
      chapterSlug: data.chapter_slug,
    },
  };
}

export async function requireAuthorizedAdmin() {
  const { user, admin } = await getCurrentAuthorizedAdmin();

  if (!user) {
    redirect("/admin/login?redirectTo=/admin");
  }

  if (!admin) {
    redirect("/admin/unauthorized");
  }

  return admin;
}
