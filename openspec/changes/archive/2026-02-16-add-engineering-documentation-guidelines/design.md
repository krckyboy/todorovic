## Context

The repo already has strong specification assets in OpenSpec, but practical workflow docs and AI guidance were not consolidated into one discoverable documentation surface. The user asked for both engineering documentation and AI working guidelines similar to successful patterns from `react-kit`, but tailored to this repo.

## Goals / Non-Goals

**Goals:**

- Make engineering guidance easy to discover and use from README/AGENTS.
- Keep OpenSpec as formal source of truth while documenting practical implementation workflow.
- Define Codex-first AI workflow expectations and validation gates.
- Keep context usage lean with on-demand documentation loading.

**Non-Goals:**

- Introducing a full new test framework in this change.
- Refactoring runtime feature code.
- Introducing Claude-specific synchronization requirements.

## Decisions

### 1. Split docs into `documentation/` with focused files

Each doc covers one concern and links to specs where formal requirements already exist.

### 2. Keep OpenSpec/specs as normative source of truth

`documentation/` provides operational guidance; OpenSpec remains formal requirements and proposal tracking.

### 3. Do not add project-level skills for now

Keep workflow guidance in `AGENTS.md` and `documentation/` only.

Rationale:

- avoids redundant instruction surfaces
- keeps maintenance cost lower
- keeps context policy explicit: read docs on demand only

### 4. Module convention explicitly disallows separate `hooks/` folder

Hook-like reusable logic goes under `services/` to align with user preference and current direction.

## Risks / Trade-offs

- **Risk:** docs can drift from specs over time.
  - **Mitigation:** cross-link specs and keep AGENTS “read spec first” rule.
- **Risk:** too many docs may increase context usage.
  - **Mitigation:** keep AGENTS as a router and load docs on demand by task.
