import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentAuthorizedAdmin } from "@/lib/admin-auth";
import { getSupabaseAdminClient } from "@/lib/supabase";

const chapterProvisionSchema = z.object({
  name: z.string().trim().min(3).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .regex(/^[a-z0-9-]+$/),
  region: z.string().trim().min(2).max(120),
  contactEmail: z.email(),
  summary: z.string().trim().min(12).max(600),
  focus: z.string().trim().min(12).max(400),
});

export async function POST(request: Request) {
  const supabase = getSupabaseAdminClient();
  const { user, admin } = await getCurrentAuthorizedAdmin();

  if (!user || !admin) {
    return NextResponse.json(
      {
        ok: false,
        message: "You are not authorized to provision chapters.",
      },
      { status: 403 },
    );
  }

  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Supabase provisioning is not configured. Add the required environment variables first.",
      },
      { status: 503 },
    );
  }

  const payload = chapterProvisionSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Invalid chapter provisioning payload.",
      },
      { status: 400 },
    );
  }

  const { name, slug, region, contactEmail, summary, focus } = payload.data;

  if (admin.role === "chapter_lead" && admin.chapterSlug && admin.chapterSlug !== slug) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Chapter leads can only provision the chapter assigned to their account.",
      },
      { status: 403 },
    );
  }

  const { data: existingChapter, error: existingChapterError } = await supabase
    .from("chapters")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle<{ slug: string }>();

  if (existingChapterError) {
    return NextResponse.json(
      {
        ok: false,
        message: "Unable to validate the chapter slug right now.",
      },
      { status: 500 },
    );
  }

  if (existingChapter) {
    return NextResponse.json(
      {
        ok: false,
        message: "That chapter slug already exists.",
      },
      { status: 409 },
    );
  }

  const { error } = await supabase.from("chapters").insert({
    slug,
    name,
    region,
    contact_email: contactEmail,
    description: summary,
    focus,
    about_heading: `About ${name}`,
    about_body: `${name} operates within the shared WIAL network while adapting outreach, partnerships, and local programming to the needs of ${region}.`,
    contact_heading: `Contact ${name}`,
    contact_body:
      "Reach the chapter directly for local programming, regional coaching activity, and partnership conversations.",
    other_offerings_label: "Visit full affiliate site",
    status: "active",
    launch_mode: "subdirectory",
    template_version: "wial-core-v1",
    created_by: user.email?.trim().toLowerCase() ?? null,
    updated_by: user.email?.trim().toLowerCase() ?? null,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Provisioning failed while saving the chapter.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: `Chapter provisioned successfully for /${slug}.`,
    chapterUrl: `/${slug}`,
  });
}
