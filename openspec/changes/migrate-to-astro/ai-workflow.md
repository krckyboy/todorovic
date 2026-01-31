# AI Workflow: todorovic Portfolio

## Overview

This project uses an AI-assisted development workflow with:
- **Orchestrator**: Coordinates tasks with parallel execution
- **Specialized agents**: Handle specific concerns
- **Feedback loop**: Learns from corrections
- **OpenSpec integration**: Structured planning

## Agent Architecture

### Orchestrator

**Location:** `.claude/agents/orchestrator.md`

**Responsibilities:**
1. Parse user requests into tasks
2. Build dependency graphs
3. Execute tasks in parallel where possible
4. Aggregate results
5. Trigger verification pipeline

**Parallel Execution Pattern:**
```
Wave 1: [independent tasks]     ← run simultaneously
Wave 2: [dependent on wave 1]   ← run after wave 1
Wave 3: [dependent on wave 2]   ← etc.
```

### Task Executor

**Location:** `.claude/agents/task-executor.md`

**Responsibilities:**
1. Execute single tasks
2. Follow specs and conventions
3. Return structured output
4. Report context for downstream tasks

### Dependency Resolver

**Location:** `.claude/agents/dependency-resolver.md`

**Responsibilities:**
1. Parse task dependencies
2. Build directed acyclic graph
3. Detect circular dependencies
4. Compute optimal execution order

### Feedback Listener

**Location:** `.claude/agents/feedback-listener.md`

**Responsibilities:**
1. Capture user corrections
2. Identify patterns
3. Propose spec updates
4. Maintain feedback log

### Verification Agents

**Build:** `.claude/agents/verify-build.md`
- Runs `npm run build`
- Reports errors with suggestions

**Accessibility:** `.claude/agents/verify-a11y.md`
- Checks semantic HTML
- Validates ARIA usage
- Reports issues with fixes

**SEO:** `.claude/agents/verify-seo.md`
- Checks meta tags
- Validates structure
- Reports recommendations

## Communication Protocol

### To Subagents

```markdown
## Task: <task-id>
## Context: <relevant context>
## Dependencies: <what this needs>
## Expected Output: <what to return>
```

### From Subagents

```markdown
## Status: completed|failed|blocked
## Output: <result>
## Context for downstream: <shared info>
## Issues: <any problems>
```

## Dependency Graph Format

```json
{
  "tasks": {
    "task-1": {
      "status": "pending|in_progress|completed|blocked",
      "depends_on": [],
      "blocks": ["task-2"],
      "assigned_to": "agent-name",
      "output": null
    }
  }
}
```

## Verification Pipeline

After implementation tasks:

```
1. verify-build (blocking)
   ↓ pass
2. verify-a11y + verify-seo (parallel)
   ↓ aggregate
3. Report to user
```

## Feedback Loop

```
User: "Don't use X, do Y instead"
    ↓
Feedback Listener captures
    ↓
Identifies pattern (one-off or recurring?)
    ↓
Finds relevant spec
    ↓
Proposes update
    ↓
User approves/rejects
    ↓
Apply to spec
```

### Feedback Log Format

```json
{
  "entries": [
    {
      "timestamp": "2024-01-15T10:30:00Z",
      "user_said": "Don't use semicolons",
      "pattern": "css-formatting",
      "affected_specs": ["astro-component"],
      "proposed_update": "Add rule",
      "status": "pending|applied|rejected"
    }
  ]
}
```

## Skills

| Skill | Usage | Purpose |
|-------|-------|---------|
| opsx-new | `/opsx-new name` | Start change |
| opsx-status | `/opsx-status` | Check progress |
| opsx-next | `/opsx-next` | Get next step |
| new-component | `/new-component Name` | Create component |
| new-page | `/new-page name` | Create page |
| new-post | `/new-post Title` | Create blog post |
| deploy | `/deploy` | Build and deploy |

## State Management

Runtime state in `.claude/state/`:

| File | Purpose |
|------|---------|
| current-task.json | Active task context |
| dependency-graph.json | Task dependencies |
| feedback-log.json | User corrections |
| context/*.json | Cross-task sharing |

## OpenSpec Integration

### Change Workflow

1. `/opsx-new feature` - Create change
2. Fill in artifacts per schema
3. `/opsx-next` - Get guidance
4. Implement tasks
5. Verify
6. `/opsx-archive` - Archive

### Schema-Driven Artifacts

Each schema defines required artifacts:
- astro-component: spec → tasks
- astro-page: spec → tasks
- blog-content: outline → draft → review

## Best Practices

1. **Use skills** for common tasks
2. **Use OpenSpec** for features
3. **Give feedback** to improve
4. **Check status** regularly
5. **Let it parallelize** for speed
