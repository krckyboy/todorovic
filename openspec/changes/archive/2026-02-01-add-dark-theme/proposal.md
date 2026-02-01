# Proposal: Add Dark Theme

## Problem

The site currently only supports light mode. Users who prefer dark interfaces or are browsing at night have no option for a darker color scheme.

## Goals

1. Add dark theme support with system preference detection
2. Allow manual theme toggle that persists across sessions
3. Maintain visual parity with todorovic.dev color palette
4. Create a theme module following DDD (Domain-Driven Design) conventions
5. Ensure smooth transitions between themes
6. Preserve accessibility (contrast ratios)

## Color Palette

### Light Theme (Current)

- Background: `#ffffff`
- Background Alt: `#f8f9fa`
- Text: `#1a1a2e`
- Text Muted: `#4a4a68`
- Primary: `#3b82f6`
- Border: `#e2e8f0`

### Dark Theme (New - Inspired by todorovic.dev)

- Background: `#0f172a` (slate-900)
- Background Alt: `#1e293b` (slate-800)
- Text: `#f1f5f9` (slate-100)
- Text Muted: `#94a3b8` (slate-400)
- Primary: `#60a5fa` (blue-400, slightly brighter for dark)
- Border: `#334155` (slate-700)

## Module Structure (DDD Convention)

Following the domain-driven design pattern with views folder:

```
src/modules/theme/
├── views/
│   └── ThemeToggle.tsx       # Entry point - the toggle component
├── components/
│   ├── ThemeIcon.tsx         # Sun/Moon icon component
│   └── ThemeButton.tsx       # Button wrapper with styling
├── hooks/
│   └── useTheme.ts           # Theme state management hook
├── services/
│   └── themeService.ts       # localStorage persistence
├── constants.ts              # Theme values, color definitions
├── types.ts                  # Theme types
└── index.ts                  # Public exports
```

## Implementation Approach

1. **CSS Custom Properties**: Use CSS variables that change based on `[data-theme]` attribute on `<html>`
2. **System Preference**: Detect `prefers-color-scheme: dark` as default
3. **Persistence**: Store user preference in localStorage
4. **No Flash**: Use inline script in `<head>` to set theme before paint
5. **React Component**: ThemeToggle as a React component (like SearchBar)

## Scope

### In Scope

- Dark theme CSS custom properties
- ThemeToggle React component module
- System preference detection
- LocalStorage persistence
- Smooth color transitions
- Header integration

### Out of Scope

- Multiple themes (only light/dark)
- Theme customization by users
- Per-page theme settings

## References

- Color inspiration: todorovic.dev dark theme
- Similar implementations: Tailwind docs, Next.js docs
