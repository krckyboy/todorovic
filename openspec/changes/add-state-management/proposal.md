# Proposal: Add State Management

> **STATUS: DRAFT** - Not for implementation in this project

## Problem

To enable agent coordination across sessions and track feedback patterns, we need runtime state files in `.claude/state/`.

## Design Decision

**State is local-only** (gitignored). Reasons:
- Runtime/session data, not source code
- Changes constantly during work
- Actual changes go through PRs in worktrees
- Each developer/session has own state

## Goals

1. Implement state file infrastructure
2. Enable cross-task context sharing
3. Enable feedback logging and pattern recognition
4. Enable dependency tracking for parallel execution

## Scope

### State Files

| File | Purpose |
|------|---------|
| current-task.json | Active task context - what's being worked on |
| dependency-graph.json | Task dependencies for parallel execution |
| feedback-log.json | User corrections for spec improvement |
| worktrees.json | Active worktrees and their MRs |

### Context Directory

| File | Purpose |
|------|---------|
| context/shared.json | Cross-task shared information (e.g., user preferences discovered) |
| context/<change-name>.json | Per-change context that persists across tasks |

## File Formats

### current-task.json
```json
{
  "task_id": "string",
  "change_name": "string",
  "description": "string",
  "status": "pending|in_progress|completed|blocked",
  "assigned_to": "agent-name",
  "started_at": "ISO timestamp",
  "updated_at": "ISO timestamp",
  "context": {}
}
```

### dependency-graph.json
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

### feedback-log.json
```json
{
  "entries": [
    {
      "id": "feedback-001",
      "timestamp": "ISO timestamp",
      "source": "conversation|mr-comment",
      "mr_number": 42,
      "user_said": "correction text",
      "pattern": "pattern-name",
      "pattern_signature": "hash or keywords for matching",
      "affected_specs": ["spec-names"],
      "affected_worktrees": ["change-names"],
      "proposed_update": "description",
      "status": "pending|applied|rejected|superseded"
    }
  ]
}
```

### worktrees.json
```json
{
  "worktrees": {
    "change-name": {
      "path": "../todorovic-change-name",
      "branch": "change-name",
      "mr": 42,
      "status": "active|merged|abandoned",
      "created": "ISO timestamp",
      "lastActivity": "ISO timestamp",
      "lastVerified": "ISO timestamp"
    }
  }
}
```

### context/shared.json
```json
{
  "user_preferences": {
    "discovered": [
      {
        "preference": "no semicolons in CSS",
        "discovered_at": "ISO timestamp",
        "from_feedback": "feedback-001"
      }
    ]
  },
  "common_patterns": {}
}
```

### context/<change-name>.json
```json
{
  "change_name": "add-ai-agents",
  "decisions_made": [],
  "files_touched": [],
  "notes": []
}
```

## State Verification & Repair

### Verify State Matches Reality
Run on session start or when state seems stale:

```bash
# Check worktrees.json matches actual git worktrees
git worktree list --porcelain

# Check MR status matches GitHub
gh pr list --json number,state,headRefName
```

### Repair Logic
1. **Orphaned state entry**: Worktree in JSON but not on disk → mark as `abandoned`
2. **Untracked worktree**: Worktree on disk but not in JSON → add entry with `status: unknown`
3. **Stale MR status**: MR merged on GitHub but state says `active` → update to `merged`
4. **Missing state file**: File doesn't exist → create with empty/default structure

### Auto-Cleanup
Worktrees marked `merged` or `abandoned` for >7 days:
- Prompt user to cleanup
- Or auto-cleanup with `git worktree remove`

## Error Handling

### File Operations
- **Read fails**: Create default empty structure, log warning
- **Write fails**: Retry once, then notify user of disk issue
- **Corrupt JSON**: Backup corrupt file, create fresh, log error

### State Drift
- **Git reality differs from state**: Trust git, update state to match
- **MR reality differs from state**: Trust GitHub, update state to match
- Always log drift for debugging

### Recovery
- State files are gitignored, so loss is acceptable
- Agents should handle missing state gracefully (recreate)
- Never block work due to state issues - degrade gracefully

## Out of Scope

- Agent implementations (add-ai-agents proposal)
- Automatic spec updates from feedback (future enhancement)

## Dependencies

None - this is foundational infrastructure.

## Dependents

- add-ai-agents (agents use state files)
- add-worktree-workflow (worktree commands read/write state)

## References

- Architecture spec: openspec/changes/migrate-to-astro/ai-workflow.md
