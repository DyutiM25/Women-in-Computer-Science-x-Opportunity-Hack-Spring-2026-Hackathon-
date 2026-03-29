import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentAuthorizedAdmin } from "@/lib/admin-auth";
import { getSupabaseAdminClient } from "@/lib/supabase";

const chapterAdminUpdateSchema = z.object({
  email: z.email(),
  displayName: z.string().trim().max(120).optional().default(""),
  role: z.enum(["global_admin", "chapter_lead"]),
  chapterSlug: z.string().trim().max(60).optional().default(""),
  provisionSlug: z.string().trim().max(60).optional().default(""),
  provisionName: z.string().trim().max(120).optional().default(""),
  provisionRegion: z.string().trim().max(120).optional().default(""),
  provisionContactEmail: z.union([z.email(), z.literal("")]).optional().default(""),
  provisionSummary: z.string().trim().max(600).optional().default(""),
  provisionFocus: z.string().trim().max(400).optional().default(""),
  isActive: z.boolean(),
});

type RouteContext = {
  params: Promise<{ id: string }>;
};

function toNullable(value: string | undefined) {
  const normalized = value?.trim() ?? "";
  return normalized.length > 0 ? normalized : null;
}

export async function PATCH(request: Request, context: RouteContext) {
  const supabase = getSupabaseAdminClient();
  const { admin } = await getCurrentAuthorizedAdmin();
  const { id } = await context.params;

  if (!admin || admin.role !== "global_admin") {
    return NextResponse.json(
      { ok: false, message: "Only global admins can manage admin access." },
      { status: 403 },
    );
  }

  if (!supabase) {
    return NextResponse.json(
      { ok: false, message: "Supabase admin access is not configured." },
      { status: 503 },
    );
  }

  const payload = chapterAdminUpdateSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { ok: false, message: "Invalid admin update payload." },
      { status: 400 },
    );
  }

  const normalizedEmail = payload.data.email.trim().toLowerCase();
  const role = payload.data.role;

  const { error } = await supabase
    .from("chapter_admins")
    .update({
      email: normalizedEmail,
      display_name: toNullable(payload.data.displayName),
      role,
      chapter_slug:
        role === "chapter_lead" ? toNullable(payload.data.chapterSlug) : null,
      provision_slug:
        role === "chapter_lead" ? toNullable(payload.data.provisionSlug) : null,
      provision_name:
        role === "chapter_lead" ? toNullable(payload.data.provisionName) : null,
      provision_region:
        role === "chapter_lead" ? toNullable(payload.data.provisionRegion) : null,
      provision_contact_email:
        role === "chapter_lead"
          ? toNullable(payload.data.provisionContactEmail?.toLowerCase())
          : null,
      provision_summary:
        role === "chapter_lead" ? toNullable(payload.data.provisionSummary) : null,
      provision_focus:
        role === "chapter_lead" ? toNullable(payload.data.provisionFocus) : null,
      is_active: payload.data.isActive,
    })
    .eq("id", id);

  if (error) {
    const message =
      error.code === "23505"
        ? "Another admin record is already using that email."
        : "Unable to update that admin access record right now.";

    return NextResponse.json({ ok: false, message }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: `Updated admin access for ${normalizedEmail}.`,
  });
}
