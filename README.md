<div align="center">

<br/>

```
██╗    ██╗██╗ █████╗ ██╗          ███╗   ███╗██╗   ██╗██████╗
██║    ██║██║██╔══██╗██║          ████╗ ████║██║   ██║██╔══██╗
██║ █╗ ██║██║███████║██║          ██╔████╔██║██║   ██║██████╔╝
██║███╗██║██║██╔══██║██║          ██║╚██╔╝██║╚██╗ ██╔╝██╔═══╝
╚███╔███╔╝██║██║  ██║███████╗     ██║ ╚═╝ ██║ ╚████╔╝ ██║
 ╚══╝╚══╝ ╚═╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝  ╚═══╝  ╚═╝
```

**One platform. Every chapter. Every coach. Every region.**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-21--not--so--cool.vercel.app-6366f1?style=for-the-badge)](https://21-not-so-cool.vercel.app/)
[![Hackathon](https://img.shields.io/badge/🏆_Hackathon-WiCS_×_Opportunity_Hack_2026-ec4899?style=for-the-badge)](https://www.ohack.dev/hack/2026_spring_wics_asu)
[![DevPost](https://img.shields.io/badge/📋_DevPost-Submission-003e54?style=for-the-badge)](https://wics-ohack-sp26-hackathon.devpost.com/)

</div>

---

## 🎯 The Problem

> WIAL has a global brand, regional chapters, coaches, certification pathways, and chapter-specific outreach needs — but those experiences shouldn't require a brand-new website or engineering workflow every time a chapter launches.

We built an MVP that gives WIAL a **single, scalable platform** instead of dozens of disconnected sites.

---

## ✨ What We Built

<table>
<tr>
<td width="25%" align="center">

### 🌍
**Public Site**
Branded WIAL landing page with cleaner messaging and full marketing page suite

</td>
<td width="25%" align="center">

### 🏛️
**Chapter Microsites**
Dynamic chapter routes powered by a shared template — launch a new region in minutes

</td>
<td width="25%" align="center">

### 🔍
**Coach Directory**
Searchable, filterable coach discovery with profiles, certifications, and chapter affiliation

</td>
<td width="25%" align="center">

### 🛠️
**Admin Workspace**
Auth-protected provisioning dashboard with role-aware access for global admins and chapter leads

</td>
</tr>
</table>

---

## 🏗️ Architecture at a Glance

```
┌─────────────────────────────────────────────────────┐
│                  PUBLIC ROUTES                      │
│  /  ·  /about  ·  /coaches  ·  /certification  ...  │
├─────────────────────────────────────────────────────┤
│              DYNAMIC CHAPTER ROUTES                 │
│       /:chapter  ·  /:chapter/about  ·  ...         │
├─────────────────────────────────────────────────────┤
│                 ADMIN WORKSPACE                     │
│    /admin  ·  /admin/access  ·  /admin/login        │
├──────────────┬──────────────┬────────────────────────┤
│   Supabase   │    Stripe    │   Sanity CMS / Jina    │
│  Auth + DB   │   Payments   │  Content + Embeddings  │
└──────────────┴──────────────┴────────────────────────┘
```

---

## 🗺️ Route Map

### Public Routes
| Route | Purpose |
|-------|---------|
| `/` | Main WIAL landing page |
| `/about` | High-level WIAL overview |
| `/action-learning` | Action Learning overview |
| `/action-learning/benefits` | Benefits explainer |
| `/certification` | Certification pathway |
| `/our-services` | WIAL services |
| `/contact` | Main contact page |
| `/newsletter` | Newsletter signup |
| `/coaches` | Searchable coach directory |
| `/coaches/[id]` | Individual coach profile |
| `/directory` | Seed-based coach experience |
| `/payment/success` | Stripe payment confirmation |

### Dynamic Chapter Routes
| Route | Purpose |
|-------|---------|
| `/:chapter` | Chapter landing page |
| `/:chapter/about` | Chapter-specific about |
| `/:chapter/contact` | Chapter-specific contact |

### Admin Routes
| Route | Purpose |
|-------|---------|
| `/admin/login` | Admin authentication |
| `/admin` | Provisioning & content dashboard |
| `/admin/access` | Access management workspace |
| `/admin/unauthorized` | Not allowlisted fallback |

### API Routes
| Route | Purpose |
|-------|---------|
| `/api/search` | Coach search/filter |
| `/api/stripe/checkout` | Creates Stripe sessions |
| `/api/stripe/webhook` | Handles payment updates |
| `/api/admin/chapters` | Creates chapter records |
| `/api/admin/chapters/[slug]` | Updates chapter content |
| `/api/admin/chapters/one-click` | Chapter-lead provisioning |
| `/api/admin/chapter-admins` | Create admin/access records |
| `/api/embed` | Jina embedding endpoint |

---

## 🗄️ Data Model

```
chapters ─────────────────────── chapter_admins
  │  slug, name, content, meta     │  email, role, pre-approved
  │                                │
  └──── coaches ─────────────── payments
          name, cert, location,    stripe_id, status, amount
          chapter_id, embedding
```

Four core Supabase tables wire together the whole platform: public chapters → chapter admins → coach profiles → Stripe-backed payments.

---

## 🚀 Getting Started

### 1 · Clone & install

```bash
git clone https://github.com/2026-ASU-WiCS-Opportunity-Hack/21-not-so-cool.git
cd 21-not-so-cool
npm install
```

### 2 · Configure environment

Create `.env.local` in the project root:

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional integrations
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
OPENAI_API_KEY=
JINA_EMBEDDING_TOKEN=
```

### 3 · Set up Supabase

Run these files in order from the Supabase SQL editor:

```
supabase/schema.sql   →  core tables
supabase/seed.sql     →  example chapters, admins, coaches
supabase/rls.sql      →  row-level security policies
```

### 4 · Run it

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and explore:

| Flow | Start here |
|------|-----------|
| Public site | `/` |
| Coach search | `/coaches` |
| Chapter microsite | `/usa` or another seeded slug |
| Admin dashboard | `/admin/login` |
| Sanity Studio | `/studio` *(requires env vars)* |

### 5 · Test admin access

The seed data includes three ready-to-use allowlisted admins:

```
admin@wial.org          →  global admin
canada.lead@wial.org    →  chapter lead
kenya.lead@wial.org     →  pre-approved one-click provisioning lead
```

Use **Create Account** on `/admin/login` to bootstrap a Supabase auth user, then sign in.

---

## 🔬 Tech Stack

<table>
<tr>
<td><b>Frontend</b></td>
<td>Next.js 16 App Router · React 19 · Tailwind CSS 4</td>
</tr>
<tr>
<td><b>Auth & Data</b></td>
<td>Supabase (Postgres + RLS + Auth)</td>
</tr>
<tr>
<td><b>Payments</b></td>
<td>Stripe Checkout + Webhooks</td>
</tr>
<tr>
<td><b>CMS</b></td>
<td>Sanity Studio (embedded at <code>/studio</code>)</td>
</tr>
<tr>
<td><b>AI / Search</b></td>
<td>Jina embeddings · OpenAI client (future semantic search)</td>
</tr>
</table>

---

## ✅ What's Working vs. 🔧 What's Scaffolded

### ✅ Working now
- Public marketing pages & responsive layout
- Dynamic chapter routing with fallback seed data
- Searchable coach directory (seed-driven)
- Auth-gated admin flow with provisioning UI
- Supabase schema, seed, and RLS setup

### 🔧 Needs environment config
- Live Supabase-backed chapter/content/admin workflows
- Stripe payments
- Sanity Studio content management
- Supabase-backed coach detail pages
- Jina embedding generation

### 🌱 Early-stage / extendable
- Semantic search via stored vector embeddings
- Newsletter submission integration
- Richer form handling
- Broader CMS-driven content on public pages

---

## 🔭 Future Scope

- [ ] Replace seed-driven coach search with live Supabase + semantic vector search
- [ ] Connect newsletter signup to Constant Contact or similar
- [ ] Make Sanity the primary content source for marketing pages
- [ ] Add richer chapter branding: media uploads, localized content blocks
- [ ] Expand payments into a full certification/eLearning workflow
- [ ] Add analytics, audit logs, and stronger admin activity tracking
- [ ] Support subdomain-based chapter launches alongside subdirectory routing
- [ ] Add production-ready test coverage and deployment docs

---

## 🤝 Team

**Not So Cool** — built for the Women in Computer Science × Opportunity Hack: Spring 2026 Hackathon at **Arizona State University, Tempe**

| | |
|---|---|
| Sai Amulya Pingili | |
| Niharika Ravilla | |
| Dyuti Mengji | |

**Team Slack:** [`#team-21-not-so-cool`](https://opportunity-hack.slack.com/app_redirect?channel=team-21-not-so-cool)

---

## 💡 Why This Matters

This MVP is not just a redesign. It proposes a **scalable operating model** for a nonprofit global-network website:

> **One codebase. One brand system. Many chapters. Fewer manual updates. A better path for coaches, chapter leads, and future growth.**

That makes it a strong fit for a hackathon focused on practical, mission-driven technology for organizations doing meaningful work.

---

<div align="center">

Built with ❤️ at ASU · WiCS × Opportunity Hack Spring 2026

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-21--not--so--cool.vercel.app-6366f1?style=for-the-badge)](https://21-not-so-cool.vercel.app/)

</div>
