> **STATUS: COMPLETED (Pending Archive)** as of February 16, 2026.
> Source baseline: live `https://www.todorovic.dev/about` narrative structure.
> Scope note: image gallery parity is explicitly excluded for now.

## Why

The current Astro About page is concise but underrepresents the long-form personal narrative that exists on the live site. That narrative adds context for career transition, leadership growth, and personality, which improves trust and distinctiveness.

At the same time, full visual parity is not required. The prior redesign intentionally removed fragile gallery behavior, and this change should preserve that simplification.

## What Changes

- Add selective content parity with live `/about` section structure:
  - Introduction
  - Musical Background
  - Transition to Programming
  - Early Career
  - Leading
  - Interests
- Keep content concise and modernized rather than copying legacy text verbatim.
- Preserve current Astro UX improvements (clear contact CTA and internal wayfinding links).
- Keep the page free of gallery/image-grid requirements in this phase.

## Capabilities

### New Capabilities

- `about-content-parity`: A selective parity contract for About page narrative structure against the live site baseline.

### Modified Capabilities

- `portfolio-module`: About page content model expands from short bio-only format to structured long-form storytelling sections.

## Impact

- **Modified files (planned)**:
  - `src/pages/about.astro`
  - `src/styles/global.css` (only if additional shared typography tokens/utilities are needed)
- **OpenSpec artifacts**:
  - `openspec/changes/sync-live-about-parity/specs/portfolio-module/spec.md`
- **Dependencies**: none expected
- **Behavioral risk**: page can become too dense if section copy is not edited for scanability

## Out of Scope

- Re-introducing the old About image gallery/grid
- Reverting to older title positioning like "Senior JavaScript Developer | Team Leader"
- Full visual clone of the legacy Next.js `/about` layout
