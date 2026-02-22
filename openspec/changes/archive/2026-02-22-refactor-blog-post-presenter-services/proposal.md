> **STATUS: ARCHIVED (By Request)** as of February 22, 2026.

## Why

Blog post presentation logic is currently split across pages and components, with repeated field mapping and state semantics (`draft`, `archived`) in multiple places. This increases drift risk and caused recent runtime-boundary issues (client code importing server-only modules transitively). A presenter-service approach matches the intended workflow: initialize with the actual post, derive UI-facing state once, and keep components render-focused.

## What Changes

- Introduce shared blog post policy helpers for draft/archive semantics that are safe to use in both server and client code.
- Add runtime-scoped presenter services:
  - server presenter for `CollectionEntry<'blog'>`
  - client presenter for serialized blog post data used by React islands
- Refactor `PostCard` to consume a single post view model instead of many scalar props.
- Update blog list/filter and blog post item composition to use presenter outputs.
- Extract blog post detail-page derived context (navigation + related exclusion inputs + metadata inputs) into a service.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `blog-module`: post presentation/data-shaping responsibilities move from page/component templates into dedicated services.

## Impact

- **Affected files**: `src/modules/blog/services/*`, `src/modules/blog/components/PostCard.tsx`, `src/modules/blog/components/BlogPostItem.astro`, `src/modules/blog/components/BlogFilter.tsx`, and `src/pages/blog/[slug].astro`.
- **Dependencies**: no new dependencies expected.
- **Behavioral impact**: no intended UX change; this is a structural refactor to reduce prop-drilling, centralize post-state semantics, and prevent server/client boundary regressions.
