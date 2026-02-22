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
- `openspec instructions <artifact> --change <id>`
- `openspec status --change <id>`

## Required Behavior

1. For non-trivial blog work, create a change with:

- `openspec new change <change-id> --schema blog-authoring`

2. Execute only the artifacts OpenSpec marks as next-ready.
3. Write/edit canonical post content in:

- `src/content/blog/<slug>.md`

4. Run required validations and report status.
