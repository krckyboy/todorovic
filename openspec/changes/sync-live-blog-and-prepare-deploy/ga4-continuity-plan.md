# GA4 Continuity and Launch Annotation Plan

Date: February 16, 2026  
Scope: Tasks `4.5` and `4.6` for `sync-live-blog-and-prepare-deploy`

## Measurement Strategy

- Reuse the same GA4 property used by the current live site to preserve historical continuity.
- Default measurement ID: `G-5BEM5384PJ`.
- Implementation in this repo:
  - `src/layouts/BaseLayout.astro` loads GA4 in production.
  - Override via `PUBLIC_GA_MEASUREMENT_ID` when needed.

## Environment Convention

- Production:
  - `PUBLIC_GA_MEASUREMENT_ID=G-5BEM5384PJ` (unless intentionally changed)
- Local development:
  - No GA script execution (production-only guard in layout)

## Launch Annotation Plan

At final domain cutover, record the release in three places:

1. Deployment log (timestamp, commit SHA, target domain)
2. GA4 annotation / release note entry for the same timestamp
3. OpenSpec deployment checklist artifact for traceability

Recommended annotation text:

`Launched Astro rebuild of todorovic.dev (OpenSpec-driven), blog content sync + metadata realignment.`

## Post-Launch Validation Checklist

- Confirm realtime GA4 events are arriving on production domain.
- Confirm page views for:
  - `/`
  - `/about`
  - `/skills`
  - `/blog`
  - one blog post route
- Confirm traffic trend continuity vs pre-cutover baseline window.
- Confirm no unexpected duplicate tracking tags in page source.
