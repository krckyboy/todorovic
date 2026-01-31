# Design: Add AI Agents

> **STATUS: DRAFT** - Not for implementation in this project

## Context

The orchestration system needs specialized agents to handle different concerns:
- **Orchestrator**: Central coordinator
- **Task executors**: Work in isolated worktrees
- **Feedback listener**: Capture and propagate corrections
- **Verification agents**: Check build, accessibility, SEO

This design defines the agent architecture, communication protocol, and coordination patterns.

## Goals / Non-Goals

**Goals:**
- Define agent roles and responsibilities
- Establish communication protocol between agents
- Enable parallel task execution via subagents
- Enable feedback pattern detection and propagation
- Provide verification pipeline

**Non-Goals:**
- ML-based pattern detection (start simple)
- Multi-session orchestration (single session scope)
- Custom agent training

## Decisions

### Decision 1: Actor model for coordination

**Choice:** Orchestrator as single coordinator, subagents as isolated workers

**Alternatives considered:**
- Peer-to-peer communication → Rejected: complex, race conditions
- Shared state during work → Rejected: conflicts, hard to debug
- Fully autonomous agents → Rejected: coordination chaos

**Rationale:** Actor model is proven, simple, and avoids coordination complexity. Subagents receive task, work, return result. Orchestrator handles all coordination.

---

### Decision 2: Markdown-based communication protocol

**Choice:** Structured markdown for task dispatch and results

**Alternatives considered:**
- JSON messages → Rejected: less readable for debugging
- Function calls → Rejected: too rigid for varied tasks
- Free-form text → Rejected: hard to parse reliably

**Rationale:** Markdown is readable, flexible, and can be parsed reliably with section headers.

---

### Decision 3: Keyword-based feedback detection

**Choice:** Extract pattern signatures from feedback using keywords and string matching

**Alternatives considered:**
- ML/NLP classification → Rejected: overkill for v1, complexity
- Manual tagging → Rejected: burden on user
- No propagation → Rejected: misses key value

**Rationale:** Simple string matching handles 80% of cases ("don't use X" → search for X). Can iterate to more sophisticated detection later.

---

### Decision 4: Verification as post-task pipeline

**Choice:** Run verification agents after task completion, before MR push

**Alternatives considered:**
- Inline verification → Rejected: slows task execution
- Post-merge verification → Rejected: too late to fix
- Optional verification → Rejected: quality would vary

**Rationale:** Verification gate ensures quality before code leaves worktree.

---

### Decision 5: Agent files as markdown specs

**Choice:** Agent definitions stored as `.claude/agents/<name>.md`

**Alternatives considered:**
- JSON config → Rejected: less expressive for instructions
- Code files → Rejected: not needed, markdown is sufficient
- Database → Rejected: overkill

**Rationale:** Markdown agent files can contain instructions, examples, and be read by the Task tool.

## Agent Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     ORCHESTRATOR                                │
│  - Reads state on session start                                 │
│  - Dispatches tasks to subagents                                │
│  - Collects results and updates state                           │
│  - Coordinates feedback propagation                             │
│  - Triggers verification pipeline                               │
└─────────────────────────────────────────────────────────────────┘
         │
         ├──→ task-executor (per worktree)
         │    └─→ Works in worktree, returns result
         │
         ├──→ feedback-listener
         │    └─→ Parses feedback, extracts patterns
         │
         ├──→ mr-manager
         │    └─→ Creates MRs, fetches comments
         │
         └──→ verify-* (build, a11y, seo)
              └─→ Runs checks, returns issues
```

## Communication Protocol

### Task Dispatch (Orchestrator → Subagent)

```markdown
## Task: <task-id>
## Change: <change-name>
## Worktree: <path>
## Context: <relevant info from state>
## Known Patterns: <feedback patterns to apply>
## Files Reserved: <files this task owns>
## Dependencies Completed: <outputs from upstream>
## Expected Output: <what to return>
```

### Task Result (Subagent → Orchestrator)

```markdown
## Status: completed|failed|blocked
## Output: <result description>
## Files Touched: <actual files modified>
## New Patterns: <any feedback received during task>
## Context for downstream: <info for next tasks>
## Issues: <problems encountered>
```

## Feedback Detection Algorithm

```
1. CAPTURE
   - User says: "don't use X, use Y instead"
   - Log to feedback-log.json immediately

2. EXTRACT PATTERN
   - Keywords: "don't use", "always", "change X to Y"
   - search: "X"
   - replace: "Y"
   - file_glob: infer from context (*.ts, *.css, etc.)

3. SEARCH WORKTREES
   - For each active worktree:
     - grep -r "X" <worktree>/src/
   - Classify matches:
     - Exact: same string → auto-apply
     - Similar: related code → suggest, ask user

4. APPLY
   - Make replacements in all matching files
   - Commit with message referencing feedback

5. NOTIFY
   - "Fixed in add-button. Also fixed in add-input (3), add-modal (1)"

6. LOG
   - Update feedback-log.json with affected_worktrees, status="applied"
```

## Verification Pipeline

```
After task completion, before MR push:

1. verify-build
   └─→ npm run build
   └─→ If fail: report errors, block push

2. verify-a11y (parallel with seo)
   └─→ Check semantic HTML
   └─→ Validate ARIA
   └─→ Report issues

3. verify-seo (parallel with a11y)
   └─→ Check meta tags
   └─→ Validate structure
   └─→ Report recommendations

4. Aggregate results
   └─→ If blocking issues: report, require fix
   └─→ If warnings only: report, allow push
```

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Subagent timeout | Medium - task stuck | Timeout with retry, then mark blocked |
| False pattern match | Low - wrong fix applied | Require exact match for auto-apply |
| Verification too slow | Medium - delays workflow | Parallelize, cache where possible |
| Agent file errors | Low - task fails | Validate agent files on load |

## Open Questions

1. **Subagent timeout**: How long before marking task blocked? 5 minutes proposed.
2. **Verification scope**: Run all verifiers on all changes, or scope to affected areas?
3. **Pattern confidence**: Threshold for auto-apply vs suggest?

## References

- Proposal: ./proposal.md
- State management: ../add-state-management/proposal.md
- Worktree workflow: ../add-worktree-workflow/proposal.md
- Master architecture: openspec/changes/migrate-to-astro/ai-workflow.md
