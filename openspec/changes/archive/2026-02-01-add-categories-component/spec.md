# Spec: Categories Component

## Overview

Display a list of category/tag links for filtering blog posts. Categories are shown as clickable tags with an active state that shows when a category is currently selected.

## Props Interface

```typescript
interface Props {
  categories: string[];
  activeCategory?: string;
}
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `categories` | `string[]` | Yes | Array of category names to display |
| `activeCategory` | `string` | No | Currently selected category (shows active state with X icon) |

## Behavior

1. **Empty State**: If `categories` is empty or undefined, render nothing
2. **Category Links**: Each category links to `/blog?category={name}`
3. **Active State**: When a category matches `activeCategory`:
   - Apply active styling (background color)
   - Show X icon to indicate "click to clear"
   - Link goes to `/blog` (clears filter)
4. **Inactive State**: Normal category links to filtered view

## Accessibility

- Use semantic `<ul>` and `<li>` elements
- Links have descriptive text (hashtag + category name)
- Active state uses `aria-current="true"`
- Focus states visible on all links

## Visual Design

- Horizontal flex layout with gap
- Categories displayed as `#{name}` format
- Active category has accent background with padding
- Hover state changes text color to accent

## Files to Create

- `src/components/Categories.astro`
- `src/components/Categories.module.css`
