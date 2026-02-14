## Context

The portfolio site at todorovic.dev has solid HTML meta tags (title, description, canonical, og:title, og:description, twitter:card) in BaseLayout.astro. However, og:image is conditional and no blog post provides an image, so social shares render without a preview. There is no structured data (JSON-LD), no RSS feed, no robots.txt, and reading time is hardcoded to "5 min read" despite the `reading-time` package being installed.

## Goals / Non-Goals

**Goals:**

- Every page gets a social preview image (og:image) even without an explicit image prop
- Blog posts emit BlogPosting JSON-LD for rich search snippets
- Homepage emits Person JSON-LD for knowledge panel eligibility
- RSS feed at /rss.xml enables subscription and cross-posting
- robots.txt points crawlers to the sitemap
- Blog posts display actual reading time instead of hardcoded default

**Non-Goals:**

- Dynamic OG image generation (e.g., @vercel/og or satori) — a static fallback image is sufficient for now
- Full Schema.org coverage beyond BlogPosting and Person
- Newsletter/email signup (separate change)
- Automated cross-posting to dev.to/Hashnode (manual for now, RSS enables it)

## Decisions

**1. Static fallback OG image over dynamic generation**

- A single branded image in `public/` is simpler, zero-dependency, and sufficient for a portfolio site
- Dynamic generation (satori, puppeteer) adds build complexity for marginal benefit at this scale
- Per-post images can be added later via the existing `image` field in content schema

**2. Inline JSON-LD in page templates over a shared component**

- BlogPosting schema is specific to `[slug].astro`; Person schema is specific to `index.astro`
- A shared component would add abstraction for only 2 use sites
- Inline `<script type="application/ld+json">` keeps the structured data colocated with the page that defines it

**3. @astrojs/rss for RSS feed**

- Official Astro integration, well-maintained, type-safe
- Generates standard RSS 2.0 XML
- Uses the same content collections API already in use for blog posts

**4. Reading time calculated in [slug].astro and passed as prop**

- The `reading-time` package is already installed
- Calculate in the page's frontmatter script where `entry.body` is available
- Pass the result string to BlogHeader via its existing `readingTime` prop (no interface change needed)

## Risks / Trade-offs

- **[Risk]** Static OG image won't distinguish posts visually on social feeds → Acceptable for now; per-post images can be added incrementally using the existing schema field
- **[Risk]** JSON-LD inline in templates couples schema to page structure → Mitigated by keeping schemas simple and colocated; extract to component only if a third use site appears
- **[Risk]** RSS feed exposes full post content → Standard practice for developer blogs; drives traffic back to the site via canonical URL
