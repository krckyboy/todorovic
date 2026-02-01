# Tasks: add-categories-component

## Implementation Checklist

- [ ] Create `src/components/Categories.astro`
  - Props interface with `categories` and `activeCategory`
  - Render `<ul>` with category links
  - Handle active state logic (link destination, styling)
  - Add X icon for active category (inline SVG)

- [ ] Create `src/components/Categories.module.css`
  - `.categories` - horizontal flex layout with gap
  - `.link` - base link styling with muted color
  - `.link:hover` - accent color on hover
  - `.active` - accent background, padding, border-radius
  - `.cross` - X icon styling

## Verification

- [ ] `npm run build` passes
- [ ] Component renders list of categories
- [ ] Active category shows different styling
- [ ] Clicking active category clears filter (links to /blog)
- [ ] Keyboard navigation works
