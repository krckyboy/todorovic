# Spec: Worktree Commands

> **STATUS: DRAFT** - Not for implementation in this project

## ADDED Requirements

### Requirement: Worktree list command

The system SHALL provide `/worktree list` to show all active worktrees and their status.

#### Scenario: List with active worktrees
- **WHEN** user runs `/worktree list` with active worktrees
- **THEN** system displays table with change name, path, branch, MR number, status

#### Scenario: List with no worktrees
- **WHEN** user runs `/worktree list` with no worktrees
- **THEN** system displays "No active worktrees"

#### Scenario: List triggers verification
- **WHEN** user runs `/worktree list`
- **THEN** system verifies state matches disk and GitHub before displaying

---

### Requirement: Worktree create command

The system SHALL provide `/worktree create <change>` to create a worktree for a change.

#### Scenario: Create new worktree
- **WHEN** user runs `/worktree create add-button` and worktree doesn't exist
- **THEN** system runs `git worktree add ../<repo>-add-button -b add-button`
- **AND** registers worktree in state with status="active"

#### Scenario: Worktree already exists
- **WHEN** user runs `/worktree create add-button` and worktree exists
- **THEN** system displays "Worktree already exists" and shows path

#### Scenario: Directory exists but not worktree
- **WHEN** target directory exists but is not a git worktree
- **THEN** system prompts user to remove directory or choose different name

#### Scenario: Branch already exists
- **WHEN** branch exists but is not checked out
- **THEN** system reuses branch with `git worktree add ../<repo>-<change> <branch>`

---

### Requirement: Worktree push command

The system SHALL provide `/worktree push <change>` to push branch and create MR.

#### Scenario: Push and create MR
- **WHEN** user runs `/worktree push add-button` with unpushed commits
- **THEN** system runs `git push -u origin add-button`
- **AND** runs `gh pr create` with title and body
- **AND** updates state with MR number

#### Scenario: MR already exists
- **WHEN** user runs `/worktree push add-button` and MR already exists
- **THEN** system pushes updates to existing branch
- **AND** displays "Updated MR #<number>"

#### Scenario: Nothing to push
- **WHEN** user runs `/worktree push add-button` with no new commits
- **THEN** system displays "Nothing to push"

---

### Requirement: Worktree push-all command

The system SHALL provide `/worktree push-all` to push all ready worktrees.

#### Scenario: Multiple worktrees ready
- **WHEN** user runs `/worktree push-all` with 3 ready worktrees
- **THEN** system pushes each and creates MRs
- **AND** displays summary of all created MRs

#### Scenario: Some worktrees not ready
- **WHEN** some worktrees have uncommitted changes
- **THEN** system skips those and reports which were skipped

---

### Requirement: Worktree sync command

The system SHALL provide `/worktree sync` to update all worktrees with latest main.

#### Scenario: Clean rebase
- **WHEN** user runs `/worktree sync` and no conflicts
- **THEN** system runs `git fetch origin main && git rebase origin/main` in each worktree

#### Scenario: Rebase conflict
- **WHEN** rebase fails due to conflicts
- **THEN** system aborts rebase, tries merge, reports result

#### Scenario: Merge conflict
- **WHEN** both rebase and merge fail
- **THEN** system reports conflict and suggests manual resolution

---

### Requirement: Worktree cleanup command

The system SHALL provide `/worktree cleanup <change>` to remove worktree.

#### Scenario: Clean cleanup
- **WHEN** user runs `/worktree cleanup add-button` with merged MR
- **THEN** system runs `git worktree remove ../<repo>-add-button`
- **AND** runs `git branch -d add-button`
- **AND** removes from state

#### Scenario: Uncommitted changes
- **WHEN** worktree has uncommitted changes
- **THEN** system warns user and requires `--force` flag

#### Scenario: MR still open
- **WHEN** MR is not merged
- **THEN** system warns user and suggests merging or closing first

#### Scenario: Directory missing
- **WHEN** worktree directory doesn't exist
- **THEN** system runs `git worktree prune` and removes from state

---

### Requirement: Worktree verify command

The system SHALL provide `/worktree verify` to check and repair state.

#### Scenario: State matches reality
- **WHEN** all worktrees match state
- **THEN** system displays "All worktrees verified"

#### Scenario: Orphaned state entry
- **WHEN** state has entry but worktree missing
- **THEN** system marks as "abandoned" and prompts cleanup

#### Scenario: Untracked worktree
- **WHEN** worktree exists but not in state
- **THEN** system adds to state with status="unknown" and prompts user

#### Scenario: MR status drift
- **WHEN** MR merged on GitHub but state says "active"
- **THEN** system updates state to "merged"

---

### Requirement: Worktree naming convention

The system SHALL use consistent naming for worktrees.

#### Scenario: Worktree path
- **WHEN** creating worktree for change "add-button"
- **THEN** path is `../<repo-name>-add-button`

#### Scenario: Branch name
- **WHEN** creating worktree for change "add-button"
- **THEN** branch name is `add-button`

---

### Requirement: Developer-controlled MR creation

The system SHALL NOT create MRs automatically.

#### Scenario: Task completion
- **WHEN** all tasks complete in a worktree
- **THEN** system notifies developer but does NOT create MR

#### Scenario: Push required
- **WHEN** developer wants MR created
- **THEN** developer must run `/worktree push <change>`
