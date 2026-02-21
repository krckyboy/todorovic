> **STATUS: IN PROGRESS** as of February 21, 2026.

## Why

Draft blog posts need to be shareable in production for review via direct URL, while remaining hidden from public browsing surfaces. The current implementation couples routing and listing behavior, so production excludes drafts everywhere.

## What Changes

- Split blog post retrieval into separate flows for routable posts and list-visible posts.
- Generate `/blog/[slug]` static paths from routable posts so draft URLs exist in production.
- Keep `/blog` listing and homepage featured posts limited to list-visible posts.
- Preserve draft labeling semantics on direct draft pages.
- Add draft-page indexing guardrails to reduce accidental discovery from search engines.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `blog-module`: Draft visibility behavior changes from globally environment-based to route/list policy-based.

## Impact

- **Affected files**: `src/modules/blog/services/blogPosts.ts`, `src/pages/blog/[slug].astro`, `src/pages/blog/index.astro`, `src/pages/index.astro`, and draft badge usage in blog components.
- **Dependencies**: no new dependencies.
- **Behavioral impact**: draft posts are reachable by exact URL in production but remain excluded from `/blog` and homepage featured lists.
