# Proposal: Dark/Light Theme

## Problem

Site currently only has a light theme. Users should be able to choose their preferred color scheme.

## Goals

1. Support system preference detection (prefers-color-scheme)
2. Allow manual theme toggle
3. Persist user preference
4. Smooth theme transitions
5. No flash of wrong theme on page load

## Approach

### Color Scheme Detection

```javascript
// Initial theme from system preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
```

### Theme Storage

- Store preference in localStorage
- Priority: localStorage > system preference

### CSS Strategy

Use CSS custom properties with data attribute:

```css
:root {
  --color-text: #1a1a2e;
  --color-background: #ffffff;
  /* ... light theme defaults */
}

[data-theme="dark"] {
  --color-text: #e2e8f0;
  --color-background: #0f172a;
  /* ... dark theme overrides */
}
```

### Flash Prevention

Inline script in `<head>` before CSS loads to set data-theme attribute.

## Scope

- Add dark theme color variables to global.css
- Create ThemeToggle component
- Add theme initialization script to BaseLayout
- Update any hardcoded colors to use CSS variables
- Ensure all components respect theme

## Components Needed

- ThemeToggle.astro (button with sun/moon icon)

## Out of Scope

- Multiple theme options (just light/dark)
- Per-component theme overrides
