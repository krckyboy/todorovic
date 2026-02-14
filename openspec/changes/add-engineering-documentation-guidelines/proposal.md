> **STATUS: COMPLETED (Pending Archive)** as of February 14, 2026.
> Goal: establish clear repo documentation and AI-guideline docs for Codex-first engineering workflows.

## Why

The repository has strong OpenSpec and Astro conventions, but practical engineering docs were fragmented and README still carried starter-level structure recently. We need a clear split between:

- OpenSpec artifacts (formal requirements and proposal tracking)
- Day-to-day engineering documentation (how to work in this repo)
- AI-assisted workflow guidance (Codex-first execution and validation expectations)

This improves onboarding, reduces ambiguity, and makes AI-assisted work predictable.

## What Changes

- Add a documentation set under `documentation/` for workflow, architecture, module/service boundaries, and quality gates.
- Clarify DDD-inspired module conventions and Astro conventions with explicit links to OpenSpec specs.
- Keep `AGENTS.md` as a routing file that points to task-relevant docs (on-demand loading only).
- Update top-level docs (`README.md`, `AGENTS.md`) to point to the new docs and preserve OpenSpec-first behavior.

## Capabilities

### New Capabilities

- `engineering-docs`: Centralized engineering guidance for project workflow, modules/services, testing strategy, and validation gates.

### Modified Capabilities

- `astro-conventions`: Module guidance clarified to use `services/` for hook-style logic (no separate `hooks/` convention folder).

## Impact

- **Modified files**: `README.md`, `AGENTS.md`, `documentation/README.md`, `openspec/specs/astro-conventions/spec.md`, `openspec/specs/open-proposals/spec.md`
- **New files**:
  - `documentation/engineering-workflow.md`
  - `documentation/modules-and-services.md`
  - `documentation/validation-and-quality-gates.md`
  - OpenSpec change artifacts in `openspec/changes/add-engineering-documentation-guidelines/`
- **No new dependencies**
- **No breaking runtime changes**: documentation-only and conventions updates
