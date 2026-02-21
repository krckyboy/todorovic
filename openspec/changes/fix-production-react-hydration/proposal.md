> **STATUS: IN PROGRESS** as of February 21, 2026.

## Why

Production pages are throwing a React hydration error caused by server/client text and state mismatches in hydrated islands. This needs to be fixed now because it affects core navigation and blog filtering UX.

## What Changes

- Make header search shortcut rendering hydration-safe by removing server/client text divergence on first render.
- Make blog filter hydration-safe by avoiding URL-dependent state during initial render.
- Preserve existing UX behavior after hydration (platform shortcut label and URL-driven tag filters still work).
- Add verification steps focused on `/blog?tags=...` and header search on production builds.

## Capabilities

### New Capabilities

- `react-island-hydration`: Requirements for deterministic initial render and post-hydration client-only state updates in React islands.

### Modified Capabilities

- None.

## Impact

- **Affected files**: `src/modules/search/SearchBar.tsx`, `src/modules/blog/components/BlogFilter.tsx`.
- **Dependencies**: no new dependencies.
- **Behavioral impact**: no intentional UI changes beyond removing hydration failures.
