# Spec: Orchestrator Agent

> **STATUS: DRAFT** - Not for implementation in this project

## ADDED Requirements

### Requirement: Session initialization

The orchestrator SHALL initialize state on session start.

#### Scenario: Fresh session
- **WHEN** orchestrator starts with no prior state
- **THEN** creates default state files and reports "Ready"

#### Scenario: Existing state
- **WHEN** orchestrator starts with existing state
- **THEN** reads state, verifies against reality, reports status

#### Scenario: State recovery needed
- **WHEN** state is corrupted or missing
- **THEN** rebuilds from tasks.md files in worktrees

---

### Requirement: Task dispatch

The orchestrator SHALL dispatch tasks to subagents using the communication protocol.

#### Scenario: Independent tasks
- **WHEN** multiple tasks have no dependencies
- **THEN** dispatches all in parallel via Task tool

#### Scenario: Dependent tasks
- **WHEN** task-2 depends on task-1
- **THEN** waits for task-1 completion before dispatching task-2

#### Scenario: Task with context
- **WHEN** dispatching task to subagent
- **THEN** includes worktree path, known patterns, and upstream outputs

---

### Requirement: Result collection

The orchestrator SHALL collect and process subagent results.

#### Scenario: Successful completion
- **WHEN** subagent returns status="completed"
- **THEN** updates state, triggers next tasks in dependency order

#### Scenario: Task failure
- **WHEN** subagent returns status="failed"
- **THEN** logs error, marks task blocked, notifies user

#### Scenario: New patterns discovered
- **WHEN** subagent reports new feedback patterns
- **THEN** propagates patterns to other active worktrees

---

### Requirement: Dependency graph management

The orchestrator SHALL maintain and execute the dependency graph.

#### Scenario: Wave execution
- **WHEN** tasks are organized in waves
- **THEN** executes wave N completely before starting wave N+1

#### Scenario: Dynamic task addition
- **WHEN** new task is added during execution
- **THEN** inserts into correct position based on dependencies

---

### Requirement: Feedback coordination

The orchestrator SHALL coordinate feedback propagation across worktrees.

#### Scenario: Feedback received
- **WHEN** user provides feedback in any context
- **THEN** delegates to feedback-listener for pattern extraction

#### Scenario: Pattern propagation
- **WHEN** pattern is extracted and confirmed
- **THEN** applies to all matching code in active worktrees

---

### Requirement: Verification triggering

The orchestrator SHALL trigger verification pipeline after task completion.

#### Scenario: Task batch complete
- **WHEN** a batch of related tasks completes
- **THEN** triggers verify-build, then parallel verify-a11y and verify-seo

#### Scenario: Verification failure
- **WHEN** verify-build fails
- **THEN** blocks MR push, reports issues to user
