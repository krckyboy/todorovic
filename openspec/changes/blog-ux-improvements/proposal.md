## Why

Blog posts currently lack content discovery and engagement features. Readers finish a post and see only a "Back to all posts" link, with no way to find related content, navigate to adjacent posts, or share what they read. Tags displayed in `BlogHeader` and `BlogPostItem` are static text rather than interactive filters. The `reading-time` package is installed but not wired into the blog post rendering pipeline, so all posts show a hardcoded "5 min read" default.

## What Changes

- **Related Posts component**: New component at the bottom of each blog post showing 2-3 related posts matched by shared tags, falling back to recent posts when no tag overlap exists.
- **Clickable tags**: Tags in `BlogHeader` (single post view) and `BlogPostItem` (list view) become links to `/blog?tags=tagname`, integrating with the existing `BlogFilter` component.
- **Social sharing buttons**: New component on blog post pages with share options for LinkedIn, Twitter/X, and a copy-link button. Uses native share URLs (no third-party scripts).
- **Prev/next post navigation**: Chronological prev/next links at the bottom of each blog post for sequential content discovery.
- **Reading time integration**: Wire the installed `reading-time` package into `[slug].astro` to compute actual reading time from post content and pass it to `BlogHeader`.

## Capabilities

### New Capabilities

- `blog-post-engagement`: Covers related posts, social sharing, and prev/next navigation components added to the blog post page.

### Modified Capabilities

- `blog-module`: Tags become interactive links; reading time is computed from content instead of using default value.

## Impact

- **Modified files**:
  - `src/pages/blog/[slug].astro` - Import and render new components; compute reading time; pass prev/next posts
  - `src/modules/blog/components/BlogHeader.astro` - Tags rendered as anchor links instead of plain text
  - `src/modules/blog/components/BlogPostItem.astro` - Tags rendered as anchor links instead of plain text
- **New files**:
  - `src/modules/blog/components/RelatedPosts.astro` + CSS module
  - `src/modules/blog/components/SocialShare.astro` + CSS module
  - `src/modules/blog/components/PostNavigation.astro` + CSS module
- **Dependencies**: No new packages (uses already-installed `reading-time`).
- **No breaking changes**: All modifications are additive. Existing URLs and content structure remain unchanged. The `BlogFilter` component on `/blog` already supports `tags` query parameter filtering.
