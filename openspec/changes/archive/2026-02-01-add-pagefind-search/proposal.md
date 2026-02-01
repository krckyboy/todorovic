# Proposal: Add Pagefind Search

## Problem

No way to search blog posts or site content.

## Goals

1. Add client-side search functionality
2. Zero runtime cost (static index)
3. Fast, accurate search results
4. Accessible search UI

## Approach

Use Pagefind - a static search library that:

- Indexes content at build time
- Generates a small search index
- Runs entirely client-side
- Has excellent Astro integration

## Scope

- Install Pagefind
- Configure in astro.config.mjs
- Create Search component
- Add search to header/navigation
- Style search results to match site design

## Implementation

```bash
npm install astro-pagefind
```

```javascript
// astro.config.mjs
import pagefind from "astro-pagefind";

export default defineConfig({
  integrations: [pagefind()],
});
```

## Out of Scope

- Server-side search
- External search services (Algolia, etc.)
