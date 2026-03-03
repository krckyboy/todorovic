---
title: 'Spec-Driven Development: From Prompt Chaos to Repeatable Delivery with OpenSpec'
description: 'A practical, in-depth OpenSpec guide for developers using Codex or Claude Code, from first principles to component-level spec-driven delivery.'
pubDate: 2026-02-28
author: 'Dušan Todorović'
tags:
  ['openspec', 'engineering-workflow', 'ai-assisted-engineering', 'delivery']
draft: true
---

We are in a really interesting AI era.

In daily engineering work, AI can help with planning, code generation, refactors, tests, and documentation much faster than before.

It can output a huge amount of code in a very short time, and that is genuinely powerful.

At <a href="https://constructor.tech/" target="_blank" rel="noopener noreferrer">Constructor Tech</a> and in my side projects, I see the same shift: AI is now part of the normal workflow.

That is the upside.

The downside shows up when teams scale.

When multiple developers and multiple AI sessions work on the same codebase, missing structure quickly creates misalignment: different assumptions, different implementation styles, and unclear intent history.

So if you want speed and control at the same time, this is where spec-driven development comes in.

That is exactly where <a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noopener noreferrer">OpenSpec</a> became important for me.

When you move fast with AI but skip structure, this is what usually happens:

- You get a lot of code fast, but not always the code you actually wanted.
- The first output pushes the direction, even if the scope was not clear yet.
- Important decisions stay in chat instead of repo files.
- Reviews get harder because people cannot see why decisions were made.

Tools like Claude Code Plan mode help a lot with planning. I use that kind of approach too.

But if those decisions are not written into files in your repo, people lose context quickly.

That is exactly where OpenSpec helps.

This post focuses on OpenSpec basics.
I will cover custom schemas and advanced setup in a separate post.

## What Drift Looks Like Without OpenSpec

> **TL;DR:** Without written specs, teams and AI sessions drift into different implementations, and reviews lose shared context.

Let's start with a concrete non-OpenSpec example first.

You ask your AI assistant:

```bash
Build a todo list feature with add/edit/delete, filters, and persistent state.
```

The assistant starts coding immediately. First pass looks good.

The real downside is usually not one missed detail. It is process drift.

Here is a realistic drift example from team work:

1. You implement the todo flow with local state (`useState`-style).
2. Another developer asks AI for a similar feature and gets a global store approach (for example Zustand/Redux).
3. A third implementation (or another framework variant) follows a different state pattern again.

All three versions can "work", but now your codebase has mixed patterns, mixed naming, mixed testing assumptions, and inconsistent behavior decisions.

### Where this usually breaks

1. Scope keeps shifting in chat, so "done" is unclear.
2. Decisions live in conversation, not in repo files other people can review.
3. Every new person or agent has to reconstruct intent from old context.
4. Validation becomes subjective because there is no written behavior contract.
5. Follow-up work starts from memory again, which increases regression risk.
6. Token usage goes up because you keep re-prompting and rewriting.

Missing state persistence, filter edge cases, or accessibility rules are common symptoms of that bigger problem.

You might still ship something working, but usually with more back-and-forth, lower confidence, and weaker traceability.

This gets even worse in team environments.

Without shared specs, guidelines, and documentation, implementation naturally drifts between developers. In AI-assisted workflows that drift can accelerate, because each person and each agent fills missing context differently.

Spec-driven conventions are how you prevent that: they align people, align AI outputs, and keep delivery consistent across the team.

If you also guide AI to read specific conventions before coding, drift drops even further.
And in advanced setups (covered in a separate post), you can add verification layers that check generated code against your rules before changes are accepted.

That is what I call fast chaos: high output, low alignment.

## What OpenSpec Actually Is

> **TL;DR:** OpenSpec turns chat intent into reviewable artifacts first, then code, then verified/merged spec updates.

OpenSpec is a spec-driven workflow that helps you turn intent into clear, trackable files before and during implementation.

The big picture is simple:

1. You run a command for a change.
2. It generates planning artifacts that become your shared contract.
3. You review and iterate those artifacts before implementation.
4. You implement and verify against the approved artifacts.
5. In future changes, you expand or modify behavior through delta specs.
6. You merge approved deltas into the main spec source of truth with `/opsx:sync` (while the change stays active) or `/opsx:archive` (when closing the change).

This is the key idea many people miss: specs are not one-time documents.
They are living contracts that evolve across changes.

Without OpenSpec, your process is usually:

- prompt,
- output,
- tweak,
- repeat,
- hope it still matches intent.

With OpenSpec, your process becomes:

- intent,
- proposal/spec/design,
- tasks,
- implementation,
- validation,
- delta merge (`/opsx:sync` or `/opsx:archive`),
- archive.

OpenSpec is not about adding paperwork.

It is about making decisions early so you waste fewer tokens and do fewer late rewrites.

If you are shipping bigger changes with AI, this is a very practical reliability layer.

Before we go deeper, it helps to know where OpenSpec files live in a project:

- `openspec/config.yaml` for project defaults,
- `openspec/specs/...` for source-of-truth specs,
- `openspec/changes/<change-id>/...` for active change artifacts and deltas.

In practice, most teams now implement with AI assistance in almost every change.
So when you open a merge request, ship the OpenSpec artifacts with the code changes.
Do not ship only code and keep intent in chat.

### One Mental Model Before Command Details

Think in two layers:

- `openspec/changes/<change-id>/...` is your active workspace (new artifacts + delta specs for this change).
- `openspec/specs/...` is your main source of truth used by future changes.

`/opsx:sync` and `/opsx:archive` are the bridge between those two layers.

So it goes like this:
you start a change (`/opsx:propose` or `/opsx:new`), OpenSpec generates artifacts in `openspec/changes/<change-id>/...`, and you refine them while implementing.
When the change is done, run `/opsx:sync` and/or `/opsx:archive` to merge approved specs into `openspec/specs/...`.
If a spec did not exist before, this creates the first version.
If it already existed, your deltas (`ADDED`/`MODIFIED`/`REMOVED`) update that contract.

## Schema First (Before Artifacts)

> **TL;DR:** Schema decides which artifacts are generated and what global rules/context are applied across changes.

Before we explain each file, one important point:
this post uses the default OpenSpec schema, `spec-driven`.

Project-level schema defaults live in `openspec/config.yaml`.
This is where you define global defaults and guidance for AI:

- `schema`: default schema for new changes,
- `context`: shared project context injected into all artifacts,
- `rules`: artifact-specific global rules (for example proposal rules vs task rules).

Example:

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

These defaults apply across the repo unless overridden at change/command level.

In default `spec-driven`, planning usually creates these artifacts:

- `proposal.md`
- `specs/<capability>/spec.md`
- `design.md`
- `tasks.md`

That is the baseline flow most teams start with.
Custom schemas are possible, but we will cover those in a separate post.

## OpenSpec Artifacts, Explained Thoroughly

> **TL;DR:** `proposal.md` defines intent/scope, `spec.md` defines behavior, `design.md` captures technical decisions, and `tasks.md` drives execution.

So what are these artifacts, exactly? Let me explain.

## `proposal.md` (Why + Scope)

This is where you state why the change exists and what is in scope.

A strong proposal answers:

- What problem are we solving?
- Why now?
- What is explicitly included?
- What is intentionally excluded?
- What does success look like?

Why it matters:

If proposal is weak, implementation gets pulled by whichever prompt sounds best in the moment.

For example, imagine this is the change request we started from:

> **Practical note:** You do not need to create a separate `.md` file for context.
> In real usage, paste context directly after the command in chat.
> The Markdown structure below is shown only for readability.
>
> **Optional shortcut:** if your assistant can read Jira/YouTrack context, you can point to the ticket ID and ask it to use that as source context.

Terminal command:

```bash
/opsx:propose build-todo-list-feature
```

Context (shown as Markdown for readability):

```md title="prompt-for-build-todo-list-feature.md"
## Context

- Build todo feature for `/todos` with add/edit/delete/complete and active/completed filtering.
- Persist tasks and selected filter so state survives refresh.
- Require keyboard accessibility and visible focus states for form/actions/filters.
- Out of scope: backend storage, real-time collaboration, reminders.
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

## Capabilities

### New Capabilities

- `todo-workflow`: Unified task lifecycle and filtering behavior.

### Modified Capabilities

- `tasks-module`: Update task state handling and filter requirements.

## Impact

- Affected files: `src/modules/todo/...`, `src/pages/todos/index.astro`, related task state services.
- No new runtime dependencies.
```

So you see, this is rather lightweight and easy to scan.
It is very useful when you review MRs from other developers and want to understand the intent quickly.
Other artifacts usually contain more detailed behavior and implementation constraints.

## `spec.md` (Behavior Contract)

This defines required behavior in a format that can be reviewed and validated.

Depending on your schema/project conventions, this can live in `spec.md` or capability-specific files under `specs/`.

A strong spec focuses on outcomes and scenarios, not implementation details.

For example, instead of saying:

- "Use library X with hook Y"

It says:

- "Todo state MUST persist across refresh."
- "Task form and filter controls MUST remain keyboard-accessible and predictable."

Why it matters:

Specs become the source of truth for future changes. You do not renegotiate behavior every time someone opens a new PR.

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

#### Scenario: Keyboard control flow

- **WHEN** a user tabs through task input, action buttons, and filters
- **THEN** each control is reachable in logical order
- **AND** focused elements are visually distinguishable
```

## `design.md` (Technical Decisions + Trade-offs)

Not every change needs a design doc, but complex ones do.

Use `design.md` when decisions are non-trivial:

- architecture boundaries,
- dependency choices,
- migration strategy,
- performance/a11y/security trade-offs,
- integration constraints.

Why it matters:

It prevents "hidden architecture" where crucial decisions only exist in someone’s head or in old chat context.

Minimal `design.md` example:

```md title="openspec/changes/build-todo-list-feature/design.md"
## Decisions

- Use module-level service logic for task operations and persistence transforms.
- Keep rendering in todo views/components, business logic in services.
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

Why it matters:

Tasks make execution observable. You know what is done, what is blocked, and what remains.

Example `tasks.md`:

```md title="openspec/changes/build-todo-list-feature/tasks.md"
## 1. Todo Feature Implementation

- [ ] 1.1 Add/extend `src/modules/todo/services/*` for task operations and persistence logic
- [ ] 1.2 Integrate todo input/list/filter controls in `src/pages/todos/index.astro` (or module view)
- [ ] 1.3 Ensure rendered list updates match service state transforms

## 2. Behavior + Accessibility

- [ ] 2.1 Implement persistence for tasks and selected filter
- [ ] 2.2 Validate keyboard flow and focus visibility for controls

## 3. Validation

- [ ] 3.1 Run `npm run lint`
- [ ] 3.2 Run `npm run build`
- [ ] 3.3 Perform manual checks on `/todos` for refresh and filter-state behavior
```

## `implementation` + validation

After artifacts are ready, implementation is no longer a guessing game.

You generate code against explicit constraints, then validate:

- lint,
- build,
- behavior checks,
- accessibility checks,
- any domain-specific verification.

## Why this split matters in AI workflows

This artifact split gives you alignment before generation.

That means:

- fewer wasted generations,
- fewer rewrites,
- less "almost correct" code,
- and much better review context.

In short: less token burn for better outcomes.

## Setup Once, Then Work with `/opsx` Commands

> **TL;DR:** Run setup once, then use `/opsx:*` flow in chat for day-to-day work.

Before daily use, do a one-time OpenSpec setup in your repo.

Global install (quickest):

```bash
npm install -g @fission-ai/openspec@latest
openspec init
```

Project dev dependency (team-friendly):

```bash
npm install -D @fission-ai/openspec
npx openspec init
```

`openspec update` is not required immediately after a fresh `init`.
Use it when you change profile/tool integration settings or after later CLI upgrades so generated agent files stay in sync.

Why this matters:

- `openspec init` detects the AI tools you use (for example Cursor, Codex, Claude Code) and prepares integration files for them.
- OpenSpec generates assistant-facing skill/slash-command files for your tool integration.
- After setup, your day-to-day workflow is in chat with `/opsx:*` commands.
- You do not need to keep dropping to raw CLI for normal feature flow.
- In team repos, pinned dev dependency versions can reduce version drift across developers.

We will now focus on the core command flow.

My preference in team projects: use the dev dependency path so everyone runs the same OpenSpec version.

If you want the expanded workflow (`/opsx:new`, `/opsx:continue`, `/opsx:ff`, `/opsx:verify`, `/opsx:sync`), enable it in OpenSpec profile settings, then run `openspec update` again (or `npx openspec update` if using the dev dependency path).

## OpenSpec Command Flow (`/opsx:` style)

> **TL;DR:** Use core flow for speed, expanded flow for stricter artifact control.

OpenSpec now has two practical command paths.

Core flow (quick default):

```text
/opsx:propose <idea>
/opsx:apply
/opsx:archive
```

Expanded flow (more control):

```text
/opsx:explore
/opsx:new <change-id>
/opsx:status --change <change-id>
/opsx:continue <artifact-id> --change <change-id>
/opsx:ff <change-id>
/opsx:apply --change <change-id>
/opsx:verify --change <change-id>
/opsx:sync --change <change-id>
/opsx:archive <change-id>
/opsx:bulk-archive
/opsx:onboard
```

Use core when you want speed. Use expanded when you want strict artifact control.

## `/opsx:new` vs `/opsx:ff` vs `/opsx:propose`

> **TL;DR:** `/opsx:propose` = create+plan (core flow), `/opsx:new` = scaffold only, `/opsx:ff` = create+fast-forward (expanded flow).

This is where confusion usually happens, so here is the exact split.

- `/opsx:new` creates only the change scaffold.
- `/opsx:ff` fast-forwards planning artifacts, and can create a new change in the same command.
- `/opsx:propose` creates a new change and generates planning artifacts in one step.

They are not synonyms.
Even when final files look similar, the workflow behavior is different:

- `/opsx:propose` is the default quick path (core profile).
- `/opsx:new` + `/opsx:continue` gives review checkpoints between artifacts.
- `/opsx:ff` is the expanded-flow fast path (new change or existing change).

As documented in OpenSpec, `/opsx:ff` is still part of the expanded command set (not a deprecated alias for `/opsx:propose`).

Quick side-by-side:

| Command         | Creates new change id              | Generates planning artifacts | Best use                |
| --------------- | ---------------------------------- | ---------------------------- | ----------------------- |
| `/opsx:propose` | Yes                                | Yes (in one run)             | Fast start from idea    |
| `/opsx:new`     | Yes                                | No                           | Step-by-step control    |
| `/opsx:ff`      | Yes (or uses existing if provided) | Yes                          | Expanded-flow fast path |

If you want one default command for this basics guide, use `/opsx:propose`.
Use `/opsx:ff` only when you intentionally run the expanded profile and prefer that path.

For the default `spec-driven` schema, the planning artifacts are:

- `proposal.md`
- `specs/<capability>/spec.md`
- `design.md`
- `tasks.md`

So yes: in default schema, `/opsx:ff` creates all four planning artifacts.

### Quick mental model

- `/opsx:propose` = fastest one-command start (default `core` profile).
- `/opsx:new` + `/opsx:continue` = step-by-step control with review between artifacts.
- `/opsx:ff` = expanded workflow fast start (or fast-forward on an existing scaffold).

## What Each Command Generates

> **TL;DR:** commands are useful because each one creates or advances concrete files you can review and commit.

This is important because traceable output is the whole point.

### `/opsx:propose`

Creates a change and planning artifacts in one shot:

```text
openspec/changes/<change-id>/
  .openspec.yaml
  proposal.md
  specs/<capability>/spec.md
  design.md
  tasks.md
```

### `/opsx:new`

Creates a new change scaffold:

```text
openspec/changes/<change-id>/
  .openspec.yaml
```

`.openspec.yaml` is change-level metadata.
It tracks information specific to that change, typically the schema and created date.

Example:

```yaml title="openspec/changes/<change-id>/.openspec.yaml"
schema: spec-driven
created: 2026-02-21
```

> **Note:** `schema` can be something other than `spec-driven` when you use a custom schema.
> We stay on `spec-driven` in this basics post and cover custom schemas in the advanced follow-up.

Practical rule:

- `openspec/config.yaml` controls repo defaults.
- `openspec/changes/<change-id>/.openspec.yaml` controls this one change.

### `/opsx:continue proposal|specs|design|tasks`

Generates the selected artifact:

```text
openspec/changes/<change-id>/proposal.md
openspec/changes/<change-id>/specs/<capability>/spec.md
openspec/changes/<change-id>/design.md
openspec/changes/<change-id>/tasks.md
```

Important workflow behavior:

After each `/opsx:continue`, review the generated artifact before moving on.
In practice, the AI should prompt you to confirm the artifact is good, then continue with the next `/opsx:continue` (or move to `/opsx:apply` once planning is approved).

### `/opsx:ff`

Fast-forwards planning artifacts in one pass (expanded workflow).

Default `spec-driven` example output:

```text
openspec/changes/<change-id>/
  .openspec.yaml
  proposal.md
  specs/<capability>/spec.md
  design.md
  tasks.md
```

In this basics flow, generated artifacts follow the default `spec-driven` schema.
If the change already exists, `/opsx:ff` generates the remaining missing artifacts.

Important:
`/opsx:propose` and `/opsx:ff` can result in a similar planning file set.
The difference is how you start and control the flow, not only the final files.

### `/opsx:apply`

Implements tasks in code files (and typically updates task checkboxes).

### `/opsx:verify`

Runs verification checks against the implemented result (for example lint/build/tests/manual checklists, depending on your workflow).

### `/opsx:sync`

Merges approved delta specs into `openspec/specs/...` without archiving the change.

Use this when:

- you want the source-of-truth specs updated now,
- but implementation or follow-up tasks for the same change are still ongoing.

### `/opsx:archive`

Archives the completed change and merges remaining delta specs into the main spec source of truth.

Use this when:

- implementation/verification is done,
- and you want to close the change cleanly with specs fully merged.

`/opsx:status` is read-only. It shows progress and blockers and does not create files.

## Commit the OpenSpec Artifacts

This part is essential for team traceability: commit the OpenSpec artifacts, not just the final code.

At minimum, keep `proposal.md`, `spec.md`, `design.md` (when used), and `tasks.md` in git history so other developers can understand intent, decisions, and execution order without reconstructing context from chat.

## Realistic Output Pattern (Default `spec-driven`)

> **TL;DR:** practical flow is `new` -> review early artifacts via `continue` -> optionally `ff` -> `apply`.

You already saw what each artifact means. Now here is the clean flow output pattern in practice.

### 1) Create a feature change (default schema)

```text
/opsx:new demo-todo-list-flow
✔ Created change 'demo-todo-list-flow' ...

/opsx:status --change demo-todo-list-flow
Change: demo-todo-list-flow
Schema: spec-driven
Progress: 0/4 artifacts complete

[ ] proposal
[-] design (blocked by: proposal)
[-] specs (blocked by: proposal)
[-] tasks (blocked by: design, specs)
```

### 2) Create artifacts with review checkpoints

```text
/opsx:continue proposal --change demo-todo-list-flow
✓ Created proposal.md
Review proposal and confirm to proceed.

/opsx:continue specs --change demo-todo-list-flow
✓ Created specs/<capability>/spec.md
Review spec and confirm to proceed.
```

### 3) Fast-forward remaining planning artifacts (optional)

```text
/opsx:ff demo-todo-list-flow
✓ Created design.md
✓ Created tasks.md
All planning artifacts complete.
Ready for implementation. Run /opsx:apply.
```

This is usually the most practical pattern: review early artifacts carefully, then speed up once direction is stable.

## Complex Features: Split Across Multiple MRs

For larger features, OpenSpec helps you split delivery cleanly across multiple merge requests while keeping one shared change context.

Example strategy:

1. MR 1: Proposal/spec/design/tasks only (no big implementation yet).
2. MR 2: Core implementation against approved tasks.
3. MR 3: Remaining tasks, validation fixes, final polish.
4. Archive after all required work is complete.

Each MR points to the same change id, so reviewers can follow intent and progress without guessing.

## Why Archiving Matters

Archiving is not just cleanup.

It is how you close the loop:

- active vs completed work stays clear,
- completed intent/decisions remain discoverable,
- future work can reference archived changes instead of re-creating context.

If you skip archiving, your OpenSpec workspace slowly becomes noisy and harder to navigate.

## Why This Helps on Subsequent Component or Module Changes

This is one of the most important points.

Suppose two weeks later someone asks:

- "Add due dates and overdue highlighting."
- "Add bulk actions (complete all / clear completed)."
- "Track todo completion metrics for analytics."

Without specs, you start from prompt memory again.

With OpenSpec, you begin from existing contracts:

- proposal history for context,
- spec for behavior,
- design decisions for architecture,
- tasks history for what was done and how.

So follow-up changes are faster and less error-prone because you are extending known intent, not improvising from scratch.

This benefit becomes even stronger when the whole team works this way.

When specs are committed and kept current, AI can scan and reuse existing contracts instead of guessing from fragmented chat context. That reduces discrepancies between developers, reviewers, and assistants.

Over time, this compounds:

- rules get stricter,
- scope gets clearer,
- and implementation quality gets more consistent across MRs.

## Spec Deltas: Updating Existing Behavior Safely

> **TL;DR:** deltas (`ADDED`/`MODIFIED`/`REMOVED`) let you evolve existing specs safely, then merge via `/opsx:sync` or `/opsx:archive`.

This is the part people usually miss at first.

When you are changing existing behavior (not adding a brand new domain), you usually write a delta spec inside the active change:

```text
openspec/changes/<change-id>/specs/<capability>/spec.md
```

Deltas are explicit change instructions to existing specs:

- `ADDED` for new requirements,
- `MODIFIED` for changing current requirements,
- `REMOVED` for deleting outdated requirements.

Example delta snippet for a follow-up todo change:

```md title="openspec/changes/<change-id>/specs/todo-workflow/spec.md"
## MODIFIED Requirements

### Requirement: Todo state persistence

Todo items and selected filter MUST persist in local state storage.

#### Scenario: Refresh and restore todo state

- **WHEN** user refreshes `/todos` after editing tasks and switching filters
- **THEN** rendered tasks and selected filter match persisted state
- **AND** UI controls match rendered results
```

### How deltas get merged

1. You review delta specs in your MR while the change is still active.
2. You implement and verify against those deltas.
3. You run `/opsx:sync` if you want to merge delta specs before archive.
4. Or you run `/opsx:archive`, which archives the change and merges the remaining deltas automatically.

So the source of truth in `openspec/specs/...` stays clean, while active work remains isolated in `openspec/changes/...` until it is ready.

## Token Economics: Why Planning First Saves Cost

> **TL;DR:** planning first usually reduces re-prompting and rewrites, so total token cost is often lower on non-trivial work.

When engineers say that OpenSpec sounds like extra overhead, they usually compare it to one prompt and one output.

That is not the real comparison.

The real comparison is:

- no structure + multiple rewrites + direction drift + review confusion,
- versus explicit artifacts + constrained generation + predictable validation.

In practice, non-trivial changes often cost fewer tokens when intent is explicit early.

You stop paying for accidental exploration and start paying for aligned execution.

## Practical Adoption Plan

> **TL;DR:** start small, require core artifacts, keep validation mandatory, and archive completed changes.

If your team is new to OpenSpec, do this:

1. Start with one component/module change, not everything.
2. Require proposal + spec + tasks at minimum.
3. Add design docs only when trade-offs are real.
4. Commit artifacts before and during implementation so intent stays visible to the team.
5. Keep validation mandatory.
6. Archive completed changes and reference them in future work.

After a few cycles, you will naturally see which schema and skill customizations are worth codifying.

Team-level note:

The more consistently your team uses specs, the better AI assistance gets in that repo. Existing specs become reusable context, which means less drift and less re-explaining intent on every change.

## Common Mistakes to Avoid

1. Writing vague proposals with no explicit out-of-scope boundaries.
2. Treating spec as a rough note instead of a behavior contract.
3. Skipping design decisions in complex changes.
4. Running validation only when something visibly breaks.
5. Keeping key decisions in chat, not in artifacts.

Avoid these, and OpenSpec becomes a force multiplier instead of "extra docs."

## Final Take

> **TL;DR:** OpenSpec gives you speed with control by making intent explicit before generation and traceable after delivery.

AI has never been more capable.

The win now is not just model quality. It is workflow quality.

<a href="https://github.com/Fission-AI/OpenSpec" target="_blank" rel="noopener noreferrer">OpenSpec</a> gives you a way to make intent explicit before code generation, keep decisions traceable, and reduce wasted output cycles.

For component/module work especially, this is the difference between fast chaos and fast reliability.

In the next post, I will cover more complex, real-world examples where OpenSpec really shines (custom schemas, stricter verification, and larger team flows), so stay tuned.
