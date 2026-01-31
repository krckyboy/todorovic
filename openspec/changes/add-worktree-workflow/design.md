# Design: Add Worktree Workflow

> **STATUS: DRAFT** - Not for implementation in this project

## Context

Parallel AI agent work requires isolated environments. Git worktrees provide this by allowing multiple checkouts of the same repository in separate directories, each on a different branch.

Without worktrees, parallel work would cause file conflicts. With worktrees, each change gets its own complete working copy.

## Goals / Non-Goals

**Goals:**
- Enable parallel work on multiple changes
- Provide clear worktree lifecycle (create, work, cleanup)
- Integrate with OpenSpec change workflow
- Support developer review via WebStorm or GitHub MR

**Non-Goals:**
- Automatic MR creation (developer-controlled)
- Cross-worktree file sharing during work
- Remote worktree hosting

## Decisions

### Decision 1: Sibling directory placement

**Choice:** Worktrees placed as siblings to main repo: `../<repo>-<change-name>/`

**Alternatives considered:**
- Subdirectory of main repo → Rejected: confusing, nested git issues
- Separate parent folder → Rejected: adds configuration complexity
- Temporary directory → Rejected: hard to find, easy to lose

**Rationale:** Sibling placement is intuitive, easy to navigate in file browser, and follows common worktree conventions.

---

### Decision 2: Branch naming matches change name

**Choice:** Branch name = change name (kebab-case)

**Alternatives considered:**
- Prefixed branches (feature/X) → Rejected: adds noise, OpenSpec already namespaces
- Random/generated names → Rejected: hard to correlate with changes

**Rationale:** Direct mapping makes it obvious which branch belongs to which change.

---

### Decision 3: Developer-controlled MR creation

**Choice:** MRs only created when developer explicitly runs `/worktree push`

**Alternatives considered:**
- Auto-create MR on task completion → Rejected: floods with half-baked MRs
- Auto-create MR on worktree creation → Rejected: premature, nothing to review

**Rationale:** Developer reviews locally first, pushes when ready. This prevents MR pollution and gives developer control over timing.

---

### Decision 4: Rebase-first sync strategy

**Choice:** When syncing with main, try rebase first, fall back to merge

**Alternatives considered:**
- Always merge → Rejected: creates messy history
- Always rebase → Rejected: can fail on conflicts
- Never sync → Rejected: divergence causes larger conflicts later

**Rationale:** Rebase keeps history clean. If it fails, merge is safe fallback. Developer can resolve conflicts manually.

---

### Decision 5: State verification on list

**Choice:** `/worktree list` verifies state matches disk and GitHub

**Rationale:** Lazy verification catches drift when user actually cares about status, not on every operation.

## Risks / Trade-offs

| Risk | Impact | Mitigation |
|------|--------|------------|
| Disk space for multiple worktrees | Medium - each is full repo copy | Document space requirements, auto-cleanup merged worktrees |
| Developer forgets to cleanup | Low - orphaned directories | `/worktree list` shows stale worktrees, periodic prompts |
| Branch conflicts with existing | Low - name collision | Check before create, suggest alternative |
| npm/dependencies per worktree | Medium - each needs node_modules | Document, consider shared cache |

## Worktree Lifecycle

```
1. CREATE (on /opsx:apply or /worktree create)
   └─→ git worktree add ../<repo>-<change> -b <change>
   └─→ Register in worktrees.json
   └─→ npm install (if needed)

2. WORK (subagent executes tasks)
   └─→ Work in worktree directory
   └─→ Commit locally
   └─→ Update worktree-state.json

3. REVIEW (developer-initiated)
   └─→ Developer opens in WebStorm or reviews diff
   └─→ Provides feedback
   └─→ Agent applies fixes

4. PUSH (on /worktree push)
   └─→ git push -u origin <branch>
   └─→ gh pr create
   └─→ Update worktrees.json with MR number

5. MERGE (on GitHub)
   └─→ Developer merges MR
   └─→ Verification detects merge
   └─→ Updates state to "merged"

6. CLEANUP (on /worktree cleanup or auto)
   └─→ git worktree remove ../<repo>-<change>
   └─→ git branch -d <change>
   └─→ Remove from worktrees.json
```

## Command Design

| Command | Args | Behavior |
|---------|------|----------|
| `/worktree list` | none | List all worktrees with status, verify state |
| `/worktree create <change>` | change name | Create worktree if not exists |
| `/worktree push <change>` | change name | Push branch, create MR |
| `/worktree push-all` | none | Push all ready worktrees |
| `/worktree sync` | none | Rebase all worktrees on main |
| `/worktree cleanup <change>` | change name | Remove worktree and branch |
| `/worktree verify` | none | Full state verification and repair |

## Open Questions

1. **npm install strategy**: Run automatically on create, or prompt user?
2. **IDE integration**: Can we open worktree in WebStorm programmatically?
3. **Stale worktree threshold**: How long before prompting cleanup? 7 days proposed.

## References

- Proposal: ./proposal.md
- State management: ../add-state-management/proposal.md
- Master architecture: openspec/changes/migrate-to-astro/ai-workflow.md
