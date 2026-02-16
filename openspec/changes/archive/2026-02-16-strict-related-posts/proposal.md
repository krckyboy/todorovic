> **STATUS: COMPLETED** as of February 16, 2026.

## Why

“Related Posts” currently falls back to recency when tag overlap is weak. That means posts can appear under a “Related” label even with no shared tags, which is semantically misleading.

Example concern: a post shown as related despite zero tag overlap.

## What Changes

- Redefine “Related Posts” to require actual relevance (tag overlap)
- Remove or relabel recency fallback when no overlap exists
- Keep exclusions for current post and Continue Reading neighbors (prev/next)

## Capabilities

### Modified Capabilities

- `blog-post-engagement`: Related posts behavior becomes relevance-first and label-accurate
- `blog-module`: Post detail discovery logic becomes less noisy

## Impact

- **Primary files**:
  - `src/modules/blog/components/RelatedPosts.astro`
  - `src/pages/blog/[slug].astro`
- **Optional copy/UI updates**:
  - section heading/copy if fallback mode is retained as “More Posts”

No routing or content schema changes required.
