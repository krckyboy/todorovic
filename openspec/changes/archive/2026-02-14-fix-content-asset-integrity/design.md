## Context

The site currently has a fragile asset setup for profile imagery:

- `AuthorCard.astro` expects a local avatar path.
- Missing local files are not validated during normal verification.
- Duplicate asset locations (for example, `/public/dusan.png` and `/public/images/dusan.png`) can create confusion.

This makes it easy to ship missing-image regressions and inconsistent profile branding.

## Goals / Non-Goals

**Goals:**

- Define a canonical location for author/profile image assets.
- Ensure user-facing components gracefully handle missing avatar assets.
- Keep profile defaults consistent across portfolio/blog surfaces.

**Non-Goals:**

- Remote URL image health checks.
- Full media optimization pipeline (formats, responsive variants, CDN transforms).
- Runtime image upload/management features.

## Decisions

**1. Canonical avatar path**
Use `/images/dusan.png` in `public/images/` as the default author avatar path.

Rationale: Keeps profile assets grouped under a predictable static directory and aligns with existing `AuthorCard` defaults.

**2. Explicit fallback behavior for author avatar**
Define fallback behavior so author card rendering is resilient even if the primary avatar file is missing.

Rationale: Missing profile imagery should degrade gracefully instead of showing broken UI.

## Risks / Trade-offs

- **[Risk]** Missing assets are caught later without a dedicated verifier
  - Mitigation: keep canonical asset paths simple and provide in-component fallback behavior.

- **[Risk]** Cross-change overlap (navigation/title consistency work)
  - Mitigation: keep this change focused on asset integrity and fallback behavior; avoid unrelated UI copy changes.
