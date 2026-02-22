> Progress snapshot: February 21, 2026.

## 1. OpenSpec Schema

- [x] 1.1 Add `openspec/schemas/blog-authoring/schema.yaml`.
- [x] 1.2 Add schema templates for `intent`, `inspiration`, `research`, and `revision`.

## 2. Codex Skill

- [x] 2.1 Create repo skill folder `.codex/skills/openspec-blog-authoring/` with `SKILL.md`.
- [x] 2.2 Add `.codex/skills/openspec-blog-authoring/agents/openai.yaml`.

## 3. OpenSpec Tracking

- [x] 3.1 Add change capability spec under `openspec/changes/add-blog-authoring-skill-schema/specs/`.
- [x] 3.2 Sync `openspec/specs/open-proposals/spec.md` with this change status/progress.
- [x] 3.3 Update `openspec/config.yaml` custom schema list to canonical `blog-authoring`.

## 4. Cleanup

- [x] 4.1 Remove unused schemas: `openspec/schemas/astro-page/`, `openspec/schemas/astro-project/`, `openspec/schemas/blog-content/`.

## 5. Verification

- [x] 5.1 Confirm schema is discoverable via `openspec schemas --json`.
- [x] 5.2 Run `npm run lint`.
- [x] 5.3 Run `npm run build`.
