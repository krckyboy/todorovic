## Context

Legacy schema options do not provide one canonical blog workflow with explicit:

- intent framing (audience, claims, constraints),
- ideation output (angles/hooks),
- evidence mapping (claim/source/confidence),
- revision gate (technical/editorial/publish checks).

The workflow update should remain practical while improving consistency and factual quality.

## Goals / Non-Goals

**Goals:**

- Provide one canonical OpenSpec schema for blog creation and blog editing work.
- Include an explicit research artifact for claim verification.
- Include an inspiration artifact for early ideation.
- Provide a Codex skill that operationalizes the flow.
- Remove unused project-local schemas to reduce maintenance overhead.

**Non-Goals:**

- Introducing runtime/content rendering changes.
- Automating publish/deploy operations.

## Decisions

1. Consolidate on a single schema name: `blog-authoring`.

- Rationale: avoid split mental models and keep blog operations predictable.

2. Use four artifacts: `intent -> inspiration + research -> revision`.

- Rationale: keeps phases explicit while writing directly in canonical blog content files.

3. Keep validation in revision stage (`npm run lint`, `npm run build`) and manual checks.

- Rationale: aligns with repository quality gates and existing blog authoring documentation.

4. Create a repo-local skill (`openspec-blog-authoring`) that maps user intent (create/edit/inspiration/research) onto this schema.

- Rationale: improves consistency and lowers setup friction for repeated authoring sessions.

## Risks / Trade-offs

- Additional artifacts add process overhead for very small edits.
- Repo-local skill must be copied to `$CODEX_HOME/skills` if the runtime does not auto-discover project `.codex/skills`.
- Research quality still depends on source discipline and human review.

## Migration Plan

1. Add schema and templates under `openspec/schemas/blog-authoring/`.
2. Add change spec and task tracking.
3. Add repo skill folder with SKILL instructions and UI metadata.
4. Remove unused schema folders (`astro-page`, `astro-project`, `blog-content`).
5. Validate with schema listing + lint/build.
6. Synchronize umbrella open-proposals tracker.

## Open Questions

- None.
