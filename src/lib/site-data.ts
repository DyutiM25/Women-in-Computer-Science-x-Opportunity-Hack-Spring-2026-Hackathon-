export type Chapter = {
  slug: string;
  name: string;
  region: string;
  summary: string;
  focus: string;
  contactEmail: string;
};

export type Coach = {
  name: string;
  chapter: string;
  certification: "CALC" | "PALC" | "SALC" | "MALC";
  location: string;
  email: string;
  bio: string;
};

export const chapters: Chapter[] = [
  {
    slug: "usa",
    name: "WIAL USA",
    region: "North America",
    summary:
      "A chapter landing page for events, coach visibility, and local Action Learning resources.",
    focus: "Corporate leadership development and certification access",
    contactEmail: "usa@wial.org",
  },
  {
    slug: "nigeria",
    name: "WIAL Nigeria",
    region: "West Africa",
    summary:
      "A lightweight regional site designed for mobile-first access and chapter updates.",
    focus: "Local network building and chapter-led event promotion",
    contactEmail: "nigeria@wial.org",
  },
  {
    slug: "philippines",
    name: "WIAL Philippines",
    region: "Southeast Asia",
    summary:
      "A chapter template showing how WIAL can keep global branding while localizing content.",
    focus: "Certification awareness and community engagement",
    contactEmail: "philippines@wial.org",
  },
];

export const coaches: Coach[] = [
  {
    name: "Angela Reed",
    chapter: "USA",
    certification: "PALC",
    location: "Phoenix, Arizona",
    email: "angela.reed@example.com",
    bio: "Supports leadership teams adopting Action Learning in higher education and nonprofit settings.",
  },
  {
    name: "Tunde Adebayo",
    chapter: "Nigeria",
    certification: "CALC",
    location: "Lagos, Nigeria",
    email: "tunde.adebayo@example.com",
    bio: "Works with emerging chapter partners and community leaders to launch Action Learning cohorts.",
  },
  {
    name: "Marisol de la Cruz",
    chapter: "Philippines",
    certification: "SALC",
    location: "Manila, Philippines",
    email: "marisol.delacruz@example.com",
    bio: "Facilitates coach development programs with a focus on distributed teams and virtual collaboration.",
  },
];
