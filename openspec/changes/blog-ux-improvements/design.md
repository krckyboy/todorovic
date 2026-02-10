## Context

The blog at `/blog` uses Astro Content Collections with Markdown posts and a React-based `BlogFilter` component for tag filtering. Individual blog posts render via `[slug].astro` using `BlogHeader`, `Content`, and `AuthorCard` components. The `reading-time` npm package is installed but unused. Tags exist in post frontmatter but render as static text. The blog module follows DDD conventions at `src/modules/blog/`.

The `BlogFilter` component already reads `tags` from URL query parameters on mount (`window.location.href` search params), making it ready to receive tag-based navigation links from other pages without modification.

## Goals / Non-Goals

**Goals:**

- Enable content discovery through related posts, prev/next navigation, and clickable tags
- Add social sharing capabilities using zero-dependency native share URLs
- Wire the installed `reading-time` package for accurate reading time display
- Follow existing project conventions: CSS Modules, TypeScript Props, mobile-first design, DDD module structure

**Non-Goals:**

- Adding analytics or tracking to shared links
- Server-side rendering or dynamic routes (site remains fully static)
- Modifying the `BlogFilter` React component (it already handles URL-based tag filtering)
- Adding new npm dependencies
- Comment system or reader engagement beyond sharing

## Decisions

### 1. Related posts matching algorithm: Tag overlap with recency fallback

Related posts are determined by counting shared tags with the current post, sorted by overlap count descending then by publication date descending. Show up to 3 related posts. When fewer than 2 posts share tags, fill remaining slots with the most recent posts (excluding the current one).

**Rationale**: Tag overlap is the most meaningful signal available from frontmatter data. A fallback to recent posts ensures the component always shows content even for posts with unique tags. This approach requires no additional metadata or content analysis.

**Alternative considered**: Using only recency (simpler) -- rejected because tag-based relevance provides better content discovery when tags overlap.

### 2. Clickable tags: Anchor links to `/blog?tags=tagname`

Tags in `BlogHeader` and `BlogPostItem` become `<a>` elements linking to `/blog?tags=tagname`. No JavaScript required -- the existing `BlogFilter` reads the `tags` query parameter on page load.

**Rationale**: The `BlogFilter` component already parses `tags` from `window.location.href` search params on mount (lines 37-43 of `BlogFilter.tsx`). Plain anchor links trigger a full page navigation to `/blog`, where `BlogFilter` picks up the query parameter. This is the simplest approach with zero client-side JavaScript.

**Alternative considered**: Adding client-side tag toggle without navigation -- rejected because it would require hydrating the blog post page with React and duplicating filter logic.

### 3. Social sharing: Native URL-based sharing (no SDK)

Share buttons use plain URLs: LinkedIn share URL (`https://www.linkedin.com/sharing/share-offsite/?url=`), Twitter/X intent URL (`https://twitter.com/intent/tweet?url=&text=`), and a copy-to-clipboard button using the Clipboard API. All links open in new tabs.

**Rationale**: No third-party scripts means zero impact on page load performance and no privacy/tracking concerns. LinkedIn and Twitter/X share URLs are stable public APIs. The copy-link button requires minimal inline JavaScript (Clipboard API).

**Alternative considered**: Web Share API (`navigator.share`) -- rejected as primary approach because it is not supported in all desktop browsers. Could be added as a progressive enhancement later.

### 4. Prev/next navigation: Chronological order matching blog listing

Posts are sorted by `pubDate` descending (newest first, matching the blog index). "Previous" goes to the older post, "Next" goes to the newer post. At the boundaries (oldest/newest), only one direction is shown.

**Rationale**: Consistent with the blog listing sort order. Users reading sequentially can continue in either direction.

### 5. Reading time: Computed at build time in `[slug].astro`

Import `reading-time` in `[slug].astro`, call it on `post.body` (the raw markdown content), and pass the result string to `BlogHeader` via the existing `readingTime` prop.

**Rationale**: `BlogHeader` already accepts a `readingTime` prop with a default of "5 min read". Computing at build time in the page component keeps the logic in the data layer, not the presentation layer. The `reading-time` package is already installed.

### 6. Component placement order on blog post page

The blog post page layout (top to bottom):

1. `BlogHeader` (existing -- with clickable tags, computed reading time)
2. Post content (existing)
3. `SocialShare` (new)
4. `AuthorCard` (existing)
5. `PostNavigation` (new -- prev/next)
6. `RelatedPosts` (new)
7. Back to blog link (existing, moved into footer area)

**Rationale**: Social sharing placed immediately after content for maximum visibility. Author card follows as context. Navigation and related posts at the bottom encourage further reading.

## Risks / Trade-offs

- **Few posts currently (3)**: Related posts will mostly show all other posts. This is acceptable -- the feature becomes more valuable as content grows. Mitigation: The fallback-to-recent logic ensures the section always looks populated.
- **Copy-link requires JavaScript**: The clipboard API needs a small inline `<script>`. Mitigation: Progressive enhancement -- the button is present but shows feedback only when JS runs. Non-JS users can still copy the URL from the browser address bar.
- **Tag URL encoding**: Tag names with spaces or special characters need URL encoding in links. Mitigation: Use `encodeURIComponent()` when building tag URLs, and the `BlogFilter` already uses `split(",")` parsing which handles this.
- **Static generation means no real-time share counts**: Share buttons are outbound links only. Mitigation: This is a non-goal; share counts would require a dynamic backend.
