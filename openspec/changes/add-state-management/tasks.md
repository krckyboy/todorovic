# Tasks: Add State Management

> **STATUS: DRAFT** - Not for implementation in this project

## 1. Setup

- [ ] 1.1 Verify `.claude/state/` is in `.gitignore`
- [ ] 1.2 Create `.claude/state/` directory structure
- [ ] 1.3 Create `.claude/state/context/` subdirectory

## 2. State File Schemas

- [ ] 2.1 Create `current-task.json` with empty/default structure
- [ ] 2.2 Create `dependency-graph.json` with empty tasks object
- [ ] 2.3 Create `feedback-log.json` with empty entries array
- [ ] 2.4 Create `worktrees.json` with empty worktrees object
- [ ] 2.5 Create `context/shared.json` with empty preferences

## 3. State Read/Write Utilities

- [ ] 3.1 Implement `readStateFile(filename)` with graceful fallback
- [ ] 3.2 Implement `writeStateFile(filename, data)` with error handling
- [ ] 3.3 Implement `ensureStateDir()` to create directory if missing
- [ ] 3.4 Handle corrupt JSON (backup and recreate)

## 4. Current Task Tracking

- [ ] 4.1 Implement `setCurrentTask(taskInfo)`
- [ ] 4.2 Implement `getCurrentTask()`
- [ ] 4.3 Implement `clearCurrentTask()`
- [ ] 4.4 Auto-update `updated_at` on any change

## 5. Dependency Graph

- [ ] 5.1 Implement `addTask(taskId, taskInfo)`
- [ ] 5.2 Implement `addDependency(taskId, dependsOnId)`
- [ ] 5.3 Implement `computeExecutionOrder()` (topological sort)
- [ ] 5.4 Implement circular dependency detection
- [ ] 5.5 Implement `getNextExecutableTasks()` (no blockers)

## 6. Feedback Logging

- [ ] 6.1 Implement `logFeedback(userSaid, pattern, signature)`
- [ ] 6.2 Implement `updateFeedbackStatus(id, status)`
- [ ] 6.3 Implement `getActiveFeedbackPatterns()`
- [ ] 6.4 Implement `searchFeedbackByPattern(signature)`

## 7. Worktree Registry

- [ ] 7.1 Implement `registerWorktree(changeName, path, branch)`
- [ ] 7.2 Implement `updateWorktreeMR(changeName, mrNumber)`
- [ ] 7.3 Implement `updateWorktreeStatus(changeName, status)`
- [ ] 7.4 Implement `getActiveWorktrees()`
- [ ] 7.5 Implement `getWorktreeByChange(changeName)`

## 8. Context Management

- [ ] 8.1 Implement `getSharedContext()`
- [ ] 8.2 Implement `addUserPreference(preference, fromFeedbackId)`
- [ ] 8.3 Implement `getChangeContext(changeName)`
- [ ] 8.4 Implement `updateChangeContext(changeName, updates)`

## 9. State Verification

- [ ] 9.1 Implement `verifyWorktreesMatchDisk()` using `git worktree list`
- [ ] 9.2 Implement `verifyMRsMatchGitHub()` using `gh pr list`
- [ ] 9.3 Implement `repairDrift()` to sync state with reality
- [ ] 9.4 Implement `runVerificationOnStart()` as session init step

## 10. State Recovery

- [ ] 10.1 Implement `rebuildFromTasksMd()` as ultimate fallback
- [ ] 10.2 Implement `backupCorruptState(filename)`
- [ ] 10.3 Implement `createFreshState(filename)`
- [ ] 10.4 Add logging for all recovery actions

## 11. Integration

- [ ] 11.1 Add state initialization to orchestrator startup
- [ ] 11.2 Add state cleanup to session end
- [ ] 11.3 Document state file locations and formats
- [ ] 11.4 Add state debug command (`/state show`, `/state verify`)

## 12. Testing

- [ ] 12.1 Test state creation on fresh system
- [ ] 12.2 Test recovery from missing files
- [ ] 12.3 Test recovery from corrupt JSON
- [ ] 12.4 Test drift detection and repair
- [ ] 12.5 Test graceful degradation when state unavailable
