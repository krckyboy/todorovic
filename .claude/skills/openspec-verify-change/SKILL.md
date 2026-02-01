---
name: openspec-verify-change
description: Verify implementation matches change artifacts. Use when the user wants to validate that implementation is complete, correct, and coherent before archiving.
license: MIT
compatibility: Requires openspec CLI.
metadata:
  author: openspec
  version: "2.0"
  generatedBy: "1.1.1"
---

Verify that an implementation matches the change artifacts (specs, tasks, design).

**Input**: Optionally specify a change name. If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

**Steps**

1. **If no change name provided, prompt for selection**

   Run `openspec list --json` to get available changes. Use the **AskUserQuestion tool** to let the user select.

   Show changes that have implementation tasks (tasks artifact exists).
   Include the schema used for each change if available.
   Mark changes with incomplete tasks as "(In Progress)".

   **IMPORTANT**: Do NOT guess or auto-select a change. Always let the user choose.

2. **Check status to understand the schema**
   ```bash
   openspec status --change "<name>" --json
   ```
   Parse the JSON to understand:
   - `schemaName`: The workflow being used (e.g., "astro-component")
   - Which artifacts exist for this change

3. **Load schema and extract referenced specs**

   Read the schema file at `openspec/schemas/<schemaName>/schema.yaml`.
   Extract the `specs` array - these are the project specs that apply to this change.

   Example schema.yaml:
   ```yaml
   specs:
     - openspec/specs/astro-conventions/spec.md#components
     - openspec/specs/styling/spec.md
   ```

4. **Identify implemented files**

   Read the change's tasks.md to identify what files were created/modified.
   Also check the change directory for any delta specs.

   Build a list of:
   - Implemented source files (e.g., `src/components/Skills.tsx`)
   - Delta specs (if any) in `openspec/changes/<name>/specs/`

5. **Spawn parallel verification agents (one per spec)**

   For EACH spec referenced in the schema, spawn a Task agent with:

   ```
   Agent prompt:
   "You are a spec compliance verifier. Your task is to check if the implemented code follows the spec.

   SPEC TO VERIFY AGAINST:
   <read and include the full spec content>

   FILES TO CHECK:
   <list of implemented files with their content>

   INSTRUCTIONS:
   1. Read through the spec carefully
   2. For each rule/requirement in the spec:
      - Check if the implemented files follow it
      - Note any violations with specific file:line references
   3. Return a structured report:

   ## Spec: <spec name>

   ### Violations Found
   - [CRITICAL] <description> - `file.tsx:123`
   - [WARNING] <description> - `file.css:45`

   ### Compliant
   - <rule that was followed correctly>

   ### N/A
   - <rules that don't apply to these files>

   Be thorough but fair. Only flag actual violations, not stylistic preferences."
   ```

   **IMPORTANT**: Launch ALL spec agents in parallel using multiple Task tool calls in a single message.

6. **Verify task completion (main agent)**

   While agents run, verify task completion:
   - Read tasks.md
   - Parse checkboxes: `- [ ]` (incomplete) vs `- [x]` (complete)
   - Count complete vs total tasks

7. **Collect agent results**

   Wait for all spec verification agents to complete.
   Aggregate their findings into a unified report.

8. **Generate Unified Verification Report**

   **Summary Scorecard**:
   ```
   ## Verification Report: <change-name>

   ### Summary
   | Dimension        | Status              |
   |------------------|---------------------|
   | Tasks            | X/Y complete        |
   | Spec Compliance  | N specs checked     |
   | Critical Issues  | M violations        |
   | Warnings         | P issues            |
   ```

   **Issues by Spec**:

   For each spec that had violations:
   ```
   ### <spec-name>

   **CRITICAL**:
   - <violation> - `file:line`

   **WARNING**:
   - <issue> - `file:line`
   ```

   **Aggregated Issues by Priority**:

   1. **CRITICAL** (Must fix before archive):
      - All critical violations from all specs
      - Incomplete tasks
      - Each with file:line reference

   2. **WARNING** (Should fix):
      - All warnings from all specs
      - Each with file:line reference

   3. **SUGGESTION** (Nice to fix):
      - Pattern improvements
      - Minor issues

   **Final Assessment**:
   - If CRITICAL issues: "X critical issue(s) found. Fix before archiving."
   - If only warnings: "No critical issues. Y warning(s) to consider. Ready for archive."
   - If all clear: "All checks passed. Ready for archive."

**Parallel Agent Guidelines**

- Spawn 1 agent per spec file/section
- If spec has sections (e.g., `spec.md#components`), only verify that section
- Each agent should read the actual implemented files, not just search
- Agents should report specific line numbers where violations occur
- Use `subagent_type: "general-purpose"` for spec verification agents

**Example Agent Invocations**

For a change using `astro-component` schema with specs:
- `openspec/specs/astro-conventions/spec.md#components`
- `openspec/specs/styling/spec.md`

Spawn 2 parallel agents:

```
Task 1: "Verify against astro-conventions#components"
- Read spec section on components
- Check all .astro files created
- Report violations

Task 2: "Verify against styling spec"
- Read full styling spec
- Check all .css/.module.css files created
- Report violations (e.g., missing nesting for pseudo-selectors)
```

**Specific Checks per Common Spec**

**styling/spec.md**:
- CSS custom properties used (not hardcoded values)
- Pseudo-selectors nested (`&:hover` inside class, not `.class:hover`)
- Media queries nested inside classes
- Property order follows convention
- Focus states present on interactive elements

**astro-conventions/spec.md#components**:
- Props interface defined
- CSS Module imported correctly
- Semantic HTML used
- Accessibility attributes present

**Output Format**

Use clear markdown with:
- Table for summary scorecard
- Grouped sections per spec
- Code references in format: `file.ts:123`
- Specific, actionable recommendations
- Severity indicators: [CRITICAL], [WARNING], [SUGGESTION]
