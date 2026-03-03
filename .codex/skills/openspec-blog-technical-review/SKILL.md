---
name: openspec-blog-technical-review
description: Role 2 technical verifier for OpenSpec blog-authoring workflow.
metadata:
  short-description: OpenSpec blog technical review role
---

# OpenSpec Blog Technical Review

Use this skill for role-2 technical review after writer stage.

## Source of Truth

- `openspec/schemas/blog-authoring/schema.yaml`
- `openspec/specs/blog-authoring-workflow/spec.md`
- Repository docs/specs referenced by the post

## Required Behavior

1. Produce/update:

- `openspec/changes/<change-id>/05-technical-review.md`

2. Verify:

- command correctness (`/opsx` flow usage)
- technical claims against repo/docs
- architecture/implementation statements for consistency

3. Run required checks:

- `npm run lint`
- `npm run build`

4. Classify findings as blocking vs non-blocking and set verdict.
