# Spec: State Files

> **STATUS: DRAFT** - Not for implementation in this project

## ADDED Requirements

### Requirement: State directory exists

The system SHALL create `.claude/state/` directory if it does not exist on session start.

#### Scenario: First session
- **WHEN** orchestrator starts and `.claude/state/` does not exist
- **THEN** system creates the directory with default empty state files

#### Scenario: Subsequent session
- **WHEN** orchestrator starts and `.claude/state/` exists
- **THEN** system reads existing state files

---

### Requirement: Current task tracking

The system SHALL maintain `current-task.json` to track the active task context.

#### Scenario: Task started
- **WHEN** a task is assigned to an agent
- **THEN** `current-task.json` is updated with task_id, change_name, description, status="in_progress", assigned_to, started_at, updated_at

#### Scenario: Task completed
- **WHEN** an agent completes a task
- **THEN** `current-task.json` is updated with status="completed" and updated_at

#### Scenario: No active task
- **WHEN** no task is in progress
- **THEN** `current-task.json` contains null or empty task_id

---

### Requirement: Dependency graph tracking

The system SHALL maintain `dependency-graph.json` to track task dependencies and execution order.

#### Scenario: Tasks with dependencies
- **WHEN** task-2 depends on task-1
- **THEN** `dependency-graph.json` shows task-1 in task-2's `depends_on` array and task-2 in task-1's `blocks` array

#### Scenario: Execution order computation
- **WHEN** dependency graph is updated
- **THEN** `execution_order` array reflects valid topological order

#### Scenario: Circular dependency detected
- **WHEN** adding a dependency would create a cycle
- **THEN** system rejects the dependency and logs error

---

### Requirement: Feedback logging

The system SHALL maintain `feedback-log.json` to capture user corrections and patterns.

#### Scenario: User provides feedback
- **WHEN** user says "don't use X, use Y"
- **THEN** system logs entry with id, timestamp, source, user_said, pattern, pattern_signature, status="pending"

#### Scenario: Feedback applied
- **WHEN** agent applies a feedback fix
- **THEN** entry status updated to "applied", affected_worktrees populated

#### Scenario: Feedback reverted
- **WHEN** user reverses a previous feedback
- **THEN** entry status updated to "reverted"

---

### Requirement: Worktree registry

The system SHALL maintain `worktrees.json` to track active worktrees and their MRs.

#### Scenario: Worktree created
- **WHEN** a new worktree is created for a change
- **THEN** `worktrees.json` adds entry with path, branch, status="active", created timestamp

#### Scenario: MR created
- **WHEN** developer pushes worktree and creates MR
- **THEN** entry updated with mr number

#### Scenario: MR merged
- **WHEN** MR is merged on GitHub
- **THEN** entry status updated to "merged"

#### Scenario: Worktree abandoned
- **WHEN** worktree exists in state but not on disk
- **THEN** entry status updated to "abandoned"

---

### Requirement: Context sharing

The system SHALL maintain `context/` directory for cross-task information sharing.

#### Scenario: Shared preferences
- **WHEN** user preference is discovered from feedback
- **THEN** `context/shared.json` is updated with preference and source feedback id

#### Scenario: Per-change context
- **WHEN** agent makes decisions or touches files for a change
- **THEN** `context/<change-name>.json` is updated with decisions_made, files_touched

---

### Requirement: State verification

The system SHALL verify state matches external reality on session start.

#### Scenario: Worktree drift
- **WHEN** worktree exists on disk but not in `worktrees.json`
- **THEN** system adds entry with status="unknown" and prompts user

#### Scenario: MR drift
- **WHEN** MR is merged on GitHub but state shows "active"
- **THEN** system updates state to "merged"

#### Scenario: Orphaned entry
- **WHEN** state entry exists but worktree directory is missing
- **THEN** system marks entry as "abandoned"

---

### Requirement: State repair

The system SHALL repair corrupted or missing state gracefully.

#### Scenario: Missing state file
- **WHEN** a state file does not exist
- **THEN** system creates it with empty/default structure

#### Scenario: Corrupt JSON
- **WHEN** a state file contains invalid JSON
- **THEN** system backs up corrupt file as `.corrupt`, creates fresh file, logs warning

#### Scenario: Read failure
- **WHEN** file read fails (permissions, etc.)
- **THEN** system logs error and continues with empty state

---

### Requirement: Graceful degradation

The system SHALL never block work due to state issues.

#### Scenario: State unavailable
- **WHEN** state cannot be read or written
- **THEN** system logs warning and continues without state persistence

#### Scenario: Recovery from total loss
- **WHEN** all state files are missing
- **THEN** system rebuilds from `tasks.md` checkboxes in worktrees

---

### Requirement: State is gitignored

The system SHALL ensure `.claude/state/` is in `.gitignore`.

#### Scenario: Initial setup
- **WHEN** state directory is created
- **THEN** `.gitignore` contains `.claude/state/` entry

#### Scenario: Verification
- **WHEN** state files are modified
- **THEN** git status does not show them as changed
