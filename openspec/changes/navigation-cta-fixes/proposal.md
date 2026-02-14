> **STATUS: IN PROGRESS** as of February 14, 2026.
> `AuthorCard` title consistency is already implemented; CTA/breadcrumb/cross-link updates remain pending.

## Why

The portfolio site lacks clear calls-to-action and cross-linking between pages. Visitors on the About page see "reach out through social links in the footer" instead of a direct contact button. About and Skills pages exist in isolation with no links between them. The Hero section has no path to blog content. The 404 page offers only "Go Home" with no content suggestions. The author title in AuthorCard ("JavaScript Developer | Team Leader") is inconsistent with the Hero's "Frontend Team Lead".

## What Changes

- Replace the vague contact text on the About page with a styled "Get in Touch" CTA button linking to email
- Add cross-links between About and Skills pages ("View my skills →" / "Read my story →")
- Change AuthorCard.astro default title from "JavaScript Developer | Team Leader" to "Frontend Team Lead"
- Add breadcrumb navigation to About and Skills pages following the BlogHeader.astro breadcrumb pattern
- Add "Read my latest article →" CTA link in the Hero actions section
- Improve 404 page with "You might be looking for" section linking to Blog, About, and Skills

## Capabilities

### New Capabilities

- `page-navigation`: Covers breadcrumb navigation for standalone pages and cross-page linking patterns

### Modified Capabilities

- `blog-module`: AuthorCard default title updated to match site-wide positioning

## Impact

- **Modified files**: `src/pages/about.astro`, `src/pages/skills.astro`, `src/pages/404.astro`, `src/components/Hero.astro`, `src/components/Hero.module.css`, `src/modules/blog/components/AuthorCard.astro`
- **No new dependencies**
- **No breaking changes**: All modifications are additive or cosmetic text updates

## UX Outcomes

- About page contact intent becomes immediately actionable (`mailto:` button).
- About and Skills become mutually discoverable without relying only on top nav.
- Home Hero gains a direct path to content (`/blog`) for readers who prefer articles first.
- 404 page becomes a recovery hub instead of a dead end.
