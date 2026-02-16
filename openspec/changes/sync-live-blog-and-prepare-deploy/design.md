## Context

User decisions captured:

- Source of truth for existing blog content: **live `todorovic.dev`**
- Deployment target: **Vercel**
- Production domain strategy: **reuse the same domain (`todorovic.dev`)**
- Launch approach: **prepare thoroughly, then deploy (no rush)**
- Desire: **automatic per-blog OG generation**
- Desire: AI-assisted workflow for writing blogs

## Goals / Non-Goals

**Goals:**

- Reach content parity with current production blog for baseline posts.
- Add two launch posts for the new site narrative.
- Define deploy-readiness checklist (SEO, analytics, domain, validation).
- Set up per-post OG generation workflow.
- Define AI-assisted blog authoring flow for repeatability.

**Non-Goals:**

- Immediate production cutover in this change.
- Large visual redesign unrelated to launch readiness.

## Decisions and Open Questions

### 1. SEO/branding copy strategy (DECIDED)

Options:

- **A: Keep new Astro copy** (modern brand direction)
- **B: Restore old live copy** (strict parity)
- **C: Hybrid** (recommended): keep current personal branding direction while preserving high-value SEO intent and page-specific metadata

Decision: **C (Hybrid)**

Hybrid means:

- Keep unique metadata per route (`/`, `/about`, `/skills`, `/blog`, blog posts)
- Keep new site voice/positioning
- Pull strong intent terms from live site where relevant (seniority, frontend/javascript leadership signals)
- Do not reuse one global title/description across unrelated pages

Planned output artifact:

- Route-level metadata matrix with final title + description for:
  - home
  - about
  - skills
  - blog index
  - blog post template

### 2. Google Analytics property strategy

Options:

- **Reuse existing GA4 measurement/property** (recommended for continuity)
- Create a new property for the new site

Recommendation: **Reuse existing property initially** with explicit annotation date.

Trade-off:

- Reuse preserves continuity and is easier to integrate.
- New property gives cleaner segmentation but loses direct continuity.

### 3. OG generation approach

Requirement:

- Per-page/per-post OG image generation integrated into content workflow.

Preferred approach:

- Build-time generation with deterministic template and slug-based outputs.

### 4. Vercel and domain readiness

Based on Vercel docs, we should:

- Import GitHub repository to Vercel.
- Configure production branch deployment.
- Reuse existing production domain (`todorovic.dev`) currently serving the old site.
- Add explicit redirect strategy (`www` <-> apex).
- Plan a controlled cutover from the old deployment to this repo's deployment.
- Verify DNS records and canonical behavior before cutover.
- Keep rollback path documented (re-point domain to previous deployment if needed).

## External References (researched)

- Vercel domains and redirects: https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting
- Vercel GitHub deployments: https://vercel.com/docs/git/vercel-for-github
- Vercel import existing project: https://vercel.com/docs/getting-started-with-vercel/import
- GA4 migration Q&A (historical data constraints): https://support.google.com/analytics/answer/14196937
- GA4 data streams: https://support.google.com/analytics/answer/10268289
