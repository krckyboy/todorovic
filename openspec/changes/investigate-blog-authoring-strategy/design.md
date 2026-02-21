## Context

Current documentation defines baseline writing and validation steps, plus tag governance. It does not fully answer how to choose tools (Codex, OpenSpec schemas, and lightweight local tooling) or how to structure multi-agent responsibilities for research and technical verification.

## Goals / Non-Goals

**Goals:**

- Provide a practical authoring strategy with clear tool selection criteria.
- Define an agent-oriented workflow that improves factual and technical quality.
- Keep the process lightweight enough for regular publishing cadence.

**Non-Goals:**

- Enforcing tool lock-in.
- Building automation infrastructure in this change.
- Creating content calendar policy.

## Decisions

1. Use primary-source tool documentation and current feature sets as evidence.

- Rationale: avoids stale assumptions and ensures recommendations map to actual capabilities.

2. Recommend a role-based flow instead of a single-agent workflow.

- Rationale: research accuracy and technical correctness benefit from separate passes.

3. Keep OpenSpec as the governing framework for non-trivial content/process changes.

- Rationale: consistent with repository engineering workflow and quality gates.

## Risks / Trade-offs

- [Risk] Process overhead may slow short posts. -> Mitigation: keep minor edits on lightweight path.
- [Risk] Tool capabilities evolve quickly. -> Mitigation: add periodic review trigger and timestamped recommendations.

## Migration Plan

1. Collect evidence from primary sources for selected tools.
2. Update `documentation/blog-authoring-workflow.md` with a concrete tool/agent operating model.
3. Verify documentation consistency and run repo quality gates.

## Open Questions

- Whether to codify agent prompts as reusable templates in a dedicated documentation file.
