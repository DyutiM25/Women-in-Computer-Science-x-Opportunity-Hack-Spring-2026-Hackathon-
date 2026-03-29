import { NextResponse } from "next/server";
import { getCurrentAuthorizedAdmin } from "@/lib/admin-auth";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST() {
  const supabase = getSupabaseAdminClient();
  const { user, admin } = await getCurrentAuthorizedAdmin();

  if (!user || !admin || admin.role !== "chapter_lead") {
    return NextResponse.json(
      {
        ok: false,
        message: "Only chapter leads can use one-click chapter creation.",
      },
      { status: 403 },
    );
  }

  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        message: "Supabase provisioning is not configured.",
      },
      { status: 503 },
    );
  }

  const slug = admin.provisionSlug?.trim().toLowerCase() ?? "";
  const name = admin.provisionName?.trim() ?? "";
  const region = admin.provisionRegion?.trim() ?? "";
  const contactEmail = admin.provisionContactEmail?.trim().toLowerCase() ?? "";
  const summary = admin.provisionSummary?.trim() ?? "";
  const focus = admin.provisionFocus?.trim() ?? "";

  if (!slug || !name || !region || !contactEmail || !summary || !focus) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "This chapter lead account is missing a pre-approved chapter profile.",
      },
      { status: 400 },
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
    await supabase
      .from("chapter_admins")
      .update({ chapter_slug: slug })
      .eq("email", admin.email);

    return NextResponse.json({
      ok: true,
      message: `Your chapter already exists at /${slug}.`,
      chapterUrl: `/${slug}`,
    });
  }

  const { error: insertError } = await supabase.from("chapters").insert({
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

  if (insertError) {
    return NextResponse.json(
      {
        ok: false,
        message: "One-click chapter creation failed while saving the chapter.",
      },
      { status: 500 },
    );
  }

  const { error: adminUpdateError } = await supabase
    .from("chapter_admins")
    .update({ chapter_slug: slug })
    .eq("email", admin.email);

  if (adminUpdateError) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "The chapter was created, but the chapter lead assignment could not be finalized.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: `Chapter created successfully at /${slug}.`,
    chapterUrl: `/${slug}`,
  });
}
