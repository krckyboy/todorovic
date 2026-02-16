# Spec: AuthorCard Component

## Overview

Display author information card with avatar, name, title, and social links. Static component with hardcoded data for Dušan Todorović.

## Props Interface

```typescript
// No props - static component
```

This is a static component with no configurable props. Author data is hardcoded.

## Content

- **Avatar**: `/images/dusan.png` (80x80, circular)
- **Name**: Dušan Todorović (links to home page)
- **Title**: JavaScript Developer | Team Leader
- **Links**: LinkedIn, Email

## Behavior

1. **Static Content**: All content is hardcoded
2. **Avatar**: Circular image with object-fit cover
3. **Name Link**: Links to homepage (`/`)
4. **Social Links**: Open in new tab with appropriate security attributes

## Accessibility

- Image has descriptive alt text
- External links have `target="_blank"` with `rel="noopener noreferrer"`
- Semantic structure with section element

## Visual Design

- Flex layout with avatar on left, text on right
- Border-top as separator (6px solid, accent color)
- Avatar: 70-80px, circular
- Name: larger font, medium weight
- Title/links: smaller font, muted color

## Files to Create

- `src/components/AuthorCard.astro`
- `src/components/AuthorCard.module.css`
