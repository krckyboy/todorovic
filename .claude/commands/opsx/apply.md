---
name: "OPSX: Apply"
description: Implement tasks from an OpenSpec change with inline spec verification
category: Workflow
tags: [workflow, apply, experimental, verification]
---

Implement tasks from an OpenSpec change with **inline verification** against project specs.

**Input**: Optionally specify a change name after `/opsx:apply` (e.g., `/opsx:apply add-auth`). If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

**Steps**

1. **Select the change**

   If a name is provided, use it. Otherwise:
   - Infer from conversation context if the user mentioned a change
   - Auto-select if only one active change exists
   - If ambiguous, run `openspec list --json` to get available changes and use the **AskUserQuestion tool** to let the user select

   Always announce: "Using change: <name>" and how to override (e.g., `/opsx:apply <other>`).

2. **Check status to understand the schema**
   ```bash
   openspec status --change "<name>" --json
   ```
   Parse the JSON to understand:
   - `schemaName`: The workflow being used (e.g., "astro-component")
   - Which artifact contains the tasks

3. **Load specs for inline verification**

   Read the schema file at `openspec/schemas/<schemaName>/schema.yaml`.
   Extract the `specs` array - these are the project specs that apply to this change.

   ```yaml
   # Example schema.yaml
   specs:
     - openspec/specs/astro-conventions/spec.md#components
     - openspec/specs/styling/spec.md
   ```

   **Pre-load spec content** so it's available during implementation.
   Note which specs apply to which file types:
   - `.astro` files → astro-conventions
   - `.css`, `.module.css` files → styling spec
   - `.tsx`, `.ts` files → relevant code conventions

4. **Get apply instructions**

   ```bash
   openspec instructions apply --change "<name>" --json
   ```

   This returns:
   - Context file paths (varies by schema)
   - Progress (total, complete, remaining)
   - Task list with status
   - Dynamic instruction based on current state

   **Handle states:**
   - If `state: "blocked"` (missing artifacts): show message, suggest using `/opsx:continue`
   - If `state: "all_done"`: congratulate, suggest archive
   - Otherwise: proceed to implementation

5. **Read context files**

   Read the files listed in `contextFiles` from the apply instructions output.
   The files depend on the schema being used.

6. **Show current progress**

   Display:
   - Schema being used
   - Specs loaded for verification
   - Progress: "N/M tasks complete"
   - Remaining tasks overview

7. **Implement tasks with inline verification (loop)**

   For each pending task:

   **a. Announce task**
   - Show which task is being worked on

   **b. Implement the code changes**
   - Make the code changes required
   - Keep changes minimal and focused

   **c. VERIFY IMMEDIATELY after writing each file**

   After creating or modifying a file, spawn a verification agent:

   ```
   Task agent prompt:
   "Verify this file against the spec. Report any violations.

   SPEC:
   <relevant spec content for this file type>

   FILE TO CHECK:
   <file path>
   <file content>

   Check EVERY rule in the spec. Report violations as:
   - [VIOLATION] <rule violated> - line <N>: <what's wrong>

   If compliant, report: [COMPLIANT] All rules followed."
   ```

   **d. Handle verification result**

   - If **COMPLIANT**: Mark task complete, continue to next task
   - If **VIOLATIONS found**:
     - Display violations to user
     - Fix the violations immediately
     - Re-verify after fixing
     - Only mark complete when compliant

   **e. Update task checkbox**: `- [ ]` → `- [x]`

   **Pause if:**
   - Task is unclear → ask for clarification
   - Implementation reveals a design issue → suggest updating artifacts
   - Error or blocker encountered → report and wait for guidance
   - Verification reveals unfixable issue → escalate

8. **On completion or pause, show status**

   Display:
   - Tasks completed this session
   - Files verified: N files, M violations fixed
   - Overall progress: "N/M tasks complete"
   - If all done: suggest archive
   - If paused: explain why and wait for guidance

**Inline Verification Rules**

For each file type, check against the appropriate spec:

**CSS/CSS Modules** (styling/spec.md):
- [ ] CSS custom properties used (not hardcoded values)
- [ ] Pseudo-selectors nested (`&:hover` inside class, not `.class:hover`)
- [ ] State modifiers nested (`&.active` inside class)
- [ ] Media queries nested inside classes
- [ ] Property order: Layout → Box Model → Typography → Visual → Effects
- [ ] Focus states on interactive elements (`:focus-visible`)

**Astro Components** (astro-conventions/spec.md):
- [ ] Props interface defined with TypeScript
- [ ] CSS Module imported correctly
- [ ] Semantic HTML elements used
- [ ] Accessibility attributes present (aria-label, role, etc.)
- [ ] class:list used for conditional classes

**React/TSX Components**:
- [ ] Proper TypeScript interfaces
- [ ] Hooks follow rules (top-level only)
- [ ] Accessibility attributes present

**Output During Implementation**

```
## Implementing: <change-name> (schema: <schema-name>)
Specs loaded: astro-conventions#components, styling

Working on task 3/7: Create Categories.astro
[...implementation...]
Created: src/components/Categories.astro

Verifying against astro-conventions#components...
✓ Props interface defined
✓ CSS Module imported
✓ Semantic HTML used
→ File compliant

Created: src/components/Categories.module.css

Verifying against styling/spec.md...
✗ [VIOLATION] Pseudo-selector not nested - line 29: `.link:hover` should be `&:hover`

Fixing violation...
[...fix applied...]

Re-verifying...
✓ All rules followed
→ File compliant

✓ Task complete (2 files verified, 1 violation fixed)

Working on task 4/7: ...
```

**Output On Completion**

```
## Implementation Complete

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 7/7 tasks complete ✓

### Verification Summary
- Files created/modified: 8
- Violations caught & fixed: 3
- All files spec-compliant ✓

### Completed This Session
- [x] Task 1 (2 files)
- [x] Task 2 (1 file)
...

All tasks complete! You can archive this change with `/opsx:archive`.
```

**Output On Pause (Issue Encountered)**

```
## Implementation Paused

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 4/7 tasks complete

### Issue Encountered
<description of the issue>

**Options:**
1. <option 1>
2. <option 2>
3. Other approach

What would you like to do?
```

**Guardrails**
- **ALWAYS verify after writing each file** - this is the key change from v1
- Fix violations before moving to next task
- Keep going through tasks until done or blocked
- Always read specs before starting implementation
- If task is ambiguous, pause and ask before implementing
- Keep code changes minimal and scoped to each task
- Update task checkbox only after verification passes
- Use contextFiles from CLI output, don't assume specific file names

**Fluid Workflow Integration**

This skill supports the "actions on a change" model:

- **Can be invoked anytime**: Before all artifacts are done (if tasks exist), after partial implementation
- **Inline verification**: Catches spec violations during implementation, not after
- **Self-correcting**: Automatically fixes violations before completing tasks
