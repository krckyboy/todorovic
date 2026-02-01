## Context

The existing todorovic.dev site has blog posts that need to be migrated to the new Astro site. The plan specifies 2 specific blog posts to add:

1. "Burnout in Software Engineering" (2024-06-08)
2. "Unlocking Opportunities: Why Conferences Matter" (2024-06-02)

## Goals / Non-Goals

**Goals:**

- Create 2 blog posts in Markdown format
- Use proper frontmatter matching Content Collection schema
- Preserve original publication dates
- Add appropriate tags

**Non-Goals:**

- Migrating all posts (just these 2 for now)
- Image migration (text content only)
- URL redirects (same URL structure)

## Decisions

### 1. Content Source

**Decision**: Fetch content from live URLs using WebFetch.

**Rationale**:

- Posts are publicly available
- No CMS access needed
- Can extract and reformat content

### 2. Frontmatter Schema

**Decision**: Use existing Content Collection schema.

**Rationale**:

- Schema already defined in src/content/config.ts
- Consistent with site conventions

### 3. File Naming

**Decision**: Use kebab-case matching URL slugs.

**Rationale**:

- Matches Astro conventions
- Preserves URL structure

## Risks / Trade-offs

**[Risk] Content extraction may miss formatting** → Mitigation: Review and clean up manually.

**[Trade-off] Only 2 posts initially** → Can add more in future changes.
