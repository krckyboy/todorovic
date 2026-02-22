> Progress snapshot: February 22, 2026.

## 1. Blog Archive Flag

- [x] 1.1 Add `archived` to `src/content/config.ts` blog frontmatter schema.
- [x] 1.2 Update `src/modules/blog/services/blogPosts.ts` to exclude archived posts from routable/list-visible selectors.
- [x] 1.3 Mark `src/content/blog/welcome.md` with `archived: true`.
- [x] 1.4 Ensure client-side post card draft badge logic respects archived state.

## 2. Inspiration Artifact Template

- [x] 2.1 Update `openspec/schemas/blog-authoring/templates/inspiration.md` to use title-first section prompts.

## 3. OpenSpec Tracking

- [x] 3.1 Add capability deltas for blog archive behavior and inspiration artifact structure.
- [x] 3.2 Sync `openspec/specs/open-proposals/spec.md` with this change status/progress.

## 4. Verification

- [x] 4.1 Run `npm run lint`.
- [x] 4.2 Run `npm run build`.
- [x] 4.3 Manually verify `/blog` and `/blog/welcome` behavior in production build output.
