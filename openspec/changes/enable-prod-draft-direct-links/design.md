## Context

Current blog services use a single environment flag to decide whether drafts exist at all. This blocks production draft route generation and also suppresses draft badges when a draft page is rendered.

## Goals / Non-Goals

**Goals:**

- Allow production access to draft posts by exact slug URL.
- Keep drafts hidden from `/blog` and featured blog lists.
- Preserve draft labeling and reduce search indexing risk.

**Non-Goals:**

- Implementing auth-protected previews.
- Changing content model/frontmatter schema.
- Reworking blog filter UX.

## Decisions

1. Introduce policy-specific post selectors in blog services.

- Rationale: one selector for routable pages and another for list-visible surfaces avoids accidental leakage.
- Alternative considered: keep one selector with boolean arguments everywhere. Rejected due to high call-site error risk.

2. Use routable selector in `getStaticPaths()` for `/blog/[slug]`.

- Rationale: ensures draft pages are built in production.

3. Use list-visible selector for `/blog` index and homepage featured lists.

- Rationale: keeps public browse surfaces draft-free.

4. Keep draft badge tied to draft state (not environment), and mark draft pages with `noindex`.

- Rationale: direct draft links should clearly indicate status and reduce indexing visibility.

5. Mark published pages as searchable bodies and opt draft pages out of Pagefind indexing.

- Rationale: "direct link only" should not be bypassed by site search results.

## Risks / Trade-offs

- [Risk] Draft pages are still technically discoverable if URLs leak. -> Mitigation: keep them out of listing surfaces and add `noindex`.
- [Risk] Multiple selectors increase service API surface. -> Mitigation: clear naming and reuse shared sort helper.

## Migration Plan

1. Refactor blog service selectors.
2. Update pages/components to use correct selector per surface.
3. Remove production draft redirect in post route.
4. Add draft `noindex` meta.
5. Validate with lint/build and manual route checks.

## Open Questions

- None.
