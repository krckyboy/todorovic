## Context

Current blog behavior distinguishes `draft` visibility between production and non-production listing surfaces, but there is no separate content state for "kept in repo, not part of active blog feed." This is needed for posts like `welcome` that should stay as internal reference but not appear as draft/public content.

The inspiration artifact also needs to be more actionable for writing by providing a concrete section scaffold, not just angle bullets.

## Goals / Non-Goals

**Goals:**

- Add `archived` as a content-state flag for blog posts.
- Ensure archived posts are excluded from both routable and list-visible selectors.
- Archive `welcome` via frontmatter.
- Upgrade inspiration artifact to a title-first section template suitable for human writing.

**Non-Goals:**

- Adding a public archive page.
- Changing existing published post behavior beyond archived filtering.
- Altering publish/deploy infrastructure.

## Decisions

1. Add `archived: boolean` to blog frontmatter schema with default `false`.

- Rationale: explicit state with backward compatibility for existing posts.

2. Filter archived posts in `getRoutableBlogPosts` (and therefore all downstream list selectors).

- Rationale: archived posts should not produce static routes or appear in listings.

3. Keep `draft` semantics unchanged for non-archived posts.

- Rationale: draft behavior already works for direct-link and listing policy.

4. Replace inspiration artifact with a writing scaffold using:

- Working Title
- Why I Needed This
- What OpenSpec Changed for Me
- How AI Fits In (Codex)
- Concrete Example
- Lessons Learned
- Closing

## Risks / Trade-offs

- Archived posts become non-routable; direct URLs stop resolving after build (intended).
- Users must use correct state (`draft` vs `archived`) to avoid confusion.

## Migration Plan

1. Add schema field and selector filtering.
2. Mark `welcome` as archived.
3. Update inspiration artifact template.
4. Validate with lint/build and manual route checks.

## Open Questions

- None.
