# Tasks: Add Worktree Workflow

> **STATUS: DRAFT** - Not for implementation in this project

## 1. Setup

- [ ] 1.1 Define worktree naming convention in config
- [ ] 1.2 Create `.claude/commands/worktree/` directory for commands
- [ ] 1.3 Ensure add-state-management is implemented first

## 2. Core Utilities

- [ ] 2.1 Implement `getWorktreePath(changeName)`
- [ ] 2.2 Implement `getBranchName(changeName)`
- [ ] 2.3 Implement `worktreeExists(changeName)` using `git worktree list`
- [ ] 2.4 Implement `branchExists(branchName)` using `git branch --list`

## 3. Worktree List Command

- [ ] 3.1 Create `/worktree list` command file
- [ ] 3.2 Implement worktree discovery via `git worktree list --porcelain`
- [ ] 3.3 Correlate with state from worktrees.json
- [ ] 3.4 Fetch MR status via `gh pr list --json`
- [ ] 3.5 Display formatted table with status indicators

## 4. Worktree Create Command

- [ ] 4.1 Create `/worktree create` command file
- [ ] 4.2 Validate change name (kebab-case, exists in openspec)
- [ ] 4.3 Check for existing worktree or directory conflicts
- [ ] 4.4 Run `git worktree add` with appropriate flags
- [ ] 4.5 Register in worktrees.json via state management
- [ ] 4.6 Handle npm install if package.json exists

## 5. Worktree Push Command

- [ ] 5.1 Create `/worktree push` command file
- [ ] 5.2 Validate worktree exists and has commits
- [ ] 5.3 Check if MR already exists for branch
- [ ] 5.4 Run `git push -u origin <branch>`
- [ ] 5.5 Run `gh pr create` with title/body from change
- [ ] 5.6 Update state with MR number
- [ ] 5.7 Display MR URL

## 6. Worktree Push-All Command

- [ ] 6.1 Create `/worktree push-all` command file
- [ ] 6.2 Get list of active worktrees from state
- [ ] 6.3 Filter to those with unpushed commits
- [ ] 6.4 Run push for each (with error handling)
- [ ] 6.5 Display summary of created MRs

## 7. Worktree Sync Command

- [ ] 7.1 Create `/worktree sync` command file
- [ ] 7.2 Run `git fetch origin main` in main repo
- [ ] 7.3 For each worktree, attempt `git rebase origin/main`
- [ ] 7.4 On rebase failure, attempt `git merge origin/main`
- [ ] 7.5 On merge failure, report conflict details
- [ ] 7.6 Display summary of sync results

## 8. Worktree Cleanup Command

- [ ] 8.1 Create `/worktree cleanup` command file
- [ ] 8.2 Check for uncommitted changes (require --force)
- [ ] 8.3 Check MR status (warn if open)
- [ ] 8.4 Run `git worktree remove`
- [ ] 8.5 Run `git branch -d` (or -D with --force)
- [ ] 8.6 Remove from worktrees.json
- [ ] 8.7 Handle missing directory gracefully

## 9. Worktree Verify Command

- [ ] 9.1 Create `/worktree verify` command file
- [ ] 9.2 Compare `git worktree list` with worktrees.json
- [ ] 9.3 Compare `gh pr list` with MR numbers in state
- [ ] 9.4 Mark orphaned entries as abandoned
- [ ] 9.5 Add untracked worktrees to state
- [ ] 9.6 Update stale MR statuses
- [ ] 9.7 Run `git worktree prune` to clean metadata

## 10. Integration with OpenSpec

- [ ] 10.1 Modify `/opsx:apply` to check for worktree
- [ ] 10.2 Auto-create worktree if not exists on apply
- [ ] 10.3 Execute tasks in worktree context
- [ ] 10.4 Prompt for push after task batch completes

## 11. Error Handling

- [ ] 11.1 Handle git command failures gracefully
- [ ] 11.2 Handle gh CLI authentication errors
- [ ] 11.3 Handle disk space issues
- [ ] 11.4 Log all operations for debugging

## 12. Documentation

- [ ] 12.1 Document all /worktree commands
- [ ] 12.2 Add worktree workflow to CLAUDE.md
- [ ] 12.3 Document common troubleshooting scenarios

## 13. Testing

- [ ] 13.1 Test worktree create on fresh system
- [ ] 13.2 Test push and MR creation
- [ ] 13.3 Test sync with and without conflicts
- [ ] 13.4 Test cleanup in various states
- [ ] 13.5 Test verify and state repair
