## 1. OpenSpec Artifacts

- [x] 1.1 Create `openspec/changes/add-engineering-documentation-guidelines/.openspec.yaml`
- [x] 1.2 Create `proposal.md` with why/what/impact
- [x] 1.3 Create `design.md` with goals and decisions

## 2. Documentation Structure

- [x] 2.1 Add `documentation/engineering-workflow.md`
- [x] 2.2 Integrate AI-assisted workflow guidance into `documentation/engineering-workflow.md` (single workflow doc)
- [x] 2.3 Add `documentation/modules-and-services.md`
- [x] 2.4 Add `documentation/validation-and-quality-gates.md`
- [x] 2.5 Update `documentation/README.md` index and OpenSpec links
- [x] 2.6 Remove `documentation/testing-strategy.md` (deferred until real test stack is introduced)

## 3. Top-Level Docs Alignment

- [x] 3.1 Update `README.md` to point to docs/specs clearly
- [x] 3.2 Update `AGENTS.md` to reference docs and conventions
- [x] 3.3 Ensure no separate `hooks/` folder convention remains in project guidance

## 4. Context and Instruction Hygiene

- [x] 4.1 Keep `AGENTS.md` as an on-demand routing file
- [x] 4.2 Remove `.agents/skills` from the repository
- [x] 4.3 Keep AI workflow guidance inside `documentation/engineering-workflow.md` (no separate AI workflow file)

## 5. Tracker Sync

- [x] 5.1 Add this proposal to `openspec/specs/open-proposals/spec.md`
- [x] 5.2 Keep status/progress synced with `tasks.md`

## 6. Verification

- [x] 6.1 Run `npm run lint`
- [x] 6.2 Run `npm run build`
