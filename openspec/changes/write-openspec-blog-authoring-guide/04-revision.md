# Revision

## Technical Review

- Factual corrections:
  - Updated command coverage to current `/opsx:` flow shape: core (`propose/apply/archive`) plus expanded commands (`new/continue/ff/verify/sync/...`).
  - Added explicit guidance that `/opsx:continue` should include artifact review confirmation before proceeding.
  - Added explicit delta flow details (`ADDED`/`MODIFIED`/`REMOVED`) and merge mechanics (`/opsx:sync` vs `/opsx:archive`).
  - Clarified `verify` vs `validate` usage based on current docs: `/opsx:verify` in slash workflow, `openspec validate` in CLI.
  - Framed advanced schema patterns as concrete repo examples rather than universal defaults.
- Version/date clarifications:
  - Added validation context: OpenSpec CLI `1.1.1` checked on February 28, 2026.
  - Avoided version-agnostic wording for command behavior.
- Snippet validation notes:
  - Kept generation snippets tied to actual OpenSpec artifact paths in this repository.
  - Referenced `../react-kit/openspec/schemas/react-kit-component/schema.yaml` for custom schema + verification loop examples.

## Editorial Review

- Structure changes:
  - Expanded into a long-form guide: AI-era framing -> no-OpenSpec drift example -> OpenSpec artifact fundamentals -> component workflow -> deltas -> advanced schema/skills/verification.
  - Updated intro context to concrete Constructor Tech reality: large 100+ component library and multi-developer scalability needs as the reason OpenSpec became necessary.
  - Re-sequenced opening narrative to flow as: AI general power -> team-scale misalignment risks -> OpenSpec as practical response.
  - Added explicit framing that AI can produce large amounts of code quickly (great), and that spec-driven development is the control layer needed to scale safely.
- Clarity and brevity edits:
  - Clarified artifact purpose (`proposal.md`, `spec.md`, `design.md`, `tasks.md`) with concrete `.md` snippets.
  - Added plain-language explanations for command differences, especially `/opsx:new` vs `/opsx:ff` vs `/opsx:propose`.
  - Added a clear pre-implementation review checkpoint before `/opsx:apply`.
  - Added coding-style documentation section for components, HTML/page semantics, and CSS specs.
  - Reframed "without OpenSpec" downsides to focus on process drift, lost decision traceability, and rework cost (instead of only implementation-level misses).
  - Added team-compounding benefit framing: as more specs are committed and reused, AI has better context, discrepancies drop, and scope/rules become clearer over time.
  - Added explicit team-drift framing in the "without OpenSpec" section: without shared specs/guidelines/docs, implementation diverges across developers and AI agents.
  - Added an explicit one-time setup section (`init` + `update`) and reframed the rest of the workflow around `/opsx:*` skills in chat, removing CLI mapping details to reduce confusion.
  - Expanded setup guidance to include both global install and project dev-dependency install (`npx openspec ...`) with note on version consistency for teams.
  - Reframed the first OpenSpec big-picture explanation into explicit flow: command -> artifacts (plan/contract/checklist) -> review/iterate -> execute -> validate/archive, then transition into artifact definitions.
  - Reworked the core example into a higher-signal blog-discovery feature (search/filter/sort/query-sync) and kept default schema flow with a richer prompt template so scope/validation are explicit.
  - Removed error/fallback examples from reader-facing command walkthroughs and kept only clean default `spec-driven` output patterns (`new` -> `status` -> `continue` -> optional `ff`).
  - Added Jira/YouTrack ticket-context section via MCP, showing ticket-ID-driven artifact generation in `/opsx:*` chat flow.
  - Added an advanced custom-schema example for UI libraries: mandatory `figma.md` artifact per component change to enforce design context before proposal/spec/tasks.
  - Executed role-2 and role-3 post-writing reviews and captured outputs in `05-technical-review.md` and `06-editorial-review.md`.
  - Updated workspace skills section to include `new-blog` and dedicated role skills (`writer`, `technical-review`, `editorial-review`) with practical usage notes.
- Tone adjustments:
  - Shifted opening to energetic but grounded language and removed over-abstract phrasing.
- Warmth pass (less robotic, more natural phrasing):
  - Added conversational transitions and straightforward engineering framing.
- Engagement punctuation pass (use `!` only where authentic):
  - Kept punctuation restrained; no forced exclamation emphasis.

## Metadata Review

- Final title: Spec-Driven Development: From Prompt Chaos to Repeatable Delivery with OpenSpec
- Final description: A practical, in-depth OpenSpec guide for developers using Codex or Claude Code, from first principles to component-level spec-driven delivery.
- Final tags: openspec, engineering-workflow, ai-assisted-engineering, delivery
- Draft state decision: true

## Validation

- [x] `npm run lint`
- [x] `npm run build`

## Manual Publish Checks

- [ ] Rendering looks correct in `/blog` and `/blog/<slug>`
- [ ] Links are valid
- [x] Claims needing citation are verified
- [x] Frontmatter is complete and accurate
- Notable warning:
  - `npm run build` reports duplicate content id warning for `openspec-blog-authoring-flow` (build still succeeds). Needs follow-up before publish.
