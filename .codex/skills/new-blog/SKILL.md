---
name: new-blog
description: One-command blog workflow launcher that follows OpenSpec blog-authoring and runs writer -> technical -> editorial roles.
metadata:
  short-description: New blog orchestrator
---

# New Blog

Use this skill when the user asks to start a new blog post with a single command-style prompt (for example: `/new-blog spec-driven-dev-with-openspec`).

## Input Contract

Accept input as:

- `/new-blog <change-id-or-slug>`

If missing, ask for a slug/change id.

## Workflow

1. Start OpenSpec blog change:

- Prefer `/opsx:propose <change-id>` for fast default flow.
- If user asks expanded control, use `/opsx:new <change-id> --schema blog-authoring` then `/opsx:continue` artifacts.

2. Execute role 1 (writer):

- Invoke `$openspec-blog-writer`
- Complete `01-intent.md`, `02-inspiration.md`, `03-research.md`, `04-revision.md`
- Write canonical content in `src/content/blog/<slug>.md`

3. Execute role 2 (technical):

- Invoke `$openspec-blog-technical-review`
- Produce `05-technical-review.md`
- Run `npm run lint` and `npm run build`

4. Execute role 3 (editorial):

- Invoke `$openspec-blog-editorial-review`
- Produce `06-editorial-review.md`
- Ensure readability and non-native clarity

5. Final reporting:

- Show artifact completion status
- Report validation status
- Leave changes local unless user explicitly asks to commit

## Source of Truth

- `openspec/schemas/blog-authoring/schema.yaml`
- `openspec/specs/blog-authoring-workflow/spec.md`
- `openspec/specs/open-proposals/spec.md`

## Guardrails

- Do not skip technical or editorial review roles.
- Do not archive or commit unless user asks.
- Keep language plain and practical.
