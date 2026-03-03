---
name: openspec-blog-writer
description: Role 1 writer for OpenSpec blog-authoring workflow (intent through revision).
metadata:
  short-description: OpenSpec blog writer role
---

# OpenSpec Blog Writer

Use this skill when running writer-only work in the `blog-authoring` schema.

## Source of Truth

- `openspec/schemas/blog-authoring/schema.yaml`
- `openspec/specs/blog-authoring-workflow/spec.md`
- `openspec status --change <id>`

## Required Behavior

1. Execute writer artifacts only:

- `01-intent.md`
- `02-inspiration.md`
- `03-research.md`
- `04-revision.md`

2. Write/edit canonical post content only in:

- `src/content/blog/<slug>.md`

3. Keep scope explicit and practical. Avoid abstract wording.
4. Stop after revision; do not self-approve final publish readiness.
