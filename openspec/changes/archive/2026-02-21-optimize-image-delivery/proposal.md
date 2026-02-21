> **STATUS: COMPLETED (Pending Archive)** as of February 21, 2026.

## Why

Key profile and about-page images currently use plain `<img>` with public-path URLs, which bypasses Astro's responsive image optimization pipeline. Migrating these images improves performance and delivery efficiency while preserving existing UI.

## What Changes

- Migrate high-visibility local images to `Image` from `astro:assets`.
- Import image files from `src/assets/images` for compile-time optimization.
- Keep existing visual dimensions, alt text quality, and loading intent.
- Preserve current route/component structure and avoid design changes.

## Capabilities

### New Capabilities

- `image-optimization`: Defines optimization requirements for local image delivery using Astro assets.

### Modified Capabilities

- None.

## Impact

- **Affected files**: `src/components/Hero.astro`, `src/pages/index.astro`, `src/pages/about.astro`, `src/modules/blog/components/AuthorCard.astro`, plus new `src/assets/images/*` files.
- **Dependencies**: no new dependencies.
- **Behavioral impact**: same visual layout, improved image delivery characteristics.
