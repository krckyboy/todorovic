# Engineering Workflow

## Purpose

Define the default implementation workflow for this repository, including AI-assisted execution.

## Core Rule

For non-trivial work, use OpenSpec first.

- Create or update a proposal in `openspec/changes/`
- Implement against the approved proposal tasks
- Keep `openspec/specs/open-proposals/spec.md` synchronized

## Where Truth Lives

- Formal requirements: `openspec/specs/`
- Active change intent and tasks: `openspec/changes/<change-id>/`
- Operational guidance: `documentation/`

## Default Flow

1. Read relevant specs first.
2. Confirm scope and constraints.
3. Create/update OpenSpec change artifacts (`proposal.md`, `design.md`, `tasks.md`).
4. Implement changes in small, verifiable increments.
5. Run validation commands (`npm run lint`, `npm run build`).
6. Report results and outstanding manual checks.
7. Commit/push only with explicit user approval.

## AI-Assisted Execution

Use this same workflow for Codex-assisted work.

### Working Principles

- OpenSpec-first for non-trivial changes
- Specs before edits
- Small, verifiable increments
- Validation before handoff
- No commit/push without explicit user approval

### Context Policy

- Do not preload all docs at session start.
- Always read the relevant OpenSpec spec for the task.
- Load `documentation/*.md` files only when the task matches that topic.

### Required Validation Before Handoff

- `npm run lint`
- `npm run build`

If commands fail, report:

- failing command
- root cause
- concrete fix applied (or blocker)

## Read-First Links

- [../openspec/specs/astro-conventions/spec.md](../openspec/specs/astro-conventions/spec.md)
- [../openspec/specs/portfolio-module/spec.md](../openspec/specs/portfolio-module/spec.md)
- [../openspec/specs/blog-module/spec.md](../openspec/specs/blog-module/spec.md)
- [../openspec/specs/styling/spec.md](../openspec/specs/styling/spec.md)
- [blog-authoring-workflow.md](blog-authoring-workflow.md)
- [deployment-and-domain-cutover.md](deployment-and-domain-cutover.md)

## Done Criteria

- Change intent documented in OpenSpec
- Tasks updated to actual completion state
- Lint/build pass
- Summary includes: what changed, where, validation, git state, open items

## Output Contract

For substantial tasks, report in this order:

1. What changed
2. Where it changed
3. Validation status
4. Git state
5. Remaining checks/open items
