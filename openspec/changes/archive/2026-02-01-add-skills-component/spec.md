# Spec: Skills Component

## Overview

Interactive tabbed display of skills organized into Technical Skills and Soft Skills sections. Each section has clickable tabs that reveal skill details. Requires client-side JavaScript for tab switching.

## Props Interface

```typescript
// No props - data is embedded in component
```

Data is embedded as TypeScript arrays within the component.

## Data Structure

```typescript
interface Skill {
  title: string;
  content: string[];
}
```

**Technical Skills**: React, Next.js, Redux, SASS, CSS Modules
**Soft Skills**: Communication, Delegation, Initiative, Leadership, Problem Solving

## Behavior

1. **Two Sections**: Technical Skills and Soft Skills, each with its own tab set
2. **Tab Switching**: Clicking a tab shows corresponding content, hides others
3. **Default State**: First tab in each section is active on load
4. **Interactive**: Requires client-side JavaScript (`client:load` directive)

## Accessibility

- Tab list with proper ARIA roles (`tablist`, `tab`, `tabpanel`)
- `aria-selected` for active tab
- Keyboard navigation (arrow keys between tabs)
- Focus management on tab change

## Visual Design

- Section headings (h2)
- Horizontal tab bar with active state styling
- Content area with bullet list
- Active tab: accent background color
- Hover state on tabs

## Implementation Notes

- Use React component for interactivity (`.tsx`)
- Use `client:load` directive when including in Astro pages
- Embed skill data directly in component

## Files to Create

- `src/components/Skills.tsx` (React island)
- `src/components/Skills.module.css`
