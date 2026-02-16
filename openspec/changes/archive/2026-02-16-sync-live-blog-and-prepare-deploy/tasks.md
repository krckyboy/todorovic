## 1. Baseline Content Audit

- [x] 1.1 Inventory live blog slugs, titles, dates, and visible metadata
- [x] 1.2 Compare live content to `src/content/blog/*.md` and record diffs
- [x] 1.3 Produce parity checklist (post-by-post)

## 2. Blog Content Sync (Live as Source)

- [x] 2.1 Sync existing local posts to match live canonical body content
- [x] 2.2 Resolve `welcome` post strategy by replacing with a new launch post for the new site
- [x] 2.3 Preserve frontmatter consistency (`title`, `description`, `pubDate`, `tags`, `draft`)

## 3. New Launch Posts

- [x] 3.1 Add post: "Welcome to my new website" (AI + OpenSpec build story)
- [x] 3.2 Add post: "Spec-driven development with OpenSpec"
- [x] 3.3 Ensure both posts meet content schema and style conventions

## 4. SEO + Analytics Alignment

- [x] 4.1 Produce final route-level metadata matrix using the approved hybrid strategy
- [x] 4.2 Map live intent terms to route-specific Astro metadata copy
- [x] 4.3 Integrate metadata updates into pages/layout
- [x] 4.4 Validate canonical/OG/Twitter tags across key routes
- [x] 4.5 Integrate GA4 measurement strategy (recommended: reuse existing property)
- [x] 4.6 Add deployment annotation plan for GA continuity (launch date marker/notes)

## 5. OG Image Generation

- [x] 5.1 Implement per-post OG generation workflow
- [x] 5.2 Ensure new blog posts automatically get OG assets
- [x] 5.3 Validate OG previews for key pages and sample posts

## 6. Vercel Deployment Readiness

- [x] 6.1 Document Vercel project import and Git production branch setup
- [x] 6.2 Document same-domain mapping strategy for `todorovic.dev`/`www` + redirect rules
- [x] 6.3 Prepare controlled cutover checklist from old site to new deployment (DNS, SSL, cache, rollback)

## 7. AI-Assisted Blog Authoring Flow

- [x] 7.1 Document authoring flow (outline -> draft -> review -> publish)
- [x] 7.2 Define required checks for blog publishing (content, SEO, links, OG)
- [x] 7.3 Add guidance for Codex/Cursor-assisted blog writing in repo docs

## 8. Validation

- [x] 8.1 Run `npm run lint`
- [x] 8.2 Run `npm run build`
- [x] 8.3 Manual smoke-check blog index and post pages
