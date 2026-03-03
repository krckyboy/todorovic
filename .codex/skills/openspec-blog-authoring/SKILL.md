---
name: openspec-blog-authoring
description: Route blog creation/editing requests into the OpenSpec blog-authoring schema and execute artifacts from OpenSpec as source of truth.
metadata:
  short-description: OpenSpec router for blog authoring
---

# OpenSpec Blog Authoring

Use this skill when the user asks to create, edit, brainstorm, or review a blog post in an OpenSpec-managed repo.

## Source of Truth

Do not duplicate workflow details in this skill. Always use OpenSpec as the single source of truth:

- `openspec/schemas/blog-authoring/schema.yaml`
- `openspec/specs/blog-authoring-workflow/spec.md`
- `openspec status --change <id>`

## Required Behavior

1. For non-trivial blog work, create a change with:

- `/opsx:propose <change-id>` (or `/opsx:new <change-id> --schema blog-authoring`)

2. Execute only the artifacts OpenSpec marks as next-ready.
3. Write/edit canonical post content in:

- `src/content/blog/<slug>.md`

4. Run the 3-role model in order:

- Role 1 (`writer`, use `$openspec-blog-writer`): `01-intent` -> `02-inspiration` -> `03-research` -> `04-revision`
- Role 2 (`architect-verifier`, use `$openspec-blog-technical-review`): `05-technical-review`
- Role 3 (`dev-post-reviewer`, use `$openspec-blog-editorial-review`): `06-editorial-review`

5. Role 2 and Role 3 are mandatory after writing and before final approval.
6. Run required validations and report status.
