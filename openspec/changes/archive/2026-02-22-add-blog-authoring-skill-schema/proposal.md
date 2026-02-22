> **STATUS: COMPLETED (Pending Archive)** as of February 21, 2026.

## Why

Blog authoring currently relies on general guidance (`documentation/blog-authoring-workflow.md`) and fragmented/legacy schema options. It does not provide one canonical workflow for idea generation, claim-oriented research, and revision across both new posts and edits.

## What Changes

- Add one canonical OpenSpec schema (`blog-authoring`) focused on blog inspiration, research, and revision.
- Add reusable schema templates so each stage has consistent output expectations.
- Create a local Codex skill that orchestrates this schema for create/edit workflows.
- Remove unused project-local schemas (`astro-page`, `astro-project`, `blog-content`) to reduce maintenance noise.
- Keep current publishing behavior unchanged; this change is process/tooling only.

## Capabilities

### New Capabilities

- `blog-authoring-workflow`: Structured OpenSpec workflow for intent capture, inspiration, evidence mapping, and revision checks.

### Modified Capabilities

- None.

## Impact

- **Affected files**: `openspec/schemas/blog-authoring/*`, `.codex/skills/openspec-blog-authoring/*`, `openspec/config.yaml`, `AGENTS.md`, and OpenSpec change tracking files.
- **Dependencies**: no runtime dependencies.
- **Behavioral impact**: no changes to site rendering/routes; only authoring workflow changes.
