> **STATUS: BACKLOG** as of February 14, 2026.
> This is a performance optimization follow-up; not yet started.

## Why

The site currently hydrates React islands in the header on every page load, which pulls in a shared client runtime even when users never use search or theme toggling. This is a good candidate for progressive enhancement because the core navigation is already static.

## What Changes

- Convert always-on header interactivity to progressive enhancement with minimal client JavaScript.
- Reduce default JavaScript shipped for non-blog and low-interaction page visits.
- Keep keyboard-accessible search and theme switching behavior, but load heavy logic only when interaction occurs.
- Add explicit performance verification steps (bundle diff before/after and page-level JS budget checks).

## Capabilities

### New Capabilities

- `header-interactivity-performance`: Progressive enhancement contract for theme toggle and search so core navigation remains fully functional with minimal baseline JS.

### Modified Capabilities

- `astro-conventions`: Add performance-oriented guidance for hydration directives and default-to-static behavior in shared layout/header UI.

## Impact

- **Affected files**: `src/components/Header.astro`, `src/modules/search/SearchBar.tsx`, `src/modules/theme/views/ThemeToggle.tsx`, `src/layouts/BaseLayout.astro`, and related styles.
- **Potential new files**: lightweight client scripts under `src/modules/search/` and `src/modules/theme/` (if split out of React components).
- **Dependencies**: no required new dependencies.
- **Behavioral risk**: keyboard/focus behavior for the search modal must remain intact after refactor.
