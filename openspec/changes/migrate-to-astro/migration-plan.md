# Migration Plan: Next.js → Astro

## Overview

Step-by-step migration from Next.js + Strapi to Astro with Content Collections.

## Task Dependency Graph

```
[1] Setup Astro project ✓
    ↓
[2] Setup OpenSpec structure ✓ ──────────────┐
    ↓                                        │
[3] Create schemas (parallel) ✓              │
    ├── astro-project schema                 │
    ├── astro-component schema               │
    ├── astro-page schema                    │
    └── blog-content schema                  │
    ↓                                        │
[4] Setup .claude/ structure ✓ ──────────────┤
    ├── Create orchestrator agent            │
    ├── Create feedback-listener agent       │
    ├── Create verification agents           │
    └── Create skills                        │
    ↓                                        ↓
[5] Migrate core infrastructure ─────────────┘
    ├── Create BaseLayout
    ├── Setup Content Collections ✓
    ├── Setup global styles ✓
    └── Configure Astro ✓
    ↓
[6] Migrate components (parallel)
    ├── Header
    ├── Footer
    ├── BlogPostItem
    ├── Categories
    ├── AuthorCard
    ├── Skills
    ├── Experience
    ├── Navigation
    └── SocialIcons
    ↓
[7] Migrate pages (depends on components)
    ├── index.astro
    ├── about.astro
    ├── skills.astro
    ├── blog/index.astro
    ├── blog/[slug].astro
    └── 404.astro
    ↓
[8] Setup search (Pagefind)
    ↓
[9] Migrate content (manual)
    ↓
[10] Final verification
    ├── Build verification
    ├── Visual comparison
    ├── Accessibility audit
    └── SEO check
```

## Phase Details

### Phase 1: Foundation ✓

**Tasks completed:**
- [x] Initialize Astro project
- [x] Add sitemap integration
- [x] Install reading-time
- [x] Create directory structure

### Phase 2: OpenSpec Setup ✓

**Tasks completed:**
- [x] Create openspec/ structure
- [x] Create schemas
- [x] Create .claude/ structure
- [x] Create agents
- [x] Create skills
- [x] Create CLAUDE.md
- [x] Create AGENTS.md
- [x] Create project.md
- [x] Create astro-conventions spec

### Phase 3: Core Infrastructure

**Tasks:**
- [x] Setup Content Collections config
- [x] Setup global CSS
- [ ] Create BaseLayout
- [ ] Configure astro.config.mjs fully

### Phase 4: Components

**Can run in parallel:**
- [ ] Header component
- [ ] Footer component
- [ ] Navigation component
- [ ] BlogPostItem component
- [ ] Categories component
- [ ] AuthorCard component
- [ ] Skills component
- [ ] Experience component
- [ ] SocialIcons component

### Phase 5: Pages

**Depends on components:**
- [ ] index.astro (home)
- [ ] about.astro
- [ ] skills.astro
- [ ] blog/index.astro
- [ ] blog/[slug].astro
- [ ] 404.astro

### Phase 6: Search

- [ ] Install Pagefind
- [ ] Configure indexing
- [ ] Add search UI

### Phase 7: Content

**Manual by user:**
- [ ] Migrate blog posts to markdown
- [ ] Add frontmatter
- [ ] Verify content renders

### Phase 8: Verification

- [ ] Build passes
- [ ] All pages render
- [ ] Accessibility audit
- [ ] SEO check
- [ ] Performance check

## Execution Order

1. **Wave 1** (parallel): Components that don't depend on each other
2. **Wave 2** (parallel): Pages that use wave 1 components
3. **Wave 3** (sequential): Search, then verification

## Rollback Plan

Git tracks all changes. If migration fails:
1. `git stash` or `git reset` to undo
2. Investigate issue
3. Re-attempt with fixes
