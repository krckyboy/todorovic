## 1. Dark Mode Border Fix

- [ ] 1.1 Update `--color-border` from `#2a2a2a` to `#404040` in the `[data-theme="dark"]` section of `src/styles/global.css`

## 2. Timeline Accessibility

- [ ] 2.1 Add a "Current" text label to the active timeline item in `src/modules/portfolio/components/TimelineItem.astro` (or its module.css) that is visible to both sighted and screen reader users
- [ ] 2.2 Ensure the "Current" indicator works alongside the existing `--color-primary` color differentiation

## 3. Navigation Aria Labels

- [ ] 3.1 Change `title={label}` to `aria-label={label}` on navigation links in `src/components/Navigation.astro` (line 30)

## 4. Social Link Labels

- [ ] 4.1 Update `aria-label={label}` to `aria-label={`Visit ${label}`}` in `src/components/SocialIcons.astro` (line 24)

## 5. Search Modal Focus Management

- [ ] 5.1 Add focus trapping to `src/modules/search/SearchBar.tsx`: Tab/Shift+Tab cycles within modal, Escape closes and restores focus
- [ ] 5.2 Add `focus-visible` CSS styles to search result items in `src/modules/search/SearchBar.module.css` alongside the existing `.focused` class

## 6. Verification

- [ ] 6.1 Run `npm run build` and verify no build errors
- [ ] 6.2 Test dark mode borders are visible (especially BlogPostItem cards and Timeline)
- [ ] 6.3 Verify timeline current item has both color and text differentiation
- [ ] 6.4 Test keyboard navigation in search modal (Tab trapping, Escape to close)
