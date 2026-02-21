> Progress snapshot: February 21, 2026.

## 1. Blog Post Selection Policy Split

- [x] 1.1 Refactor `src/modules/blog/services/blogPosts.ts` into separate routable and list-visible retrieval functions.
- [x] 1.2 Ensure draft visibility helpers represent draft state semantics correctly for UI badges.

## 2. Route and Surface Wiring

- [x] 2.1 Update `src/pages/blog/[slug].astro` to generate paths from routable posts and remove production-only draft redirect.
- [x] 2.2 Keep `src/pages/blog/index.astro` and homepage featured section on list-visible posts.
- [x] 2.3 Add `noindex` robots meta for draft post pages and exclude drafts from Pagefind search indexing.

## 3. Verification

- [x] 3.1 Run `npm run lint`.
- [x] 3.2 Run `npm run build`.
- [ ] 3.3 Manually verify: draft slug opens in production build, draft absent from `/blog`, draft badge/meta are present, and draft pages are absent from search indexing.
