# Tasks: Add AI Agents

> **STATUS: DRAFT** - Not for implementation in this project

## 1. Setup

- [ ] 1.1 Create `.claude/agents/` directory
- [ ] 1.2 Ensure add-state-management is implemented
- [ ] 1.3 Ensure add-worktree-workflow is implemented

## 2. Orchestrator Agent

- [ ] 2.1 Create `.claude/agents/orchestrator.md` with role and instructions
- [ ] 2.2 Implement session initialization logic
- [ ] 2.3 Implement state reading and verification on start
- [ ] 2.4 Implement task dispatch via Task tool
- [ ] 2.5 Implement result collection and state updates
- [ ] 2.6 Implement wave-based execution for dependency graph
- [ ] 2.7 Implement feedback coordination hooks

## 3. Task Executor Agent

- [ ] 3.1 Create `.claude/agents/task-executor.md` with role and instructions
- [ ] 3.2 Define input format (task dispatch protocol)
- [ ] 3.3 Define output format (result protocol)
- [ ] 3.4 Implement worktree-aware execution context
- [ ] 3.5 Implement pattern application from Known Patterns
- [ ] 3.6 Implement files-touched tracking

## 4. Dependency Resolver Agent

- [ ] 4.1 Create `.claude/agents/dependency-resolver.md`
- [ ] 4.2 Implement dependency graph parsing
- [ ] 4.3 Implement topological sort for execution order
- [ ] 4.4 Implement circular dependency detection
- [ ] 4.5 Implement file conflict detection across worktrees

## 5. Feedback Listener Agent

- [ ] 5.1 Create `.claude/agents/feedback-listener.md`
- [ ] 5.2 Implement feedback capture from conversation
- [ ] 5.3 Implement MR comment fetching via `gh api`
- [ ] 5.4 Implement pattern extraction (keyword-based)
- [ ] 5.5 Implement worktree search via grep
- [ ] 5.6 Implement fix application with commit
- [ ] 5.7 Implement multi-worktree notification format
- [ ] 5.8 Implement feedback-log.json updates

## 6. MR Manager Agent

- [ ] 6.1 Create `.claude/agents/mr-manager.md`
- [ ] 6.2 Implement MR creation via `gh pr create`
- [ ] 6.3 Implement comment fetching via `gh pr view --comments`
- [ ] 6.4 Implement comment reply via `gh pr comment`
- [ ] 6.5 Implement branch push logic
- [ ] 6.6 Handle existing MR detection

## 7. Verification Agents

- [ ] 7.1 Create `.claude/agents/verify-build.md`
- [ ] 7.2 Implement `npm run build` execution and parsing
- [ ] 7.3 Implement error extraction and suggestion
- [ ] 7.4 Create `.claude/agents/verify-a11y.md`
- [ ] 7.5 Implement semantic HTML checks
- [ ] 7.6 Implement ARIA validation
- [ ] 7.7 Implement focus state verification
- [ ] 7.8 Create `.claude/agents/verify-seo.md`
- [ ] 7.9 Implement meta tag checks
- [ ] 7.10 Implement heading structure validation
- [ ] 7.11 Implement image alt text checks

## 8. Communication Protocol

- [ ] 8.1 Document task dispatch format
- [ ] 8.2 Document result format
- [ ] 8.3 Create protocol validation helper
- [ ] 8.4 Add protocol examples to agent files

## 9. Verification Pipeline

- [ ] 9.1 Implement pipeline orchestration (build → a11y+seo)
- [ ] 9.2 Implement result aggregation
- [ ] 9.3 Implement blocking vs warning logic
- [ ] 9.4 Add verification to post-task hooks

## 10. Feedback Pattern Detection

- [ ] 10.1 Implement keyword extraction ("don't use", "change X to Y")
- [ ] 10.2 Implement file glob inference
- [ ] 10.3 Implement exact vs similar match classification
- [ ] 10.4 Implement auto-apply for exact matches
- [ ] 10.5 Implement suggest-and-confirm for similar matches

## 11. Error Handling

- [ ] 11.1 Implement subagent timeout handling
- [ ] 11.2 Implement GitHub API error handling
- [ ] 11.3 Implement graceful degradation for missing agents
- [ ] 11.4 Add comprehensive logging

## 12. Integration

- [ ] 12.1 Connect orchestrator to /opsx:apply workflow
- [ ] 12.2 Connect feedback-listener to conversation
- [ ] 12.3 Connect verification to pre-push hooks
- [ ] 12.4 Document full workflow in CLAUDE.md

## 13. Testing

- [ ] 13.1 Test orchestrator session init
- [ ] 13.2 Test parallel task dispatch
- [ ] 13.3 Test feedback capture and propagation
- [ ] 13.4 Test verification pipeline
- [ ] 13.5 Test error recovery scenarios
