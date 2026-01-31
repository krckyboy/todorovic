# Proposal: Add Worktree Workflow

> **STATUS: DRAFT** - Not for implementation in this project

## Problem

To enable parallel AI agent work without conflicts, we need git worktree infrastructure. Each OpenSpec change should run in its own worktree with its own branch and MR.

## Goals

1. Define worktree naming and location conventions
2. Create worktree lifecycle management (create, cleanup)
3. Integrate with OpenSpec change workflow
4. Enable parallel work on multiple changes

## Scope

### Worktree Conventions

```
Parent directory: ../ (sibling to main repo)
Naming: todorovic-<change-name>
Branch: <change-name>

Example:
/Users/dtodorovic/WebstormProjects/
├── todorovic/                    # Main repo (you work here)
├── todorovic-add-ai-agents/      # Worktree for add-ai-agents
├── todorovic-update-design/      # Worktree for update-design
└── todorovic-dark-light-theme/   # Worktree for dark-light-theme
```

### Lifecycle

**Create worktree** (when starting implementation):
```bash
# From main repo
git worktree add ../todorovic-<change-name> -b <change-name>
```

**Work in worktree**:
- Subagent executes tasks in worktree directory
- Commits and pushes to branch
- Creates MR when ready for review

**Cleanup** (after merge):
```bash
git worktree remove ../todorovic-<change-name>
git branch -d <change-name>
```

### Integration with OpenSpec

When `/opsx:apply` runs on a change:
1. Check if worktree exists for change
2. If not, create worktree and branch
3. Execute tasks in worktree context
4. Push and create MR when task batch complete

### State Tracking

Track worktrees in `.claude/state/worktrees.json` (see add-state-management proposal for schema).

## Review Workflow

### Option 1: WebStorm
- Open worktree folder as separate project
- Or use "Attach project" to view alongside main
- Edit directly, agent picks up changes

### Option 2: GitHub MR Comments
- Agent creates MR after implementation
- You add comments on GitHub
- Agent fetches comments: `gh pr view <n> --comments --json comments`
- Agent applies fixes, pushes, replies to comment

### Propagating Fixes

When you request a fix:
1. feedback-listener captures the request
2. Checks if similar pattern exists in other worktrees
3. If yes, applies fix there too
4. Notifies you: "Applied fix to MR #42, also propagated to MR #43, #44"

## Commands

New skill or command for worktree management:

| Command | Purpose |
|---------|---------|
| `/worktree list` | Show all active worktrees and their MR status |
| `/worktree create <change>` | Create worktree for a change |
| `/worktree cleanup <change>` | Remove worktree after merge |
| `/worktree sync` | Pull latest main into all worktrees |
| `/worktree verify` | Check state matches reality, repair if needed |

## Error Handling

### Creation Failures

| Scenario | Handling |
|----------|----------|
| Directory already exists | Check if it's a valid worktree; if yes, reuse; if no, prompt user |
| Branch already exists | Check if it's checked out elsewhere; if orphan, reuse |
| Disk space issue | Notify user, abort |
| Git not configured | Notify user with setup instructions |

### Cleanup Edge Cases

| Scenario | Handling |
|----------|----------|
| Uncommitted changes in worktree | Warn user, require `--force` or stash first |
| MR still open | Warn user, suggest merging or closing first |
| Directory manually deleted | Remove from state, clean up git worktree metadata with `git worktree prune` |
| Branch has unmerged commits | Warn user, require `--force` to delete |

### State Drift

| Scenario | Handling |
|----------|----------|
| Worktree exists but not in state | Add to state with `status: unknown`, prompt user |
| State says active but worktree missing | Mark as `abandoned`, prompt cleanup |
| MR merged externally | Update state to `merged`, prompt worktree cleanup |
| User manually creates worktree | Detect on next `/worktree list`, add to state |

### Recovery Commands

```bash
# Reconcile git worktree state
git worktree prune

# List actual worktrees (source of truth)
git worktree list

# Force remove problematic worktree
git worktree remove --force ../todorovic-<name>
```

## Sync Strategy

### Keeping Worktrees Updated

```bash
# In each worktree, periodically:
git fetch origin main
git rebase origin/main
# Or if conflicts: git merge origin/main
```

### Conflict Detection

Before starting work in a worktree:
1. Check if main has advanced
2. If yes, rebase/merge
3. If conflicts, notify user before proceeding

## Out of Scope

- Agent implementations (add-ai-agents proposal)
- State file infrastructure (add-state-management proposal)

## Dependencies

- add-state-management (for worktrees.json)
- Git must be configured with remote
- `gh` CLI must be authenticated

## References

- Git worktree docs: https://git-scm.com/docs/git-worktree
- Architecture spec: openspec/changes/migrate-to-astro/ai-workflow.md
