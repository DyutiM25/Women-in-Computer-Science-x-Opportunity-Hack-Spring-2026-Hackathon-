insert into chapters (
  slug,
  name,
  region,
  contact_email,
  description,
  focus,
  about_heading,
  about_body,
  contact_heading,
  contact_body,
  external_site_url,
  other_offerings_label,
  status,
  launch_mode,
  template_version,
  created_by
) values
  (
    'usa',
    'WIAL USA',
    'North America',
    'usa@wial.org',
    'The official USA affiliate of WIAL',
    'Corporate leadership development and certification access',
    'About WIAL USA',
    'WIAL USA supports local Action Learning awareness, chapter programs, and regional coach visibility while staying aligned with the broader WIAL network.',
    'Contact WIAL USA',
    'Use this chapter contact for USA-specific programs, partnerships, and coach-related questions.',
    null,
    null,
    'active',
    'subdirectory',
    'wial-core-v1',
    'seed@wial.org'
  ),
  (
    'nigeria',
    'WIAL Nigeria',
    'Africa',
    'nigeria@wial.org',
    'Serving coaches across West Africa',
    'Local network building and chapter-led event promotion',
    'About WIAL Nigeria',
    'WIAL Nigeria extends the shared WIAL approach through chapter-led visibility, local partnerships, and Action Learning programming for regional audiences.',
    'Contact WIAL Nigeria',
    'Use this chapter contact for Nigeria-specific chapter activity, events, and partnership outreach.',
    null,
    null,
    'active',
    'subdirectory',
    'wial-core-v1',
    'seed@wial.org'
  ),
  (
    'brazil',
    'WIAL Brazil',
    'South America',
    'brazil@wial.org',
    'Comunidade de Action Learning no Brasil',
    'Coaching executivo e desenvolvimento de liderancas em empresas de medio porte',
    'About WIAL Brazil',
    'WIAL Brazil connects local audiences with Action Learning practice while using the shared WIAL chapter template as a consistent public front door.',
    'Contact WIAL Brazil',
    'Use this chapter contact for local Brazil chapter inquiries and chapter-supported Action Learning offerings.',
    'https://example.org/brazil-affiliate',
    'View additional affiliate offerings',
    'active',
    'subdirectory',
    'wial-core-v1',
    'seed@wial.org'
  ),
  (
    'canada',
    'WIAL Canada',
    'North America',
    'canada@wial.org',
    'A newly provisioned chapter site created from the shared WIAL chapter template.',
    'National chapter launch planning and bilingual community visibility',
    'About WIAL Canada',
    'WIAL Canada uses the shared chapter template to launch a localized site for regional visibility, partnerships, and chapter communications.',
    'Contact WIAL Canada',
    'Use this chapter contact for local chapter activity, partnerships, and chapter-supported programming in Canada.',
    null,
    null,
    'active',
    'subdirectory',
    'wial-core-v1',
    'seed@wial.org'
  )
on conflict (slug) do nothing;

insert into chapter_admins (
  email,
  display_name,
  role,
  chapter_slug,
  is_active
) values
  (
    'admin@wial.org',
    'WIAL Platform Admin',
    'global_admin',
    null,
    true
  ),
  (
    'canada.lead@wial.org',
    'WIAL Canada Chapter Lead',
    'chapter_lead',
    'canada',
    true
  )
on conflict (email) do nothing;

insert into coaches (chapter_id, full_name, email, bio, cert_level, location, is_approved)
values
  ((select id from chapters where slug='usa'),
   'Sarah Mitchell', 'sarah@example.com',
   'Experienced Action Learning coach specializing in leadership development for manufacturing teams.',
   'MALC', 'New York, USA', true),
  ((select id from chapters where slug='nigeria'),
   'Emeka Okonkwo', 'emeka@example.com',
   'Especialista em dinâmicas de equipe e desenvolvimento organizacional em ambientes industriais.',
   'CALC', 'Lagos, Nigeria', true),
  ((select id from chapters where slug='brazil'),
   'Ana Paula Ferreira', 'ana@example.com',
   'Coaching executivo e desenvolvimento de lideranças em empresas de médio porte no Brasil.',
   'SALC', 'São Paulo, Brazil', true);
