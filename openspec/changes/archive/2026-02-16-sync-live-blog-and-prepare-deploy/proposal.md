> **STATUS: COMPLETED (Pending Archive)** as of February 16, 2026.
> Scope owner decision: live `todorovic.dev` is source of truth for current blog content.

## Why

The new Astro site is close to launch-ready, but content and deployment readiness are not fully aligned with the current production site (`todorovic.dev`).

Current gaps:

- Blog content in this repo does not fully match live article bodies and publishing set.
- Deployment is not yet configured for Vercel/domain cutover.
- SEO and analytics decisions need explicit alignment.
- OG images should be generated for each new blog post automatically.
- We need a repeatable AI-assisted blog authoring flow.

## What Changes

- Sync blog content from live into this repository (as the source of truth baseline).
- Add two new launch posts:
  - Welcome to the new website (AI + OpenSpec journey)
  - Spec-driven development with OpenSpec
- Adopt a **hybrid SEO metadata strategy**:
  - Keep route-specific metadata on the new Astro site
  - Reintroduce high-value search intent from the current live site where it helps
  - Avoid old behavior where the same title/description is reused across all pages
- Define and implement per-post OG image generation workflow.
- Prepare Vercel deployment and domain readiness checklist (without forced immediate cutover).
- Define AI-assisted blog writing workflow for this repo.

## Capabilities

### New Capabilities

- `blog-sync`: Structured workflow to keep local blog content aligned with live baseline.
- `blog-og-generation`: Automated OG image generation for blog posts.
- `deploy-readiness`: Vercel/domain/analytics/SEO readiness workflow before production deployment.
- `blog-authoring-workflow`: AI-assisted authoring and review process for blog content.

### Modified Capabilities

- `blog-module`: Content set and article bodies aligned to live source of truth plus new launch posts.
- `seo-metadata`: Metadata/canonical/open graph strategy aligned for launch.

## Impact

- **Likely modified files**:
  - `src/content/blog/*.md`
  - `src/pages/blog/[slug].astro` (if needed for OG wiring)
  - `src/layouts/BaseLayout.astro` (if needed for metadata/analytics)
  - `astro.config.mjs` (if needed for deployment/OG integration)
  - `documentation/*` (authoring/deployment workflow docs)
- **Potential new files**:
  - OG generation script(s)
  - deployment and authoring workflow documentation
- **Dependencies**: minimal; add only if justified by OG generation implementation
- **Risk**: publishing mismatched or partially migrated content; mitigated by parity checklist and dry-run verification
