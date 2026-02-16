# Blog Authoring Workflow

## Purpose

Standardize how blog posts are planned, written, validated, and published with AI assistance.

## Scope Rule

- Minor copy edits: direct edit is acceptable.
- Non-trivial content changes or multi-post updates: use OpenSpec-first workflow.

## Authoring Flow

1. Define intent:
   - audience
   - outcome
   - key technical claims
2. Create markdown file in `src/content/blog/<slug>.md`.
3. Add complete frontmatter:
   - `title`
   - `description`
   - `pubDate`
   - `author`
   - `tags`
   - `draft`
4. Draft body with clear heading hierarchy (`##`, `###`) and concrete examples.
   - Use headings for transitions and conclusions.
   - Avoid decorative `hr` separators in article body content.
5. Run validation:
   - `npm run lint`
   - `npm run build` (also generates per-post OG assets)
6. Manually review:
   - spelling and factual accuracy
   - link validity
   - metadata quality
   - rendering in `/blog` and `/blog/<slug>`

## Publish Checklist

- Frontmatter present and valid
- Slug is stable and readable
- Description is useful for SEO/snippets
- Tags align with project taxonomy
- `draft: false` only when ready to publish
- OG asset exists at `public/og/blog/<slug>.svg`
- Social metadata resolves correctly in built output

## AI Guidance (Codex and Cursor)

Use AI as an accelerator, not as source of truth.

Minimum prompt inputs:

- target reader and intent
- required claims/facts
- desired tone and structure
- constraints (length, examples, links)

Expected AI outputs:

- outline first
- draft second
- revision pass focused on clarity and factual consistency

Required human checks:

- technical correctness
- claims that need citation
- wording quality and originality
- final metadata and publish readiness
