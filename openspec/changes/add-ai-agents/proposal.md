# Proposal: Add AI Agents

> **STATUS: DRAFT** - Not for implementation in this project

## Problem

To enable parallel task execution, verification, and feedback loops, we need specialized agents. The `.claude/agents/` directory doesn't exist yet.

## Goals

1. Create the agent infrastructure in `.claude/agents/`
2. Implement all planned agents
3. Enable parallel task execution via orchestrator using git worktrees
4. Enable automated verification pipeline
5. Enable feedback loop with MR comment integration
6. Enable cross-worktree fix propagation

## Scope

### Core Agents

| Agent | Purpose |
|-------|---------|
| orchestrator.md | Coordinate tasks, manage worktrees, build dependency graphs, execute in parallel waves, propagate fixes |
| task-executor.md | Execute single tasks in worktrees following specs and conventions |
| dependency-resolver.md | Parse dependencies, build DAG, compute optimal execution order, detect potential merge conflicts |
| feedback-listener.md | Capture user corrections from conversation AND MR comments, identify patterns, propagate fixes |
| mr-manager.md | Create MRs (on developer request), fetch comments, update branches, handle merge conflicts |

### Verification Agents

| Agent | Purpose |
|-------|---------|
| verify-build.md | Run `npm run build`, report errors with suggestions |
| verify-a11y.md | Check semantic HTML, validate ARIA, report accessibility issues |
| verify-seo.md | Check meta tags, validate structure, report SEO recommendations |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     ORCHESTRATOR (main session)                 │
│  - Tracks all changes, dependencies, worktrees                  │
│  - Dispatches work to subagents                                 │
│  - Coordinates feedback-listener                                │
│  - Propagates fixes across worktrees                            │
│  - MRs created ONLY when developer requests                     │
└─────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
   ┌──────────┐         ┌──────────┐         ┌──────────┐
   │ Worktree │         │ Worktree │         │ Worktree │
   │ change-a │         │ change-b │         │ change-c │
   │ (local)  │         │ (local)  │         │ (has MR) │
   └──────────┘         └──────────┘         └──────────┘
                                                   │
                                                   ▼
                                             ┌──────────┐
                                             │   MR #1  │
                                             └──────────┘
                                                   │
                                                   ▼
                                                main
```

## Developer-Controlled MR Creation

**MRs are NOT created automatically.** Work stays local until developer explicitly requests.

### Workflow

1. **Work phase** (automatic):
   - Subagents work in worktrees
   - Commits happen locally
   - No push, no MR

2. **Review phase** (developer-initiated):
   - Developer opens worktree in WebStorm
   - Reviews changes locally
   - Gives feedback, agent applies fixes

3. **MR phase** (developer-initiated):
   ```
   Developer: "/worktree push add-button"
   ```
   - Agent pushes branch
   - Creates MR
   - Now MR comments become another feedback channel

### Commands

| Command | What happens |
|---------|--------------|
| `/worktree push <change>` | Push branch, create MR |
| `/worktree push-all` | Push all ready worktrees |
| `/worktree status` | Show which are local vs have MRs |

### Why This Matters

- **Control**: You decide when code is ready for MR
- **Quality**: Review locally first, fix issues before MR
- **Noise reduction**: No flood of half-baked MRs
- **Flexibility**: Can abandon worktree without closing MR

---

## Solutions for Hard Problems

### 1. Feedback Pattern Detection (SOLVED)

**The question**: Will subagent always listen to prompts?

**Answer**: Yes. Every subagent has access to the conversation. The key is **discipline in the agent spec**.

**Solution**: Mandatory feedback logging

When ANY agent receives user feedback:

```markdown
## Agent Spec Rule: Feedback Capture

When user provides correction/preference:
1. IMMEDIATELY log to feedback-log.json
2. Apply the fix
3. If fix is reverted later, update status to "reverted"
4. If fix sticks, status remains "applied"
```

**feedback-log.json entry**:
```json
{
  "id": "fb-001",
  "timestamp": "2026-01-31T10:00:00Z",
  "source": "conversation",
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

**On future tasks**: Agent checks feedback-log.json before writing code, applies known patterns proactively.

---

### 2. Merge Conflicts (SOLVED via Dependency Graph)

**Solution**: Track file ownership in dependency-graph.json

```json
{
  "tasks": {
    "add-button": {
      "status": "in_progress",
      "worktree": "react-kit-add-button",
      "files_touched": [
        "src/components/Button/Button.tsx",
        "src/components/Button/Button.test.tsx",
        "src/components/Button/index.ts"
      ],
      "files_will_touch": [
        "src/index.ts"
      ]
    },
    "add-input": {
      "status": "pending",
      "worktree": "react-kit-add-input",
      "files_will_touch": [
        "src/components/Input/Input.tsx",
        "src/index.ts"
      ]
    }
  },
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

**Conflict Detection Logic**:

```
Before starting task:
1. Get files_will_touch from task spec
2. Check all active worktrees' files_touched
3. If overlap:
   a. If same file, different sections → allow parallel
   b. If same file, same area → sequence tasks
   c. If config file → always sequence
4. Update dependency graph with resolution
```

**Conflict Prevention Commands**:
- `/conflicts show` - List potential conflicts
- `/conflicts resolve <task> after <task>` - Manual sequencing

---

### 3. Session Continuity (SOLVED via Layered State)

**Problem**: Claude sessions don't persist. How to resume?

**Solution**: Three-layer state system

#### Layer 1: Orchestrator State (`.claude/state/`)
Central tracking, gitignored:
```
.claude/state/
├── orchestrator.json      # Current session state
├── dependency-graph.json  # Task dependencies + file tracking
├── feedback-log.json      # All feedback patterns
└── worktrees.json         # Worktree registry
```

#### Layer 2: Per-Worktree State (in each worktree)
Each worktree tracks its own progress:
```
react-kit-add-button/
└── .claude/
    └── worktree-state.json
```

```json
{
  "change": "add-button",
  "tasks_completed": ["create-component", "add-tests"],
  "tasks_remaining": ["add-docs"],
  "current_task": null,
  "last_activity": "2026-01-31T10:00:00Z",
  "feedback_applied": ["fb-001", "fb-003"]
}
```

#### Layer 3: OpenSpec Tasks (source of truth)
The `tasks.md` in each change is the canonical task list:
```markdown
## Tasks

- [x] Create Button component
- [x] Add unit tests
- [ ] Add documentation
```

**Sync Protocol**:

```
On session start:
1. Read .claude/state/orchestrator.json
2. For each worktree in worktrees.json:
   a. Check if directory exists
   b. Read worktree-state.json
   c. Read openspec tasks.md
   d. Reconcile: tasks.md is truth, update state to match
3. Report status to user
4. Ask: "Continue from where we left off?"
```

**On task completion**:
```
1. Update worktree-state.json (local)
2. Update tasks.md checkbox (local)
3. Update orchestrator state (central)
4. Commit worktree-state.json + tasks.md
```

**Recovery from crash**:
```
1. tasks.md checkboxes show what's done
2. worktree-state.json shows last activity
3. Orchestrator rebuilds state from these
4. Worst case: re-read all worktrees, rebuild
```

---

### 4. Subagent Coordination (NON-ISSUE with Worktrees)

**Why it's not a problem**:

With worktree isolation:
- Each subagent works in **separate directory**
- No file conflicts during work
- No shared mutable state during execution

**The only coordination needed**:

| What | Who handles | How |
|------|-------------|-----|
| Task sequencing | Orchestrator | Dependency graph |
| State updates | Orchestrator only | Single writer |
| File conflicts | Dependency resolver | Pre-task analysis |
| Feedback propagation | Orchestrator | After task completes |

**Rule**: Subagents are **isolated workers**. They:
- Receive task + context
- Work in their worktree
- Return result
- Don't communicate with each other directly

Orchestrator is the **single coordinator**. It:
- Reads all state
- Makes decisions
- Dispatches tasks
- Collects results
- Updates state

This is the **actor model** - simple and proven.

---

## Communication Protocol

**To subagents:**
```markdown
## Task: <task-id>
## Change: <change-name>
## Worktree: <path>
## Context: <relevant context from orchestrator state>
## Known Patterns: <feedback patterns to apply>
## Files Reserved: <files this task owns>
## Dependencies Completed: <outputs from upstream tasks>
## Expected Output: <what to return>
```

**From subagents:**
```markdown
## Status: completed|failed|blocked
## Output: <result>
## Files Touched: <actual files modified>
## New Patterns: <any user feedback received>
## Context for downstream: <shared info>
## Issues: <any problems>
```

---

## Verification Pipeline

After implementation tasks (before MR):

```
1. verify-build (blocking)
   ↓ pass
2. verify-a11y + verify-seo (parallel, if applicable)
   ↓ aggregate
3. Report to developer
4. Developer decides: fix issues or push MR
```

---

## Error Handling

### Agent Failures

| Scenario | Handling |
|----------|----------|
| Subagent crashes mid-task | State saved in worktree-state.json, can resume |
| Subagent times out | Retry once, check worktree-state for partial progress |
| Subagent returns error | Log error, mark task blocked, notify developer |

### State Recovery

| Scenario | Handling |
|----------|----------|
| Orchestrator state lost | Rebuild from worktree states + tasks.md files |
| Worktree state lost | Rebuild from tasks.md checkboxes + git log |
| Both lost | tasks.md is source of truth, start fresh from there |

### Conflict Recovery

| Scenario | Handling |
|----------|----------|
| Merge conflict on push | Show conflict, let developer resolve or rebase |
| Two worktrees diverged | Developer decides merge order |
| Main advanced significantly | `/worktree sync` to rebase all |

---

## Out of Scope

- State management files (add-state-management proposal)
- Worktree infrastructure setup (add-worktree-workflow proposal)
- Changes to existing opsx commands

## Dependencies

- add-state-management (for tracking state) - must be implemented first
- add-worktree-workflow (for worktree infrastructure) - must be implemented first

## Implementation Order

1. add-state-management (foundational)
2. add-worktree-workflow (depends on state)
3. add-ai-agents (depends on both)

## References

- Architecture spec: openspec/changes/migrate-to-astro/ai-workflow.md
