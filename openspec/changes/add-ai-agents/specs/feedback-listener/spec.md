# Spec: Feedback Listener Agent

> **STATUS: DRAFT** - Not for implementation in this project

## ADDED Requirements

### Requirement: Feedback capture

The feedback-listener SHALL capture user corrections from all sources.

#### Scenario: Conversation feedback
- **WHEN** user says "don't use X, use Y"
- **THEN** logs entry with source="conversation", user_said, timestamp

#### Scenario: MR comment feedback
- **WHEN** agent fetches MR comments containing corrections
- **THEN** logs entry with source="mr-comment", mr_number, user_said

---

### Requirement: Pattern extraction

The feedback-listener SHALL extract actionable patterns from feedback.

#### Scenario: Simple replacement
- **WHEN** user says "change X to Y"
- **THEN** extracts pattern with search="X", replace="Y"

#### Scenario: Prohibition pattern
- **WHEN** user says "don't use X"
- **THEN** extracts pattern with search="X", replace=null (flag for removal)

#### Scenario: File-specific pattern
- **WHEN** user mentions file type (*.css, *.ts)
- **THEN** extracts pattern with file_glob set accordingly

---

### Requirement: Pattern matching

The feedback-listener SHALL search for patterns in active worktrees.

#### Scenario: Exact match found
- **WHEN** searching for "var " and found in 3 files
- **THEN** returns list of files with line numbers

#### Scenario: No match found
- **WHEN** pattern not found in any worktree
- **THEN** returns empty list, logs "pattern not found elsewhere"

---

### Requirement: Fix application

The feedback-listener SHALL apply fixes to matching code.

#### Scenario: Auto-apply exact match
- **WHEN** pattern is exact string match
- **THEN** applies fix automatically, commits with message

#### Scenario: Suggest similar match
- **WHEN** pattern is similar but not exact
- **THEN** suggests fix to user, waits for confirmation

---

### Requirement: Fix notification

The feedback-listener SHALL notify user of all applied fixes.

#### Scenario: Single worktree fix
- **WHEN** fix applied to one worktree
- **THEN** reports "Fixed in <change-name>"

#### Scenario: Multi-worktree fix
- **WHEN** fix applied to multiple worktrees
- **THEN** reports "Fixed in <change-1>. Also fixed in <change-2> (N), <change-3> (M)"

---

### Requirement: Pattern persistence

The feedback-listener SHALL persist patterns for future use.

#### Scenario: New pattern logged
- **WHEN** feedback is processed
- **THEN** pattern saved to feedback-log.json with status="applied"

#### Scenario: Pattern reversion
- **WHEN** user reverts a fix
- **THEN** pattern status updated to "reverted"

#### Scenario: Future task check
- **WHEN** new task starts
- **THEN** agent checks feedback-log.json for applicable patterns
