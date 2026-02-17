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

## Tag Governance

Tags are a discovery system, not decorative metadata. Use the canonical
taxonomy below to keep filtering consistent as content volume grows.

### Canonical Tag Catalog

| Slug                      | Label                   | Group       | Use For                                                   |
| ------------------------- | ----------------------- | ----------- | --------------------------------------------------------- |
| `astro`                   | Astro                   | engineering | Astro architecture, implementation patterns, migrations   |
| `openspec`                | OpenSpec                | workflow    | OpenSpec-first planning, proposal/task/spec workflows     |
| `engineering-workflow`    | Engineering Workflow    | workflow    | Process, execution loops, quality gates, delivery systems |
| `ai-assisted-engineering` | AI-Assisted Engineering | workflow    | Practical AI tool usage in software delivery              |
| `delivery`                | Delivery                | workflow    | Shipping strategy, release quality, execution outcomes    |
| `career`                  | Career                  | career      | Career growth, role transitions, leadership journey       |
| `conferences`             | Conferences             | community   | Conference attendance, event lessons, session takeaways   |
| `networking`              | Networking              | community   | Relationship-building and professional network growth     |
| `mental-health`           | Mental Health           | wellbeing   | Burnout prevention, stress management, sustainable work   |
| `productivity`            | Productivity            | workflow    | Focus, output quality, and personal effectiveness         |
| `launch`                  | Launch                  | events      | Release milestones and launch-focused updates             |

The `Group` column is editorial guidance for authors; runtime blog filtering uses tag slugs.

### Authoring Constraints

- Published posts should use **2-4 tags**.
- Tags must be **lowercase kebab-case**.
- Prefer **evergreen topic tags** (for example `engineering-workflow`) over one-off tags.
- Include event-style tags (for example `launch`) only when they represent:
  - a recurring series, or
  - a meaningful release cluster users are likely to filter by.

### New Tag Policy

Add a new tag only if at least one condition is true:

- It applies to **at least 2 current or planned posts**, or
- It introduces a **clear discovery axis** not covered by existing tags.

If uncertain, prefer an existing canonical tag and revisit after more posts are drafted.

### Good vs Poor Tag Choices

Good:

- `['openspec', 'engineering-workflow', 'ai-assisted-engineering']` for workflow-heavy implementation posts
- `['career', 'conferences', 'networking']` for conference reflection posts
- `['launch', 'astro', 'delivery']` for a real release milestone post

Poor:

- `['thoughts', 'random', 'dev']` (too vague, low discovery value)
- `['launch-day-2026', 'personal-update']` (overly specific one-off tags)
- `['React', 'Career']` (wrong casing; not kebab-case)

### Unknown Tag Policy

Unknown tags are currently **warn-only** (not build-blocking). Resolve warnings by:

1. Mapping to an existing canonical tag, or
2. Adding a new canonical tag only when it meets the new-tag policy above.

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
