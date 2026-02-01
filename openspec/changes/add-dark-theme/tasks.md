## 1. CSS Dark Theme

- [x] 1.1 Add `[data-theme="dark"]` selector block in global.css
- [x] 1.2 Define dark theme color overrides (background, text, primary, border)
- [x] 1.3 Add color-scheme property for native elements
- [x] 1.4 Add transition for color properties (200ms)
- [x] 1.5 Update Header.module.css for dark mode (backdrop, border)
- [x] 1.6 Update any hardcoded colors in components

## 2. Flash Prevention Script

- [x] 2.1 Add inline theme detection script in BaseLayout.astro `<head>`
- [x] 2.2 Script reads localStorage, falls back to system preference
- [x] 2.3 Script sets `data-theme` attribute synchronously

## 3. Theme Module Structure

- [x] 3.1 Create `src/modules/theme/` directory
- [x] 3.2 Create `src/modules/theme/types.ts` with Theme type
- [x] 3.3 Create `src/modules/theme/constants.ts` with theme values and storage key
- [x] 3.4 Create `src/modules/theme/services/themeStorage.ts` for localStorage
- [x] 3.5 Create `src/modules/theme/hooks/useTheme.ts` hook

## 4. Theme Components

- [x] 4.1 Create `src/modules/theme/components/ThemeIcon.tsx` (sun/moon)
- [x] 4.2 Create `src/modules/theme/views/ThemeToggle.tsx` (main entry)
- [x] 4.3 Create `src/modules/theme/views/ThemeToggle.module.css`
- [x] 4.4 Create `src/modules/theme/index.ts` for exports

## 5. Integration

- [x] 5.1 Add ThemeToggle to Header.astro with `client:load`
- [x] 5.2 Position toggle in header actions (after search)

## 6. Verification

- [x] 6.1 Run `npm run build` - no errors
- [ ] 6.2 Test system preference detection (toggle OS dark mode)
- [ ] 6.3 Test manual toggle persists across page refresh
- [ ] 6.4 Test no flash of wrong theme on load
- [ ] 6.5 Verify contrast ratios meet WCAG AA
- [ ] 6.6 Test keyboard navigation on toggle
