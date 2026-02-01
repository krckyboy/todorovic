## Context

The portfolio site needs dark theme support. The current architecture uses CSS custom properties in global.css, making theme switching straightforward. The SearchBar module established a pattern for React components in Astro.

## Goals / Non-Goals

**Goals:**

- Add dark theme with CSS custom properties
- Create ThemeToggle module following DDD conventions (with views folder)
- Detect system preference, allow manual override
- Persist preference in localStorage
- Prevent flash of wrong theme on load

**Non-Goals:**

- Multiple themes beyond light/dark
- Theme editor or customization
- Server-side theme detection

## Decisions

### 1. Theme Detection Strategy

**Decision**: Use `data-theme` attribute on `<html>` element.

**Rationale**:

- Standard pattern (Tailwind, Radix, etc.)
- Works with CSS selectors: `[data-theme="dark"]`
- Easy to toggle via JavaScript
- SSR-friendly

**Alternatives considered**:

- CSS class (`.dark`): Works but `data-*` is more semantic
- Media query only: Doesn't allow manual override

### 2. Flash Prevention

**Decision**: Inline script in `<head>` before any content loads.

```html
<script>
  const theme =
    localStorage.getItem("theme") ??
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
</script>
```

**Rationale**:

- Runs synchronously before paint
- No FOUC (Flash of Unstyled Content)
- Minimal JavaScript in critical path

### 3. Module Structure (DDD with Views)

**Decision**: Create `src/modules/theme/` with views folder for entry point.

```
src/modules/theme/
├── views/
│   └── ThemeToggle.tsx       # Main entry - exported component
├── components/
│   └── ThemeIcon.tsx         # Sun/Moon animated icon
├── hooks/
│   └── useTheme.ts           # React hook for theme state
├── services/
│   └── themeStorage.ts       # localStorage abstraction
├── constants.ts              # 'light' | 'dark', storage key
├── types.ts                  # Theme type definitions
└── index.ts                  # Re-exports from views/
```

**Rationale**:

- Consistent with studio-frontend DDD pattern
- `views/` contains entry points (what consumers import)
- `components/` contains internal sub-components
- Clear separation of concerns
- `index.ts` provides clean public API

### 4. CSS Structure

**Decision**: Define dark theme colors in global.css using `[data-theme="dark"]` selector.

```css
:root {
  --color-background: #ffffff;
  /* ... light theme */
}

[data-theme="dark"] {
  --color-background: #0f172a;
  /* ... dark theme overrides */
}
```

**Rationale**:

- Single source of truth for colors
- No JavaScript needed for color values
- CSS transitions work automatically
- Components don't need theme awareness

### 5. Component Implementation

**Decision**: React component with `client:load` directive.

**Rationale**:

- Consistent with SearchBar pattern
- Proper state management with hooks
- Clean event handling
- TypeScript support

### 6. Color Palette

**Decision**: Use Tailwind slate colors for dark theme.

| Token          | Light     | Dark      |
| -------------- | --------- | --------- |
| background     | `#ffffff` | `#0f172a` |
| background-alt | `#f8f9fa` | `#1e293b` |
| text           | `#1a1a2e` | `#f1f5f9` |
| text-muted     | `#4a4a68` | `#94a3b8` |
| primary        | `#3b82f6` | `#60a5fa` |
| border         | `#e2e8f0` | `#334155` |

**Rationale**:

- Slate provides neutral, professional look
- Blue primary works in both themes (slightly brighter for dark)
- Good contrast ratios for accessibility

## Risks / Trade-offs

**[Risk] Flash on slow connections** → Mitigation: Inline script is tiny and synchronous.

**[Trade-off] localStorage not available in SSR** → Theme defaults to system preference on first paint.

**[Trade-off] No server-side theme** → Acceptable for static site; cookie-based would add complexity.
