## Context

The current `blog-authoring` schema enforces useful structure, but prompt wording in templates is still prone to formal or generic output. Recent drafting feedback requires a simpler, more natural tone aligned with how the author speaks in real posts (work + side-project context, practical examples, minimal jargon).

The workflow also ends too early from a review perspective. Writing is captured, but technical and editorial verification are not split into explicit, role-based artifacts.

## Goals / Non-Goals

**Goals:**

- Make schema/template prompts explicitly favor plain, human language.
- Add wording checks that reduce robotic phrasing during revision.
- Add explicit post-writing review gates for technical and editorial quality.

**Non-Goals:**

- Changing repository-level lint/build quality gates.
- Changing blog taxonomy or metadata schema.

## Decisions

- Add explicit language-style guidance in `schema.yaml` revision instruction block.
  - Rationale: keeps style enforcement close to the stage where final prose is produced.
- Update `intent.md` and `inspiration.md` prompts to ask for concrete, conversational language.
  - Rationale: tone constraints should begin before drafting, not only at revision.
- Update `revision.md` with a dedicated plain-language pass.
  - Rationale: provides a final checkpoint to remove robotic tone and jargon.
- Add `technical-review` and `editorial-review` artifacts after `revision`.
  - Rationale: separates correctness verification from readability/voice verification and reduces review ambiguity.
- Gate `apply` on completion of editorial review.
  - Rationale: ensures role 2 + role 3 are always completed before final sign-off.
- Update blog-authoring skill prompt/rules to enforce 3-role sequencing.
  - Rationale: keeps behavior consistent across agent invocations.
- Add dedicated role skills/agent configs for writer, technical review, and editorial review.
  - Rationale: allows explicit, reusable role invocation and reduces ambiguity in multi-review sessions.
- Add a `new-blog` orchestrator skill/agent that maps `/new-blog <change-id>` style input into OpenSpec role sequencing.
  - Rationale: lowers operator overhead for repeat blog workflows and gives a simple entry point for contributors.

Alternatives considered:

- Only updating the blog post itself without schema changes.
  - Rejected because future posts would still inherit old prompt language.
- Moving all style rules to external docs only.
  - Rejected because schema templates are the operational source during artifact generation.
- Keeping review checks only inside `04-revision.md`.
  - Rejected because mixed review responsibilities reduce accountability and lead to missed checks.
- Keeping role behavior inside a single router skill only.
  - Rejected because explicit role skills are clearer and easier to invoke independently.
- Relying on manual role invocation every time.
  - Rejected because a dedicated kickoff skill reduces missed steps in repetitive workflows.

## Risks / Trade-offs

- [Risk] Over-correction toward casual tone could reduce precision.
  - Mitigation: keep explicit factual/research checks in research/revision artifacts.
- [Risk] Different contributors may interpret "natural" differently.
  - Mitigation: include concrete wording cues in templates and keep revision checks explicit.
- [Risk] Extra review artifacts can add process overhead.
  - Mitigation: keep role-2 and role-3 templates short and checklist-based.

## Migration Plan

1. Update blog-authoring schema/template wording.
2. Add role-2 and role-3 review artifacts/templates.
3. Update blog-authoring skill instructions to enforce role order.
4. Add dedicated role skills/agent configs and wire router to orchestrate them.
5. Add `new-blog` orchestrator skill/agent and document its routing behavior.
6. Execute technical and editorial review artifacts in active blog change.
7. Validate with `npm run lint` and `npm run build`.
8. Use updated schema in subsequent blog changes and collect feedback.
9. Refine prompts further only if recurring style issues remain.

Rollback strategy:

- Revert schema/template/skill files to previous versions if output quality regresses.

## Open Questions

- Should future template revisions include optional tone presets (for example, "technical-deep" vs "founder-journal") or remain single-style?
