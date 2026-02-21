## Context

The site currently serves key images from `/public/images` via plain `<img>`. This misses responsive variants and modern format optimization that Astro provides for imported local assets.

## Goals / Non-Goals

**Goals:**

- Move key portrait/about images to Astro `Image` with import-based assets.
- Preserve visual output and accessibility.
- Keep implementation low-risk and limited in scope.

**Non-Goals:**

- Reworking page layouts or typography.
- Introducing a CMS/image CDN.
- Bulk-migrating every image reference in the repository.

## Decisions

1. Migrate only high-impact local images first (Hero, About page, AuthorCard).

- Rationale: maximizes gain with low regression risk.

2. Add image files under `src/assets/images` and import them in rendering files.

- Rationale: enables Astro's compile-time processing pipeline.

3. Keep width/height and loading intent aligned with current behavior.

- Rationale: avoids CLS and UX regressions.

## Risks / Trade-offs

- [Risk] Duplicate files across `public/images` and `src/assets/images`. -> Mitigation: keep legacy public files for compatibility now; cleanup can be a follow-up.
- [Risk] Minor generated output differences across formats/quality. -> Mitigation: verify visual parity in local preview.

## Migration Plan

1. Add required source images in `src/assets/images`.
2. Patch Hero/About/AuthorCard components/pages to use `Image` imports.
3. Validate lint/build and spot-check rendered pages.

## Open Questions

- Whether to migrate remaining legacy image components (for example `ImageAndText.astro`) in a follow-up pass.
