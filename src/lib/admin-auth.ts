import "server-only";

import { redirect } from "next/navigation";
import { getSupabaseServerAuthClient } from "@/lib/supabase-auth";
import { getSupabaseAdminClient } from "@/lib/supabase";

export type AuthorizedAdmin = {
  email: string;
  displayName: string | null;
  role: "global_admin" | "chapter_lead";
  chapterSlug: string | null;
  provisionSlug: string | null;
  provisionName: string | null;
  provisionRegion: string | null;
  provisionContactEmail: string | null;
  provisionSummary: string | null;
  provisionFocus: string | null;
};

export type ManagedChapterAdmin = {
  id: string;
  email: string;
  display_name: string | null;
  role: "global_admin" | "chapter_lead";
  chapter_slug: string | null;
  provision_slug: string | null;
  provision_name: string | null;
  provision_region: string | null;
  provision_contact_email: string | null;
  provision_summary: string | null;
  provision_focus: string | null;
  is_active: boolean;
  created_at?: string | null;
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
    .select(
      "id, email, display_name, role, chapter_slug, provision_slug, provision_name, provision_region, provision_contact_email, provision_summary, provision_focus, is_active",
    )
    .eq("email", normalizedEmail)
    .eq("is_active", true)
    .maybeSingle<ManagedChapterAdmin>();

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
      provisionSlug: data.provision_slug,
      provisionName: data.provision_name,
      provisionRegion: data.provision_region,
      provisionContactEmail: data.provision_contact_email,
      provisionSummary: data.provision_summary,
      provisionFocus: data.provision_focus,
    },
  };
}

export async function listManagedChapterAdmins() {
  const adminClient = getSupabaseAdminClient();

  if (!adminClient) {
    return [] as ManagedChapterAdmin[];
  }

  const { data, error } = await adminClient
    .from("chapter_admins")
    .select(
      "id, email, display_name, role, chapter_slug, provision_slug, provision_name, provision_region, provision_contact_email, provision_summary, provision_focus, is_active, created_at",
    )
    .order("created_at", { ascending: true })
    .returns<ManagedChapterAdmin[]>();

  if (error || !data) {
    return [] as ManagedChapterAdmin[];
  }

  return data;
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
