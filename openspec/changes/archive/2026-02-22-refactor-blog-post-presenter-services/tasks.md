> Progress snapshot: February 22, 2026.

## 1. Shared Policy and Types

- [x] 1.1 Add a runtime-safe blog post policy helper module for draft/archive semantics.
- [x] 1.2 Define a shared blog post card view-model contract consumed by presenters and `PostCard`.

## 2. Presenter Services

- [x] 2.1 Add a server-side presenter service for `CollectionEntry<'blog'>` inputs.
- [x] 2.2 Add a client-side presenter service for serialized blog post inputs.
- [x] 2.3 Ensure server/client presenters both use shared policy helpers (no duplicated semantics).

## 3. Component Wiring

- [x] 3.1 Refactor `src/modules/blog/components/PostCard.tsx` to consume a single post view-model prop.
- [x] 3.2 Update `src/modules/blog/components/BlogPostItem.astro` to provide the post view model via presenter service.
- [x] 3.3 Update `src/modules/blog/components/BlogFilter.tsx` to provide the post view model via client presenter service.

## 4. Blog Detail Page Composition

- [x] 4.1 Add a service that computes blog detail page context (navigation and related exclusion inputs).
- [x] 4.2 Update `src/pages/blog/[slug].astro` to consume that service instead of inline derivation logic.

## 5. Verification

- [x] 5.1 Run `npm run lint`.
- [x] 5.2 Run `npm run build`.
- [ ] 5.3 Manual verify `/blog` filters, clear-filters behavior, and draft badge rendering on both list/detail surfaces.
