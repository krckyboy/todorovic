## Context

The site uses Astro with React islands (`client:load`). Hydration fails when initial client render differs from SSR output. Two islands currently rely on browser-only state during initial render: search shortcut platform detection and blog filter URL query parsing.

## Goals / Non-Goals

**Goals:**

- Eliminate production hydration mismatch for affected islands.
- Keep current UX behavior after hydration.
- Avoid architectural rewrites or removing React islands.

**Non-Goals:**

- Replacing React islands with vanilla DOM scripts.
- Redesigning search/filter UI.
- Adding new runtime dependencies.

## Decisions

1. Use deterministic initial render values for island content that previously depended on browser APIs.

- Rationale: SSR and first client render must match.
- Alternative considered: disable SSR for islands. Rejected due to SEO/perceived performance tradeoffs.

2. Move browser-specific state derivation into `useEffect` synchronization.

- Rationale: effects run after hydration and avoid SSR/client mismatch.
- Alternative considered: custom hydration suppression. Rejected because it hides mismatch instead of fixing data flow.

3. Keep URL and platform behavior unchanged from a user perspective.

- Rationale: this is a bug fix, not a UX change.

## Risks / Trade-offs

- [Risk] Small UI flash while client-only state updates after mount. -> Mitigation: deterministic defaults chosen to remain semantically correct until sync completes.
- [Risk] URL sync effect could override active state unexpectedly. -> Mitigation: synchronize only from canonical URL parse and keep existing normalization helpers.

## Migration Plan

1. Patch `SearchBar.tsx` for hydration-safe initial shortcut label.
2. Patch `BlogFilter.tsx` to remove URL dependency from initial render and sync in effect.
3. Validate with `npm run lint` and `npm run build`.
4. Manually check `/blog?tags=...` and header search shortcut behavior on production preview.

## Open Questions

- None.
