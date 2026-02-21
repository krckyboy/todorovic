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

## AI Guidance (Codex-First)

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

## Tooling Strategy (Updated February 21, 2026)

### Recommended default stack

1. OpenSpec for workflow control and change tracking.
2. Local editor (WebStorm/VS Code) for drafting and rewrites.
3. Codex for technical validation, implementation-adjacent checks, and review passes.

### Why this stack

- OpenSpec keeps intent, requirements, and tasks explicit across non-trivial changes.
- Local editor writing keeps the workflow cost-free for hobby publishing.
- Agent workflows are better for larger refactors, validation loops, and cross-file tasks.

### Optional tooling worth evaluating

- `markdownlint` for Markdown structure and consistency checks.
- `Vale` for prose style consistency across posts and contributors.
- Darkmatter for non-developer content editing workflows on Astro collections (macOS-focused tool).

## Agent Role Model for Non-Trivial Posts

Use role separation to avoid mixing concerns in a single pass.

### 1) Research Agent

Owns source gathering and claim boundaries.

- Input: topic, audience, claims to verify
- Output:
  - source list (primary sources preferred)
  - claim-to-source mapping
  - "known unknowns" list

### 2) Technical Reviewer Agent

Owns factual and implementation correctness.

- Input: outline/draft + claim-to-source mapping
- Output:
  - corrections to technical statements
  - runnable snippet validation notes (if snippets exist)
  - risk flags (version drift, unsupported assumptions)

### 3) Editorial Agent

Owns narrative quality and readability.

- Input: technically reviewed draft
- Output:
  - structure and flow improvements
  - clarity and brevity edits
  - metadata polish (title, description, tags)

Final sign-off remains human-owned.

## OpenSpec Schema Selection

Use schema choice by scope:

- Single post creation/update with meaningful content work:
  - `/opsx:new <change-name> --schema blog-content`
  - Complete `outline -> draft -> review`
- Multi-post strategy changes, workflow/process changes, or behavior changes:
  - `/opsx:new <change-name>` (default `spec-driven`)
  - Complete `proposal -> specs -> design -> tasks`
- Minor typo/copy fix in one post:
  - direct edit allowed (still run validation before publish)

## Recommended Operating Flow (Non-Trivial Post)

1. Start OpenSpec change with `blog-content` schema.
2. Run Research Agent and produce claim/source map.
3. Draft in your local editor for direct iteration.
4. Run Technical Reviewer Agent on all technical claims and snippets.
5. Run Editorial Agent for final polish and metadata quality.
6. Validate with:
   - `npm run lint`
   - `npm run build`
7. Manual publish checks:
   - render in `/blog` and `/blog/<slug>`
   - confirm tags follow canonical catalog
   - confirm draft/public state is correct

## Reference Inputs (Reviewed February 21, 2026)

- OpenSpec:
  - https://github.com/fission-codes/openspec
- Astro content collections:
  - https://docs.astro.build/en/guides/content-collections/
- Optional quality tools:
  - https://github.com/DavidAnson/markdownlint
  - https://vale.sh/docs/
- Optional Astro CMS workflow:
  - https://darkmatter.sh/
