import "server-only";

import { chapters as fallbackChapters, type Chapter as FallbackChapter } from "@/lib/site-data";
import { getSupabaseServerClient } from "@/lib/supabase";

export type ProvisionedChapter = {
  slug: string;
  name: string;
  region: string;
  summary: string;
  focus: string;
  contactEmail: string;
  heroImageUrl: string | null;
  aboutHeading: string;
  aboutBody: string;
  contactHeading: string;
  contactBody: string;
  externalSiteUrl: string | null;
  otherOfferingsLabel: string;
  status: "draft" | "active" | "archived";
  launchMode: "subdirectory" | "subdomain";
  templateVersion: string;
  createdBy: string | null;
  updatedBy: string | null;
  updatedAt: string | null;
};

type ChapterRow = {
  slug: string;
  name: string;
  region: string | null;
  contact_email: string | null;
  description: string | null;
  focus: string | null;
  hero_image_url: string | null;
  about_heading: string | null;
  about_body: string | null;
  contact_heading: string | null;
  contact_body: string | null;
  external_site_url: string | null;
  other_offerings_label: string | null;
  status: "draft" | "active" | "archived";
  launch_mode: "subdirectory" | "subdomain";
  template_version: string;
  created_by: string | null;
  updated_by: string | null;
  updated_at: string | null;
};

function mapFallbackChapter(chapter: FallbackChapter): ProvisionedChapter {
  return {
    slug: chapter.slug,
    name: chapter.name,
    region: chapter.region,
    summary: chapter.summary,
    focus: chapter.focus,
    contactEmail: chapter.contactEmail,
    heroImageUrl: null,
    aboutHeading: `About ${chapter.name}`,
    aboutBody: `${chapter.name} operates within the shared WIAL network while adapting outreach, partnerships, and local programming to the needs of ${chapter.region}.`,
    contactHeading: `Contact ${chapter.name}`,
    contactBody:
      "Reach the chapter directly for local programming, regional coaching activity, and partnership conversations.",
    externalSiteUrl: null,
    otherOfferingsLabel: "Visit full affiliate site",
    status: "active",
    launchMode: "subdirectory",
    templateVersion: "seed-template",
    createdBy: null,
    updatedBy: null,
    updatedAt: null,
  };
}

function mapChapterRow(chapter: ChapterRow): ProvisionedChapter {
  return {
    slug: chapter.slug,
    name: chapter.name,
    region: chapter.region ?? "Global",
    summary: chapter.description ?? "This chapter is using the shared WIAL template.",
    focus: chapter.focus ?? "Local chapter programs and Action Learning visibility",
    contactEmail: chapter.contact_email ?? "info@wial.org",
    heroImageUrl: chapter.hero_image_url,
    aboutHeading: chapter.about_heading ?? `About ${chapter.name}`,
    aboutBody:
      chapter.about_body ??
      `${chapter.name} operates within the shared WIAL network while adapting outreach, partnerships, and local programming to the needs of ${chapter.region ?? "its region"}.`,
    contactHeading: chapter.contact_heading ?? `Contact ${chapter.name}`,
    contactBody:
      chapter.contact_body ??
      "Reach the chapter directly for local programming, regional coaching activity, and partnership conversations.",
    externalSiteUrl: chapter.external_site_url,
    otherOfferingsLabel:
      chapter.other_offerings_label ?? "Visit full affiliate site",
    status: chapter.status,
    launchMode: chapter.launch_mode,
    templateVersion: chapter.template_version,
    createdBy: chapter.created_by,
    updatedBy: chapter.updated_by,
    updatedAt: chapter.updated_at,
  };
}

export async function getChapterBySlug(slug: string) {
  const supabase = getSupabaseServerClient();
  const fallbackChapter = fallbackChapters.find((chapter) => chapter.slug === slug);

  if (!supabase) {
    return fallbackChapter ? mapFallbackChapter(fallbackChapter) : null;
  }

  const { data, error } = await supabase
    .from("chapters")
    .select(
      "slug, name, region, contact_email, description, focus, hero_image_url, about_heading, about_body, contact_heading, contact_body, external_site_url, other_offerings_label, status, launch_mode, template_version, created_by, updated_by, updated_at",
    )
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle<ChapterRow>();

  if (error || !data) {
    return fallbackChapter ? mapFallbackChapter(fallbackChapter) : null;
  }

  return mapChapterRow(data);
}

export async function listProvisionedChapters() {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return fallbackChapters.map(mapFallbackChapter);
  }

  const { data, error } = await supabase
    .from("chapters")
    .select(
      "slug, name, region, contact_email, description, focus, hero_image_url, about_heading, about_body, contact_heading, contact_body, external_site_url, other_offerings_label, status, launch_mode, template_version, created_by, updated_by, updated_at",
    )
    .order("name", { ascending: true })
    .returns<ChapterRow[]>();

  if (error || !data) {
    return fallbackChapters.map(mapFallbackChapter);
  }

  return data.map(mapChapterRow);
}
