# Tasks: add-authorcard-component

## Implementation Checklist

- [ ] Create `src/components/AuthorCard.astro`
  - Static component (no props)
  - Astro Image component for avatar
  - Name with link to home
  - Title and social links

- [ ] Create `src/components/AuthorCard.module.css`
  - `.container` - flex layout, border-top separator
  - `.image` - circular avatar with responsive sizing
  - `.textContainer` - flex column with gap
  - `.name` - larger font, medium weight
  - `.links` - horizontal layout, accent color

- [ ] Add avatar image
  - Ensure `/public/images/dusan.png` exists (or appropriate path)

## Verification

- [ ] `npm run build` passes
- [ ] Avatar displays correctly (circular)
- [ ] Links work (home, LinkedIn, email)
- [ ] Responsive on mobile
