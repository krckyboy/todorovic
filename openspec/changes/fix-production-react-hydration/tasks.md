> Progress snapshot: February 21, 2026.

## 1. Search Island Hydration Safety

- [x] 1.1 Update `src/modules/search/SearchBar.tsx` so initial shortcut label is SSR/client deterministic.
- [x] 1.2 Keep platform-specific label behavior by applying platform detection post-hydration.

## 2. Blog Filter Hydration Safety

- [x] 2.1 Update `src/modules/blog/components/BlogFilter.tsx` to avoid URL parsing in initial state.
- [x] 2.2 Add post-hydration URL sync for active tags while preserving existing normalization behavior.

## 3. Verification

- [x] 3.1 Run `npm run lint`.
- [x] 3.2 Run `npm run build`.
- [ ] 3.3 Manually verify `/blog?tags=<tag>` and header search shortcut render without hydration errors.
