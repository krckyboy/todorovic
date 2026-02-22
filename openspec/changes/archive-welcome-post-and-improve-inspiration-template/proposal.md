> **STATUS: COMPLETED (Pending Archive)** as of February 22, 2026.

## Why

The `welcome` post should remain in the repository for reference but be treated as archived content, not as an active draft surfaced in blog listing/filter flows. Separately, the current inspiration artifact is too generic and should provide a stronger writing scaffold (working title + practical section prompts) for human-first drafting.

## What Changes

- Add an `archived` frontmatter flag to blog content schema.
- Exclude archived posts from routable and list-visible blog selectors.
- Mark `src/content/blog/welcome.md` as archived so it does not appear in draft blog surfaces.
- Update blog-authoring inspiration artifact template with title-first, sectioned writing prompts.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `blog-module`: archived content behavior in routing/listing.
- `blog-authoring-workflow`: inspiration artifact structure for writing prompts.

## Impact

- **Affected files**: `src/content/config.ts`, `src/modules/blog/services/blogPosts.ts`, `src/content/blog/welcome.md`, and `openspec/schemas/blog-authoring/templates/inspiration.md`.
- **Dependencies**: no new dependencies.
- **Behavioral impact**: archived posts are hidden from blog routes and listing/filter surfaces.
