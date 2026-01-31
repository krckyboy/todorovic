# Design: Add State Management

> **STATUS: DRAFT** - Not for implementation in this project

## Context

The orchestration system needs persistent state to:
- Track active tasks across agent sessions
- Remember user feedback patterns for propagation
- Coordinate parallel worktrees
- Resume work after session interruptions

Currently, Claude sessions are ephemeral. When a session ends, all context is lost. This design addresses that limitation.

## Goals / Non-Goals

**Goals:**
- Enable session continuity through persistent state files
- Track task dependencies for parallel execution
- Log feedback patterns for cross-worktree propagation
- Provide state verification and repair mechanisms

**Non-Goals:**
- Real-time synchronization between sessions
- Cloud-based state storage
- Automatic spec updates from feedback (future enhancement)
- Agent implementations (separate proposal)

## Decisions

### Decision 1: Local-only state (gitignored)

**Choice:** State files live in `.claude/state/`, gitignored

**Alternatives considered:**
- Committed state files → Rejected: constant commits, merge conflicts, noise
- Cloud storage → Rejected: complexity, latency, offline issues
- In-memory only → Rejected: loses state on session end

**Rationale:** State is runtime data, not source code. Each developer has their own state. The actual work product goes through PRs.

---

### Decision 2: JSON file format

**Choice:** Simple JSON files, one per concern

**Alternatives considered:**
- SQLite → Rejected: overkill, harder to inspect/debug
- Single monolithic file → Rejected: concurrent access issues
- YAML → Rejected: JSON better for programmatic access

**Rationale:** JSON is simple, inspectable, and easy to read/write from any context.

---

### Decision 3: Three-layer state system

**Choice:** Orchestrator state + per-worktree state + OpenSpec tasks.md

**Layers:**
1. `.claude/state/*.json` - Central orchestrator tracking (gitignored)
2. `<worktree>/.claude/worktree-state.json` - Per-worktree progress (committed)
3. `openspec/changes/<name>/tasks.md` - Source of truth (committed)

**Rationale:**
- Layer 1 can be rebuilt from layers 2 and 3
- Layer 3 (tasks.md) is always committed, survives total state loss
- Redundancy enables recovery from any failure mode

---

### Decision 4: Trust external reality over state

**Choice:** When git/GitHub differs from state, trust external reality

**Rationale:** Git and GitHub are the source of truth for worktrees and MRs. State files are just a cache. On drift, update state to match reality.

---

### Decision 5: Graceful degradation

**Choice:** Never block work due to state issues

**Alternatives considered:**
- Strict validation → Rejected: would block work on corruption
- Ignore errors → Rejected: could lead to inconsistent state

**Rationale:** State is a convenience, not a requirement. If state is missing or corrupt, recreate it. Log the issue but continue working.

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| State file corruption | Medium - could lose task tracking | Backup corrupt file, create fresh, log error |
| State drift from reality | Low - could show wrong status | Verify on session start, trust git/GitHub |
| Concurrent writes | Low - race conditions | Orchestrator is single writer for central state |
| Disk space for logs | Low - could grow | Auto-prune old entries after 30 days |

## File Structure

```
.claude/state/                    # Gitignored
├── current-task.json             # Active task context
├── dependency-graph.json         # Task dependencies
├── feedback-log.json             # User feedback patterns
├── worktrees.json                # Worktree registry
└── context/
    ├── shared.json               # Global preferences
    └── <change-name>.json        # Per-change context
```

## State Lifecycle

```
Session Start:
1. Check if .claude/state/ exists, create if not
2. Read all state files
3. Verify against git/GitHub reality
4. Repair any drift
5. Report status to user

During Work:
1. Update state on task start/complete
2. Log feedback immediately
3. Sync worktree state with central state

Session End:
1. Final state write
2. State persists for next session

Recovery:
1. If state missing → create empty
2. If state corrupt → backup, create fresh
3. If drift detected → trust reality, update state
4. Ultimate fallback → rebuild from tasks.md checkboxes
```

## Open Questions

1. **Pruning strategy**: How long to keep old feedback entries? 30 days proposed.
2. **Conflict resolution**: If two sessions update state simultaneously, last-write-wins acceptable?
3. **Encryption**: Should feedback-log.json be encrypted if it contains user corrections?

## References

- Proposal: ./proposal.md
- Master architecture: openspec/changes/migrate-to-astro/ai-workflow.md
