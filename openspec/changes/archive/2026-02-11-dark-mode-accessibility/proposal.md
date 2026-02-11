## Why

The site has several dark mode and accessibility issues: borders are nearly invisible in dark mode (#2a2a2a on #121212 background — ~1.3:1 contrast ratio), the timeline's current role is only differentiated by color (fails for colorblind users), mobile navigation links use `title` instead of `aria-label` (poor screen reader support), the search modal has keyboard trap risks, and social link labels lack semantic clarity.

## What Changes

- Increase dark mode `--color-border` from `#2a2a2a` to `#404040` for visible borders
- Add non-color indicator (e.g., "Current" label or distinct border) to the current timeline item alongside the existing color differentiation
- Change Navigation.astro mobile links from `title={label}` to `aria-label={label}`
- Add focus management to SearchBar.tsx: trap focus within modal when open, return focus on close
- Add `focus-visible` styling to search result items alongside the existing `.focused` class
- Update SocialIcons.astro aria-labels from "GitHub" to "Visit GitHub" for better screen reader context

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `styling`: Dark mode border color token updated for better contrast
- `portfolio-module`: Timeline current item gets accessible non-color indicator

## Impact

- **Modified files**: `src/styles/global.css`, `src/modules/portfolio/components/TimelineItem.module.css`, `src/components/Navigation.astro`, `src/components/SocialIcons.astro`, `src/modules/search/SearchBar.tsx`, `src/modules/search/SearchBar.module.css`
- **No new dependencies**
- **No breaking changes**: All changes improve accessibility without altering visual behavior for sighted users
