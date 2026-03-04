---
title: 'Spec-Driven Development with OpenSpec: A Practical Guide'
description: 'A practical, in-depth OpenSpec guide for developers using Codex or Claude Code, from first principles to component-level spec-driven delivery.'
pubDate: 2026-03-04
author: 'Dušan Todorović'
tags:
  ['openspec', 'engineering-workflow', 'ai-assisted-engineering', 'delivery']
draft: false
---

We are in a really interesting AI era.

In daily engineering work, AI can help with planning, code generation, refactors, tests, and documentation much faster than before.

At <a href="https://constructor.tech/" target="_blank" rel="noopener noreferrer">Constructor Tech</a>, we started using AI more and more in daily delivery. In my personal projects, I saw the same pattern and started applying OpenSpec there as well.

That is the upside.

The downside shows up when teams scale.

When multiple developers and multiple AI sessions work on the same codebase, missing structure quickly creates misalignment: different assumptions, different implementation styles, and unclear intent history.

So if you want speed and control at the same time, this is where spec-driven development comes in.

That is exactly where <a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noopener noreferrer">OpenSpec</a> became important for me.

## What Drift Looks Like Without OpenSpec

> **TL;DR:** Without written specs, teams and AI sessions drift into different implementations, and reviews lose shared context.

Let’s start with a concrete non-OpenSpec example.

You ask your AI assistant:

```bash
Build a todo list feature with add/edit/delete, filters, and persistent state.
```

The assistant starts coding immediately. First pass looks good.

The real downside is usually not one missed detail. It is process drift.

Here is a realistic drift example from team work:

1. You implement the todo flow with local state (`useState`-style).
2. Another developer asks AI for a similar feature and gets a global store approach (for example Zustand/Redux).
3. A third implementation (or framework variant) follows a different state pattern again.

All three versions can "work", but now your codebase has mixed patterns, mixed naming, mixed testing assumptions, and inconsistent behavior decisions.

### Where this usually breaks

1. Scope keeps shifting in chat, so "done" is unclear.
2. Decisions live in conversation, not in repo files other people can review.
3. Every new person or agent has to reconstruct intent from old context.
4. Validation becomes subjective because there is no written behavior contract.
5. Follow-up work starts from memory again, which increases regression risk.
6. Token usage goes up because you keep re-prompting and rewriting.

Missing state persistence, filter edge cases, or accessibility rules are common symptoms of that bigger problem.

Without shared specs, guidelines, and documentation, implementation naturally drifts between developers. In AI-assisted workflows, that drift can accelerate because each person and each agent fills missing context differently.

Spec-driven conventions are how you prevent that: they align people, align AI outputs, and keep delivery consistent across the team.

## What OpenSpec Actually Is

> **TL;DR:** OpenSpec turns chat intent into reviewable artifacts first, then code, then verified/merged spec updates.

OpenSpec is a spec-driven workflow that helps you turn intent into clear, trackable files before and during implementation.

The big picture is simple:

1. Start a change.
2. Generate planning artifacts.
3. Review and refine those artifacts.
4. Implement against approved artifacts.
5. Validate.
6. Merge deltas into the main specs with `/opsx:sync` or `/opsx:archive`.

This is the key idea many people miss: specs are not one-time documents.
They are living contracts that evolve across changes.

Without OpenSpec, process is often:

- prompt,
- output,
- tweak,
- repeat,
- hope it still matches intent.

With OpenSpec, process becomes:

- intent,
- proposal/spec/design,
- tasks,
- implementation,
- validation,
- delta merge,
- archive.

Before command details, it helps to know where OpenSpec files live:

- `openspec/config.yaml` for project defaults,
- `openspec/specs/...` for source-of-truth specs,
- `openspec/changes/<change-id>/...` for active change artifacts and deltas.

### One Mental Model Before Commands

Think in two layers:

- `openspec/changes/<change-id>/...` is your active workspace for this change.
- `openspec/specs/...` is your long-term source of truth for future changes.

`/opsx:sync` and `/opsx:archive` are the bridge between those layers.

## Schema First (Before Artifacts)

> **TL;DR:** Schema decides which artifacts are generated and what global rules/context are applied across changes.

In most teams, you start with `spec-driven` as the default schema.

Project defaults live in `openspec/config.yaml`:

```yaml title="openspec/config.yaml"
schema: spec-driven
context: |
  Project conventions and architecture notes...
rules:
  proposal:
    - Define in-scope and out-of-scope clearly
  tasks:
    - Include lint/build verification steps
```

These defaults apply across the repo unless overridden at change level.

In default `spec-driven`, planning artifacts are usually:

- `proposal.md`
- `specs/<capability>/spec.md`
- `design.md`
- `tasks.md`

## OpenSpec Artifacts: Clear, Practical Breakdown

> **TL;DR:** `proposal.md` defines intent/scope, `spec.md` defines behavior, `design.md` captures technical decisions, and `tasks.md` drives execution.

Quick view:

| Artifact                                | Main purpose                       | Key question it answers                        |
| --------------------------------------- | ---------------------------------- | ---------------------------------------------- |
| `proposal.md`                           | Scope and intent                   | "Why this change, and what is in/out?"         |
| `spec.md` (under `specs/<capability>/`) | Behavior contract                  | "What must be true when done?"                 |
| `design.md`                             | Technical decisions and trade-offs | "Why this approach and what are risks?"        |
| `tasks.md`                              | Execution checklist                | "What exactly gets implemented and validated?" |

If these four are clear, implementation quality improves immediately.

## `proposal.md` (Why + Scope)

This is where you state why the change exists and what is in scope.

A strong proposal answers:

- What problem are we solving?
- Why now?
- What is explicitly included?
- What is intentionally excluded?
- What does success look like?

If proposal is weak, implementation gets pulled by whichever prompt sounds best in the moment.

Example start:

```text
/opsx:propose build-todo-list-feature
```

Example `proposal.md`:

```md title="openspec/changes/build-todo-list-feature/proposal.md"
## Why

The app does not have a clear, reusable todo workflow.
Task state and filter behavior are inconsistent across refresh flows and follow-up changes.

## What Changes

- Create a unified todo workflow (add/edit/delete/complete + active/completed filters).
- Define persistence behavior so tasks and filter state survive refresh.
- Add explicit validation checks for behavior, accessibility, and build safety.

## Out of Scope

- Backend storage and APIs
- Real-time collaboration
- Reminder/notification features

## Impact

- Affected files: `src/modules/todo/...`, `src/pages/todos/index.astro`, related task state services.
- No new runtime dependencies.
```

## `spec.md` (Behavior Contract)

This defines required behavior in a reviewable format.

A strong spec focuses on outcomes and scenarios, not implementation details.

Instead of saying "Use library X," it says what must be true:

- "Todo state MUST persist across refresh."
- "Task controls MUST remain keyboard-accessible and predictable."

Example `spec.md`:

```md title="openspec/changes/build-todo-list-feature/specs/todo-workflow/spec.md"
## ADDED Requirements

### Requirement: Todo persistence and state restoration

Todo items and selected filter MUST persist across refresh.

#### Scenario: Refresh preserves tasks and filter

- **WHEN** user adds tasks, marks one completed, selects "Active", then refreshes
- **THEN** task completion and selected filter remain applied
- **AND** rendered list matches persisted state

### Requirement: Todo accessibility

Task input, action buttons, and filter controls MUST be keyboard-accessible with visible focus states.
```

## `design.md` (Technical Decisions + Trade-offs)

Not every change needs a design doc, but complex ones do.

Use `design.md` for non-trivial decisions:

- architecture boundaries,
- dependency choices,
- migration strategy,
- performance/a11y/security trade-offs,
- integration constraints.

It prevents hidden architecture where key decisions exist only in chat or someone’s head.

Example `design.md`:

```md title="openspec/changes/build-todo-list-feature/design.md"
## Decisions

- Use module-level service logic for task operations and persistence transforms.
- Keep rendering in views/components, business logic in services.
- Keep persisted-state shape explicit (`id`, `text`, `completed`, `filter`).

## Risks / Trade-offs

- [Risk] Persisted-state mismatches after refresh
  -> Mitigation: verify refresh/filter/complete flows before archive
```

## `tasks.md` (Execution Plan)

This turns intent into checkable work.

A strong tasks file includes:

- concrete implementation steps,
- target files,
- verification steps,
- progress checkboxes.

Example `tasks.md`:

```md title="openspec/changes/build-todo-list-feature/tasks.md"
## 1. Todo Feature Implementation

- [ ] 1.1 Add/extend `src/modules/todo/services/*` for task operations and persistence logic
- [ ] 1.2 Integrate todo input/list/filter controls in `src/pages/todos/index.astro`
- [ ] 1.3 Ensure rendered list updates match service state transforms

## 2. Behavior + Accessibility

- [ ] 2.1 Implement persistence for tasks and selected filter
- [ ] 2.2 Validate keyboard flow and focus visibility for controls

## 3. Validation

- [ ] 3.1 Run `npm run lint`
- [ ] 3.2 Run `npm run build`
- [ ] 3.3 Perform manual checks on `/todos` for refresh and filter-state behavior
```

## Implementation + Validation

After artifacts are ready, implementation is no longer a guessing game.

You generate code against explicit constraints, then validate:

- lint,
- build,
- behavior checks,
- accessibility checks,
- any domain-specific verification.

This split gives alignment before generation and reduces wasted rewrites.

## Setup Once, Then Work with `/opsx` Commands

Before daily use, do a one-time OpenSpec setup.

Project dependency (recommended for teams):

```bash
npm install -D @fission-ai/openspec
npx openspec init
```

If integrations or CLI version change, refresh generated instructions:

```bash
npx openspec update
```

In daily work, you usually operate through `/opsx:*` commands in your AI tool.

## Command Flow (Practical)

> **TL;DR:** Use quick path when needed, or step-by-step when you want tighter review checkpoints.
> Command examples in this section were validated against OpenSpec `1.2.0` on March 4, 2026.

Quick path:

```text
/opsx:propose <idea>
/opsx:apply [change-name]
/opsx:archive [change-name]
```

Step-by-step path:

```text
/opsx:new <change-name>
/opsx:continue [change-name]
/opsx:continue [change-name]   # repeat as needed until planning artifacts are complete
/opsx:ff [change-name]        # optional fast-forward for remaining planning artifacts
/opsx:apply [change-name]
/opsx:sync [change-name]      # optional before archive
/opsx:archive [change-name]
```

Useful terminal check:

```bash
npx openspec status --change <change-id>
```

### `/opsx:propose` vs `/opsx:new` vs `/opsx:ff`

| Command         | Typical use                                 | Generates planning artifacts |
| --------------- | ------------------------------------------- | ---------------------------- |
| `/opsx:propose` | Default quick start for a new change        | Yes                          |
| `/opsx:new`     | Create scaffold first, review incrementally | No                           |
| `/opsx:ff`      | Fast-forward missing planning artifacts     | Yes                          |

## What Each Command Produces

- `/opsx:propose` usually creates `proposal.md`, `spec.md`, `design.md`, `tasks.md` under `openspec/changes/<change-id>/...`.
- `/opsx:new` creates the change scaffold, including `.openspec.yaml`.
- `/opsx:continue` advances the next ready artifact.
- `/opsx:apply` implements tasks.
- `/opsx:sync` merges approved deltas into `openspec/specs/...` without closing the change.
- `/opsx:archive` closes the change and merges remaining deltas.

Practical rule: use quick path for smaller changes, and step-by-step path when you want explicit review checkpoints between artifacts.

## Commit the OpenSpec Artifacts

This part is essential for team traceability: commit OpenSpec artifacts, not only final code.

At minimum, keep `proposal.md`, `spec.md`, `design.md` (when used), and `tasks.md` in git history so reviewers can understand intent and decisions without reconstructing chat history.

## Realistic Output Pattern

A practical pattern for medium changes:

1. Create change and review early artifacts carefully.
2. Continue artifacts until scope and behavior are stable.
3. Optionally fast-forward remaining planning artifacts.
4. Apply implementation.
5. Validate.
6. Sync/archive.

This keeps speed while preserving control.

## Complex Features: Split Across Multiple MRs

For larger features, OpenSpec helps split work across multiple MRs while keeping one shared change context.

Example strategy:

1. MR 1: Proposal/spec/design/tasks only.
2. MR 2: Core implementation.
3. MR 3: Remaining tasks, fixes, final polish.
4. Archive after required work is complete.

Each MR points to the same change id, so reviewers can follow intent and progress.

## Why Archiving Matters

Archiving is not just cleanup.

It keeps active vs completed work clear, preserves discoverable intent history, and prevents OpenSpec workspaces from becoming noisy.

## Why This Helps on Future Module Changes

Suppose later someone asks:

- "Add due dates and overdue highlighting."
- "Add bulk actions (complete all / clear completed)."
- "Track todo completion metrics for analytics."

Without specs, you restart from prompt memory.

With OpenSpec, you extend known contracts:

- proposal history for context,
- spec for behavior,
- design decisions for architecture,
- tasks history for execution details.

That makes follow-up changes faster and less error-prone.

## Spec Deltas: Updating Existing Behavior Safely

> **TL;DR:** deltas (`ADDED`/`MODIFIED`/`REMOVED`) let you evolve behavior safely, then merge via `/opsx:sync` or `/opsx:archive`.

When changing existing behavior, write deltas in:

```text
openspec/changes/<change-id>/specs/<capability>/spec.md
```

Use:

- `ADDED` for new requirements,
- `MODIFIED` for changed requirements,
- `REMOVED` for deleted requirements.

Example delta snippet:

```md title="openspec/changes/<change-id>/specs/todo-workflow/spec.md"
## MODIFIED Requirements

### Requirement: Todo state persistence

Todo items and selected filter MUST persist in local state storage.

#### Scenario: Refresh and restore todo state

- **WHEN** user refreshes `/todos` after editing tasks and switching filters
- **THEN** rendered tasks and selected filter match persisted state
```

## Token Economics: Why Planning First Saves Cost

When people say OpenSpec is overhead, they usually compare it with one prompt and one output.

That is not the real comparison.

Real comparison:

- no structure + multiple rewrites + direction drift + review confusion,
- versus explicit artifacts + constrained generation + predictable validation.

For non-trivial work, planning first often reduces overall token waste.

## Practical Adoption Plan

If your team is new to OpenSpec:

1. Start with one component/module change, not everything.
2. Require proposal + spec + tasks at minimum.
3. Add design docs only when trade-offs are real.
4. Commit artifacts before and during implementation.
5. Keep validation mandatory.
6. Archive completed changes and reference them in future work.

## Common Mistakes to Avoid

1. Vague proposals with no out-of-scope boundaries.
2. Treating spec as rough notes instead of a behavior contract.
3. Skipping design decisions in complex changes.
4. Running validation only when something visibly breaks.
5. Keeping key decisions in chat, not in artifacts.

## Final Take

OpenSpec gives you speed with control by making intent explicit before generation and traceable after delivery.

AI has never been more capable, but the win now is not only model quality. It is workflow quality.

For component/module work especially, this is the difference between fast chaos and fast reliability.

In the next post, I will cover advanced examples where OpenSpec shines even more: custom schemas, stricter verification, and larger team flows.

Learn more about OpenSpec: <a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noopener noreferrer">https://github.com/Fission-AI/OpenSpec</a>
