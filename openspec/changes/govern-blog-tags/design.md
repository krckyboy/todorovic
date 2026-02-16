## Context

Current behavior aggregates tags directly from post frontmatter and renders all of them as filter chips on `/blog`. There is no canonical allowlist, no tag metadata (description/group), and no authoring policy for new tags.

## Goals / Non-Goals

**Goals:**

- Keep tags useful for discovery as blog content grows
- Prevent ad-hoc one-off tags from polluting filters
- Preserve simple URL-based filtering (`?tags=`)
- Keep authoring workflow straightforward for future posts

**Non-Goals:**

- ML/NLP auto-tagging
- Deep knowledge graph/tag hierarchy engine
- Breaking changes to existing post URLs

## Decisions

### 1. Canonical taxonomy source

Define a single source of truth for allowed tags with metadata:

- slug (`kebab-case`)
- display label
- group (e.g. `engineering`, `career`, `workflow`)
- optional description

Recommended location: module service under `src/modules/blog/services/` plus mirrored guidance in docs.

### 2. Authoring constraints

- Recommended 2-4 tags per published post
- Require lowercase `kebab-case`
- Prefer evergreen topic tags; use event tags (like `launch`) only when they represent a recurring series or meaningful content cluster

### 3. New-tag policy

A new tag should be added only when:

- it will apply to at least 2 current/planned posts, or
- it introduces a clearly distinct discovery axis not covered by existing tags

### 4. Scaling behavior in BlogFilter

When tags exceed a practical threshold, use:

- sorted-by-frequency chips for primary discovery
- an in-filter search input for full tag set
- optional “show more” expansion pattern

This keeps scanability and avoids overwhelming the UI.

## Risks / Trade-offs

- Strict taxonomy can feel slower while drafting content
  - Mitigation: allow draft tags with normalization before publish
- Migrating historical tags may require manual edits
  - Mitigation: define mapping table and do incremental cleanup

## Open Questions

- Should unknown tags fail CI or warn-only initially?
- What exact threshold should trigger searchable/collapsible tag UI (e.g. >12)?
