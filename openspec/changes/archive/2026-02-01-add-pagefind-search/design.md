## Context

The portfolio site has blog posts and content pages but no way to search them. Users need to browse manually or use browser search. Pagefind is a modern static search solution that works perfectly with Astro.

## Goals / Non-Goals

**Goals:**

- Add client-side search functionality using Pagefind
- Zero runtime cost - index generated at build time
- Accessible search UI component
- Style search results to match site design

**Non-Goals:**

- Server-side search
- External search services (Algolia, Elasticsearch)
- Advanced filters or faceted search

## Decisions

### 1. Search Library

**Decision**: Use astro-pagefind integration.

**Rationale**:

- Built specifically for static sites
- Excellent Astro integration
- Tiny bundle size (~6KB)
- Indexes at build time, no runtime cost

**Alternatives considered**:

- Algolia: Requires external service, API keys, costs
- Fuse.js: Must load all content client-side, slower for large sites

### 2. Search UI Location

**Decision**: Add search button in header that opens modal/dialog.

**Rationale**:

- Always accessible from any page
- Modal keeps UI clean
- Common pattern users expect

### 3. Keyboard Navigation

**Decision**: Support Cmd/Ctrl+K shortcut to open search.

**Rationale**:

- Standard keyboard shortcut for search
- Power users expect this

## Risks / Trade-offs

**[Risk] First load needs to fetch index** → Mitigation: Index is small, pagefind lazy-loads.

**[Trade-off] Build time increases slightly** → Acceptable for static search benefits.
