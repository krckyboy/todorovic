# Spec: Experience Component

## Overview

Interactive tabbed display of work experience organized by company. Each company tab shows positions held, dates, locations, and achievements. Requires client-side JavaScript for tab switching.

## Props Interface

```typescript
// No props - data is embedded in component
```

Data is embedded as TypeScript arrays within the component.

## Data Structure

```typescript
interface Experience {
  companyName: string;
  position: {
    title: string;
    startDate: Date;
    endDate?: Date;
    location: string;
    achievements: string[];
  }[];
}
```

**Companies**: Citrus Systems (2 positions), Boca Tech (1 position)

## Behavior

1. **Company Tabs**: Each company is a clickable tab
2. **Position Details**: Shows title, date range, duration, location, achievements
3. **Date Formatting**: "MMM yyyy - MMM yyyy | X years, Y months"
4. **Default State**: First company active on load
5. **Interactive**: Requires client-side JavaScript (`client:load` directive)

## Accessibility

- Tab list with proper ARIA roles
- `aria-selected` for active tab
- Keyboard navigation
- Semantic heading for section (h2) and positions (h3)

## Visual Design

- Section heading "Work Experience"
- Horizontal tab bar with company names
- Position cards with title, dates, location
- Achievement bullet list
- Multiple positions per company supported

## Implementation Notes

- Use React component for interactivity (`.tsx`)
- Include date formatting utilities in component
- Use `client:load` directive when including in Astro pages

## Files to Create

- `src/components/Experience.tsx` (React island)
- `src/components/Experience.module.css`
