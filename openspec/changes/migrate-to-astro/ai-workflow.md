# AI Workflow: todorovic Portfolio

> **STATUS: ROADMAP**
> This document describes the *planned* AI workflow architecture.
> See implementation status below for what's currently available.

## Implementation Status

| Component | Status | Proposal |
|-----------|--------|----------|
| OpenSpec commands | **Implemented** | - |
| Agent architecture | Not started | add-ai-agents |
| State management | Not started | add-state-management |
| Worktree workflow | Not started | add-worktree-workflow |

### What's Currently Working

- `/opsx:new` - Start a new change
- `/opsx:continue` - Create next artifact
- `/opsx:apply` - Implement tasks
- `/opsx:archive` - Archive completed change
- `/opsx:verify` - Verify implementation
- `/opsx:explore` - Explore mode for thinking
- `/opsx:ff` - Fast-forward artifact creation

---

## Planned Architecture

### Overview

This project will use an AI-assisted development workflow with:
- **Orchestrator**: Coordinates tasks with parallel execution
- **Specialized agents**: Handle specific concerns
- **Feedback loop**: Learns from corrections
- **Worktree isolation**: Parallel work without conflicts
- **OpenSpec integration**: Structured planning

### Agent Architecture

#### Orchestrator

**Location:** `.claude/agents/orchestrator.md`

**Responsibilities:**
1. Parse user requests into tasks
2. Build dependency graphs
3. Manage worktrees for parallel execution
4. Aggregate results
5. Trigger verification pipeline
6. Propagate fixes across MRs

**Parallel Execution Pattern:**
```
Wave 1: [independent tasks]     ← run simultaneously in separate worktrees
Wave 2: [dependent on wave 1]   ← run after wave 1 completes
Wave 3: [dependent on wave 2]   ← etc.
```

#### Task Executor

**Location:** `.claude/agents/task-executor.md`

**Responsibilities:**
1. Execute single tasks in worktree context
2. Follow specs and conventions
3. Return structured output
4. Report context for downstream tasks

#### Dependency Resolver

**Location:** `.claude/agents/dependency-resolver.md`

**Responsibilities:**
1. Parse task dependencies
2. Build directed acyclic graph
3. Detect circular dependencies
4. Compute optimal execution order
5. Detect potential merge conflicts

#### Feedback Listener

**Location:** `.claude/agents/feedback-listener.md`

**Responsibilities:**
1. Capture user corrections (conversation + MR comments)
2. Identify patterns for cross-worktree application
3. Propose spec updates
4. Maintain feedback log

#### MR Manager

**Location:** `.claude/agents/mr-manager.md`

**Responsibilities:**
1. Create MRs from worktree branches
2. Fetch and parse MR comments
3. Update branches with fixes
4. Handle merge conflicts

#### Verification Agents

**Build:** `.claude/agents/verify-build.md`
- Runs `npm run build`
- Reports errors with suggestions

**Accessibility:** `.claude/agents/verify-a11y.md`
- Checks semantic HTML
- Validates ARIA usage
- Reports issues with fixes

**SEO:** `.claude/agents/verify-seo.md`
- Checks meta tags
- Validates structure
- Reports recommendations

## Communication Protocol

### To Subagents

```markdown
## Task: <task-id>
## Context: <relevant context>
## Worktree: <path if applicable>
## Dependencies: <what this needs>
## Expected Output: <what to return>
```

### From Subagents

```markdown
## Status: completed|failed|blocked
## Output: <result>
## Context for downstream: <shared info>
## Issues: <any problems>
## Propagate: <fixes that may apply elsewhere>
```

## Dependency Graph Format

```json
{
  "tasks": {
    "task-1": {
      "status": "pending|in_progress|completed|blocked",
      "depends_on": [],
      "blocks": ["task-2"],
      "assigned_to": "agent-name",
      "worktree": "change-name",
      "output": null
    }
  },
  "execution_order": ["task-1", "task-2"]
}
```

## Verification Pipeline

After implementation tasks:

```
1. verify-build (blocking)
   ↓ pass
2. verify-a11y + verify-seo (parallel)
   ↓ aggregate
3. Report to user
```

## Feedback Loop

```
User: "Don't use X, do Y instead"
    ↓
Feedback Listener captures
    ↓
Extracts pattern signature
    ↓
Searches other worktrees for matches
    ↓
Applies fix to all matches
    ↓
Notifies user of all changes
    ↓
Logs for future reference
```

### Feedback Log Format

```json
{
  "entries": [
    {
      "id": "feedback-001",
      "timestamp": "2026-01-31T10:30:00Z",
      "source": "conversation|mr-comment",
      "user_said": "Don't use semicolons",
      "pattern": "css-formatting",
      "pattern_signature": "semicolon in CSS",
      "affected_worktrees": ["update-design", "dark-theme"],
      "affected_specs": ["astro-component"],
      "proposed_update": "Add rule",
      "status": "pending|applied|rejected|superseded"
    }
  ]
}
```

## State Management

Runtime state in `.claude/state/` (gitignored):

| File | Purpose |
|------|---------|
| current-task.json | Active task context |
| dependency-graph.json | Task dependencies |
| feedback-log.json | User corrections |
| worktrees.json | Active worktrees and MRs |
| context/*.json | Cross-task sharing |

## Worktree Workflow

Each OpenSpec change gets its own worktree:

```
/Users/dtodorovic/WebstormProjects/
├── todorovic/                    # Main repo
├── todorovic-add-ai-agents/      # Worktree for add-ai-agents
├── todorovic-update-design/      # Worktree for update-design
└── todorovic-dark-light-theme/   # Worktree for dark-light-theme
```

### Worktree Commands

| Command | Purpose |
|---------|---------|
| `/worktree list` | Show all active worktrees |
| `/worktree create <change>` | Create worktree for a change |
| `/worktree cleanup <change>` | Remove worktree after merge |
| `/worktree sync` | Pull latest main into all worktrees |
| `/worktree verify` | Check state matches reality |

## OpenSpec Integration

### Change Workflow

1. `/opsx:new feature` - Create change
2. `/opsx:continue` - Create artifacts
3. `/opsx:apply` - Implement in worktree
4. Review via WebStorm or GitHub MR
5. `/opsx:verify` - Run verification
6. Merge MR
7. `/opsx:archive` - Archive change

### Schema-Driven Artifacts

Each schema defines required artifacts:
- astro-component: spec → tasks
- astro-page: spec → tasks
- blog-content: outline → draft → review

## Best Practices

1. **Use OpenSpec** for non-trivial changes
2. **Give feedback** to improve (it propagates!)
3. **Review MRs** - comments get processed
4. **Let it parallelize** - worktrees enable speed
5. **Trust the verification** pipeline

---

## How It All Works (Detailed Explanation)

### The Problem It Solves

Right now, when you ask Claude to work on multiple things:
- It does them **one at a time**
- If you have 10 components to build, it builds them **sequentially**
- You wait, review one, wait, review another...

With a component library like react-kit, imagine you want to:
- Add Button component
- Add Input component
- Add Modal component
- Add Tooltip component
- Update documentation for all

That's 5 independent tasks. Today: sequential. With orchestration: **parallel**.

---

### Step-by-Step Flow

**1. You ask for work**
```
"Implement the 5 components from the proposals"
```

**2. Orchestrator analyzes**
```
Tasks identified:
- add-button (no dependencies)
- add-input (no dependencies)
- add-modal (no dependencies)
- add-tooltip (no dependencies)
- update-docs (depends on all above)

Execution plan:
Wave 1: button, input, modal, tooltip (parallel)
Wave 2: update-docs (after wave 1)
```

**3. Worktrees created**
```
react-kit/                    ← main repo (you're here)
react-kit-add-button/         ← worktree 1
react-kit-add-input/          ← worktree 2
react-kit-add-modal/          ← worktree 3
react-kit-add-tooltip/        ← worktree 4
```

Each worktree is a **complete copy** of the repo on a separate branch.

**4. Subagents work in parallel**

The orchestrator spawns 4 subagents (Task tool). Each:
- Works in its own worktree
- Follows the specs
- Commits locally (NO push yet)
- Reports completion

**5. You review locally**

Work stays local until you're ready. You can:
- Open worktree folders in WebStorm
- Review and give feedback
- Agent applies fixes across worktrees

**6. Feedback propagates**

You say: "Don't use `any` type, use proper generics"

The feedback-listener:
1. Logs to feedback-log.json
2. Searches other worktrees for `any` type
3. Finds it in worktree 2 and 3
4. Fixes all three
5. Tells you: "Fixed in add-button, also fixed in add-input (3 occurrences), add-modal (1 occurrence)"

**7. You control MR creation**

When YOU'RE ready:
```
/worktree push add-button
```
- Agent pushes branch
- Creates MR
- Now MR comments become another feedback channel

**8. Merge and cleanup**

After approval, MRs merge to main. Worktrees get cleaned up.

---

### The Key Insight

**Worktrees are the magic.** They let multiple "copies" of the repo exist simultaneously, each on a different branch. Without worktrees, parallel work would cause file conflicts.

**Developer control is essential.** MRs are NOT created automatically. Work stays local until you explicitly push. This prevents:
- Flood of half-baked MRs
- Polluted git history
- Uncontrollable code output

---

## Solutions for Hard Problems

### 1. Feedback Pattern Detection

**Problem**: Will the agent always capture my feedback?

**Solution**: Mandatory logging in agent specs.

Every agent MUST:
1. Log feedback immediately to feedback-log.json
2. Extract pattern signature (search/replace terms)
3. Check other worktrees for matches
4. Apply fixes everywhere
5. If fix is reverted later, update status

**On future tasks**: Agent checks feedback-log.json before writing code, applies known patterns proactively.

```json
{
  "id": "fb-001",
  "trigger": "user said: don't use any type",
  "pattern": {
    "type": "code-pattern",
    "search": ": any",
    "replace": "proper generic",
    "file_glob": "*.ts"
  },
  "applied_to": ["add-button", "add-input"],
  "status": "applied",
  "reverted": false
}
```

---

### 2. Merge Conflicts

**Problem**: What if two worktrees touch the same file?

**Solution**: Track file ownership in dependency-graph.json.

Before starting a task:
1. Get `files_will_touch` from task spec
2. Check all active worktrees' `files_touched`
3. If overlap:
   - Same file, different sections → allow parallel
   - Same file, same area → sequence tasks
   - Config file → always sequence
4. Update dependency graph with resolution

```json
{
  "conflicts": [
    {
      "file": "src/index.ts",
      "tasks": ["add-button", "add-input"],
      "resolution": "sequence",
      "order": ["add-button", "add-input"]
    }
  ]
}
```

---

### 3. Session Continuity

**Problem**: Claude sessions don't persist. How to resume tomorrow?

**Solution**: Three-layer state system.

**Layer 1: Orchestrator State** (`.claude/state/`, gitignored)
- orchestrator.json - session state
- dependency-graph.json - task tracking
- feedback-log.json - all patterns
- worktrees.json - worktree registry

**Layer 2: Per-Worktree State** (in each worktree, committed)
```
react-kit-add-button/.claude/worktree-state.json
```
```json
{
  "change": "add-button",
  "tasks_completed": ["create-component", "add-tests"],
  "tasks_remaining": ["add-docs"],
  "last_activity": "2026-01-31T10:00:00Z"
}
```

**Layer 3: OpenSpec Tasks** (source of truth, committed)
```markdown
## Tasks
- [x] Create Button component
- [x] Add unit tests
- [ ] Add documentation
```

**Recovery**: On session start, read all layers. tasks.md checkboxes are truth. Rebuild state from there.

---

### 4. Subagent Coordination

**Problem**: How do parallel subagents not step on each other?

**Solution**: Actor model - isolated workers + single coordinator.

With worktree isolation:
- Each subagent works in **separate directory**
- No file conflicts during work
- No shared mutable state during execution

| What | Who handles |
|------|-------------|
| Task sequencing | Orchestrator (dependency graph) |
| State updates | Orchestrator only (single writer) |
| File conflicts | Dependency resolver (pre-task) |
| Feedback propagation | Orchestrator (after task completes) |

Subagents are **isolated workers**: receive task, work, return result.
Orchestrator is **single coordinator**: reads state, makes decisions, dispatches, updates.

---

## Will It Work?

**Yes.** All the "hard problems" now have concrete solutions.

### All Problems Solved

| Problem | Solution | Status |
|---------|----------|--------|
| **Feedback patterns** | Subagent always logs to JSON. If applied and not reverted → stays in state. Future tasks check feedback-log.json proactively. | ✓ Solved |
| **Merge conflicts** | Dependency graph tracks `files_touched` and `files_will_touch`. Pre-task check for overlap. Sequence or allow based on conflict type. | ✓ Solved |
| **Session continuity** | Three-layer state: orchestrator JSON + per-worktree state + opsx tasks.md (committed truth). On session start, reconcile all layers. tasks.md is source of truth. | ✓ Solved |
| **Subagent coordination** | Non-issue with worktrees. Actor model: isolated workers + single coordinator. Each subagent works in separate directory, no shared mutable state. | ✓ Solved |
| **MR flood** | Developer-controlled push. Work stays local until `/worktree push`. | ✓ Solved |

### Confidence Levels

| Aspect | Confidence | Why |
|--------|------------|-----|
| Git worktrees | **High** | Standard git feature, well-tested |
| Parallel subagents | **High** | Claude Code's Task tool already does this |
| Developer-controlled MR | **High** | Just a command gate |
| Feedback logging | **High** | JSON write on every feedback, simple |
| Feedback propagation | **High** | grep + apply, straightforward |
| Dependency graph | **High** | JSON tracking, pre-task file check |
| Session recovery | **High** | tasks.md is committed, can always rebuild |
| State sync | **Medium-High** | Three layers with clear precedence |

### What's Left (True Edge Cases)

These are genuine edge cases, not blockers:

| Edge Case | Handling |
|-----------|----------|
| Very complex feedback ("restructure this pattern") | Ask user to clarify into concrete changes |
| Semantic conflicts (same area, different logic) | Show both, let developer decide |
| Massive main divergence | `/worktree sync` with manual conflict resolution |

### Bottom Line

**This will work because:**
1. Every "hard problem" has a concrete solution with JSON state
2. tasks.md (committed) is always the truth - can rebuild from there
3. Developer stays in control (local review, manual push)
4. Subagents are isolated (worktrees) - no coordination complexity
5. Simple patterns first, iterate on sophistication later
