# Tasks: Migrate to Astro

Implementation checklist for the migration.

> Status refresh: February 14, 2026.
> This file is retained as historical baseline; unresolved verification items should be handled in focused follow-up changes.

## Phase 1: Foundation ✓

- [x] Initialize Astro project with minimal template
- [x] Add sitemap integration
- [x] Install reading-time package
- [x] Create src/ directory structure

## Phase 2: OpenSpec Setup ✓

- [x] Create openspec/ directory structure
- [x] Create astro-project schema
- [x] Create astro-component schema
- [x] Create astro-page schema
- [x] Create blog-content schema
- [x] Create .claude/ directory structure
- [x] Create orchestrator agent
- [x] Create task-executor agent
- [x] Create dependency-resolver agent
- [x] Create feedback-listener agent
- [x] Create verify-build agent
- [x] Create verify-a11y agent
- [x] Create verify-seo agent
- [x] Create opsx-new skill
- [x] Create opsx-status skill
- [x] Create opsx-next skill
- [x] Create new-component skill
- [x] Create new-page skill
- [x] Create new-post skill
- [x] Create deploy skill
- [x] Create CLAUDE.md
- [x] Create AGENTS.md
- [x] Create openspec/project.md
- [x] Create openspec/AGENTS.md
- [x] Create astro-conventions spec

## Phase 3: Core Infrastructure ✓

- [x] Create src/content/config.ts
- [x] Create src/styles/global.css
- [x] Create src/layouts/BaseLayout.astro
- [x] Update astro.config.mjs with site URL

## Phase 4: Components ✓

- [x] Create Header component
- [x] Create Footer component
- [x] Create Navigation component
- [x] Create BlogPostItem component
- [x] (Superseded) Categories component requirement replaced by `BlogFilter` + tag-driven filtering
- [x] Create AuthorCard component
- [x] (Superseded) Skills component requirement replaced by `SkillTags` in `redesign-portfolio`
- [x] (Superseded) Experience component requirement replaced by `Timeline` in `redesign-portfolio`
- [x] Create SocialIcons component

## Phase 5: Pages ✓

- [x] Create index.astro (home page)
- [x] Create about.astro
- [x] Create skills.astro
- [x] Create blog/index.astro
- [x] Create blog/[slug].astro
- [x] Create 404.astro

## Phase 6: Search ✓

- [x] Install Pagefind
- [x] Configure Pagefind in astro.config.mjs
- [x] Create Search component
- [x] Add search to header/navigation

## Phase 7: Content Migration ✓

- [x] Create sample blog post
- [x] Verify content collection works
- [ ] (User) Migrate existing blog posts

## Phase 8: Verification

- [x] Run npm run build successfully
- [ ] Verify all pages render (dev server)
- [ ] Run accessibility audit
- [ ] Run SEO check
- [ ] Check Lighthouse scores

## Notes

- Tasks in same phase can run in parallel
- Phase 5 depends on Phase 4 completion
- Phase 7 requires user input for content
- Phase 8 is final validation
