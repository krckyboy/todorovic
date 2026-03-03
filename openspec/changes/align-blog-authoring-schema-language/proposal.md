## Why

The current `blog-authoring` schema and templates are structurally good, but two gaps remain:

1. Prompt language can still drift toward formal/robotic phrasing.
2. Finalization lacks explicit role-based review gates for technical correctness and editorial clarity.

We need plain, down-to-earth instructions plus a lightweight 3-role sequence so output quality is more consistent across writers, reviewers, and AI assistants.

## What Changes

- Update `openspec/schemas/blog-authoring/schema.yaml` instructions to explicitly require simple, direct language and practical examples.
- Update `intent.md`, `inspiration.md`, and `revision.md` template prompts to steer toward conversational, concrete phrasing.
- Add two post-writing artifacts:
  - `05-technical-review.md` (architect-verifier role)
  - `06-editorial-review.md` (dev-post-reviewer role)
- Add templates for both review artifacts and gate final apply on editorial review completion.
- Add dedicated role skills/agents for writer, technical review, and editorial review.
- Update the existing blog-authoring router skill to orchestrate role skills in sequence.
- Add a top-level `new-blog` orchestrator skill/agent for one-command blog kickoff and role sequencing.
- Keep existing metadata and quality gate expectations intact.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `blog-authoring-workflow`: Refine authoring schema/template language requirements to prioritize clear, natural wording and reduce robotic phrasing.
- `blog-authoring-workflow`: Enforce a three-role finalization sequence (writer -> technical review -> editorial review).

## Impact

- **Affected files**: `openspec/schemas/blog-authoring/schema.yaml`, `openspec/schemas/blog-authoring/templates/*.md`.
- **Affected files**: `openspec/schemas/blog-authoring/schema.yaml`, `openspec/schemas/blog-authoring/templates/*.md`, `.codex/skills/openspec-blog-authoring/*`.
- **Affected files**: `openspec/schemas/blog-authoring/schema.yaml`, `openspec/schemas/blog-authoring/templates/*.md`, `.codex/skills/openspec-blog-authoring/*`, `.codex/skills/openspec-blog-*/**`, `.codex/skills/new-blog/**`.
- **APIs/runtime**: none.
- **Dependencies**: none.
- **Process impact**: AI-assisted blog drafts should require less tone correction and fewer late-stage technical/editorial rewrites.
