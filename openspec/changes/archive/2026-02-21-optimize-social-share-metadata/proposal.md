> **STATUS: COMPLETED** as of February 21, 2026.

## Why

Current social-share preview quality is below platform recommendations: the default OG image is oversized for WhatsApp and rendered at non-recommended dimensions. Homepage metadata copy is also shorter than optimal preview ranges, and OG card composition needed clearer action hierarchy between default pages and blog posts.

## What Changes

- Replace the default OG fallback image with an optimized 1200x630 JPEG under 600 KB for better compatibility on share platforms.
- Update the default OG generation script to enforce exact output dimensions and use a neutral default card without a CTA button.
- Align per-post blog OG image styling with the default fallback card by removing overlapping decorative motifs and placing a blog-only CTA at the bottom-right.
- Improve homepage title/description copy lengths to align with common social preview guidance.
- Extend global layout social metadata to include image dimensions and alt text for Open Graph and Twitter cards.

## Capabilities

### New Capabilities

- `social-share-metadata`: Defines requirements for default social card asset quality, metadata completeness, and blog-focused engagement cues.

### Modified Capabilities

- None.

## Impact

- **Files modified**: `scripts/generate-og-default.swift`, `scripts/generate-og-blog.mjs`, `src/modules/site/services/baseLayoutMeta.ts`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `package.json`.
- **Files created**: `openspec/changes/optimize-social-share-metadata/specs/social-share-metadata/spec.md`.
- **Generated assets**: `public/og-default.jpg` (new optimized fallback image).
- **Dependencies**: Adds `@fission-ai/openspec` as a dev dependency to run OpenSpec CLI locally.
