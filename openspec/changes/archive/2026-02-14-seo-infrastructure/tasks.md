## 1. OG Image Fallback

- [x] 1.1 Create a default branded social preview image and place it at `public/og-default.png` (1200x630px recommended)
- [x] 1.2 Update `src/layouts/BaseLayout.astro` to always render an og:image meta tag, falling back to the default image when no socialImageURL prop is provided

## 2. JSON-LD Structured Data

- [x] 2.1 Add BlogPosting JSON-LD script block to `src/pages/blog/[slug].astro` with headline, datePublished, dateModified, author (Person), description, and url
- [x] 2.2 Add Person JSON-LD script block to `src/pages/index.astro` with name, jobTitle, url, and sameAs social profile links

## 3. RSS Feed

- [ ] 3.1 Install `@astrojs/rss` dependency
- [ ] 3.2 Create `src/pages/rss.xml.ts` that generates an RSS 2.0 feed with all non-draft blog posts, including title, pubDate, description, and link per item
- Skipped by product decision on 2026-02-14 (RSS not needed)

## 4. robots.txt

- [x] 4.1 Create `public/robots.txt` allowing all user agents and referencing `https://todorovic.dev/sitemap-index.xml`

## 5. Reading Time Fix

- [x] 5.1 In `src/pages/blog/[slug].astro`, import the `reading-time` package and calculate actual reading time from `entry.body`
- [x] 5.2 Pass the calculated reading time string to the `BlogHeader` component's `readingTime` prop instead of the hardcoded default

## 6. Verification

- [x] 6.1 Run `npm run build` and verify no build errors
- [x] 6.2 Verify og:image meta tag appears in built HTML for pages with and without explicit images
- [x] 6.3 Verify JSON-LD script blocks appear in blog post and homepage HTML output
- [ ] 6.4 Verify /rss.xml returns valid RSS with all published posts
- Skipped by product decision on 2026-02-14 (RSS not needed)
