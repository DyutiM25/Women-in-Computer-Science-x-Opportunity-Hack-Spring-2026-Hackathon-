import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentAuthorizedAdmin } from "@/lib/admin-auth";
import { getSupabaseAdminClient } from "@/lib/supabase";

const chapterContentSchema = z.object({
  summary: z.string().trim().min(12).max(600),
  focus: z.string().trim().min(12).max(400),
  aboutHeading: z.string().trim().min(3).max(120),
  aboutBody: z.string().trim().min(12).max(2000),
  contactHeading: z.string().trim().min(3).max(120),
  contactBody: z.string().trim().min(12).max(1600),
  externalSiteUrl: z.string().trim().url().or(z.literal("")),
  otherOfferingsLabel: z.string().trim().max(120),
});

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  const supabase = getSupabaseAdminClient();
  const { user, admin } = await getCurrentAuthorizedAdmin();
  const { slug } = await context.params;

  if (!user || !admin) {
    return NextResponse.json(
      { ok: false, message: "You are not authorized to edit chapter content." },
      { status: 403 },
    );
  }

  if (!supabase) {
    return NextResponse.json(
      { ok: false, message: "Supabase admin access is not configured." },
      { status: 503 },
    );
  }

  if (admin.role === "chapter_lead" && admin.chapterSlug !== slug) {
    return NextResponse.json(
      {
        ok: false,
        message: "Chapter leads can only edit the chapter assigned to them.",
      },
      { status: 403 },
    );
  }

  const payload = chapterContentSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { ok: false, message: "Invalid chapter content payload." },
      { status: 400 },
    );
  }

  const {
    summary,
    focus,
    aboutHeading,
    aboutBody,
    contactHeading,
    contactBody,
    externalSiteUrl,
    otherOfferingsLabel,
  } = payload.data;

  const { error } = await supabase
    .from("chapters")
    .update({
      description: summary,
      focus,
      about_heading: aboutHeading,
      about_body: aboutBody,
      contact_heading: contactHeading,
      contact_body: contactBody,
      external_site_url: externalSiteUrl || null,
      other_offerings_label: otherOfferingsLabel || null,
      updated_by: user.email?.trim().toLowerCase() ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("slug", slug);

  if (error) {
    return NextResponse.json(
      { ok: false, message: "Failed to save chapter content." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: `Updated live content for /${slug}.`,
  });
}
