> **STATUS: PROPOSED (Awaiting Review)** as of February 16, 2026.

## Why

Blog tags are currently free-form and implicitly become UI filters. That creates three problems:

- No clear taxonomy source of truth (for example: when to use `launch` vs broader workflow tags)
- Inconsistent tagging across posts over time
- Potential filter UX overload as the number of tags grows

Without explicit governance, related-content quality and blog discoverability degrade as content volume increases.

## What Changes

- Define a canonical blog tag taxonomy and governance rules
- Add clear authoring guidance for when to introduce a new tag
- Define expected limits per post (recommended min/max tags)
- Clarify semantics for “event” tags (for example `launch`) vs evergreen topic tags
- Improve `/blog` filter UX behavior when tag count becomes large (search/collapse strategy)

## Capabilities

### New Capabilities

- `blog-tag-governance`: Canonical taxonomy, tag naming conventions, and change policy

### Modified Capabilities

- `blog-module`: Tag filter UX scales beyond a small static set
- `blog-authoring-workflow`: Tag usage guidance is explicit and reviewable

## Impact

- **Documentation**:
  - `documentation/blog-authoring-workflow.md`
- **Potential implementation files**:
  - `src/modules/blog/services/` (tag metadata source)
  - `src/modules/blog/components/BlogFilter.tsx`
  - `src/modules/blog/views/BlogListView.astro`
  - `src/pages/blog/index.astro`
- **Content alignment**:
  - `src/content/blog/*.md` (frontmatter tags may need normalization)

No breaking URL changes are required if tag slugs remain stable.
