## 1. Baseline Content Audit

- [ ] 1.1 Inventory live blog slugs, titles, dates, and visible metadata
- [ ] 1.2 Compare live content to `src/content/blog/*.md` and record diffs
- [ ] 1.3 Produce parity checklist (post-by-post)

## 2. Blog Content Sync (Live as Source)

- [ ] 2.1 Sync existing local posts to match live canonical body content
- [ ] 2.2 Resolve `welcome` post strategy by replacing with a new launch post for the new site
- [ ] 2.3 Preserve frontmatter consistency (`title`, `description`, `pubDate`, `tags`, `draft`)

## 3. New Launch Posts

- [ ] 3.1 Add post: "Welcome to my new website" (AI + OpenSpec build story)
- [ ] 3.2 Add post: "Spec-driven development with OpenSpec"
- [ ] 3.3 Ensure both posts meet content schema and style conventions

## 4. SEO + Analytics Alignment

- [ ] 4.1 Produce final route-level metadata matrix using the approved hybrid strategy
- [ ] 4.2 Map live intent terms to route-specific Astro metadata copy
- [ ] 4.3 Integrate metadata updates into pages/layout
- [ ] 4.4 Validate canonical/OG/Twitter tags across key routes
- [ ] 4.5 Integrate GA4 measurement strategy (recommended: reuse existing property)
- [ ] 4.6 Add deployment annotation plan for GA continuity (launch date marker/notes)

## 5. OG Image Generation

- [ ] 5.1 Implement per-post OG generation workflow
- [ ] 5.2 Ensure new blog posts automatically get OG assets
- [ ] 5.3 Validate OG previews for key pages and sample posts

## 6. Vercel Deployment Readiness

- [ ] 6.1 Document Vercel project import and Git production branch setup
- [ ] 6.2 Document same-domain mapping strategy for `todorovic.dev`/`www` + redirect rules
- [ ] 6.3 Prepare controlled cutover checklist from old site to new deployment (DNS, SSL, cache, rollback)

## 7. AI-Assisted Blog Authoring Flow

- [ ] 7.1 Document authoring flow (outline -> draft -> review -> publish)
- [ ] 7.2 Define required checks for blog publishing (content, SEO, links, OG)
- [ ] 7.3 Add guidance for Codex/Cursor-assisted blog writing in repo docs

## 8. Validation

- [ ] 8.1 Run `npm run lint`
- [ ] 8.2 Run `npm run build`
- [ ] 8.3 Manual smoke-check blog index and post pages
