> Progress snapshot: February 14, 2026.
> Reading time is already wired; remaining work is focused on engagement/navigation components and clickable tags.

## 1. Reading Time Integration

- [x] 1.1 Import `reading-time` in `src/pages/blog/[slug].astro` and compute reading time from `post.body`
- [x] 1.2 Pass the computed reading time string to `BlogHeader` via the `readingTime` prop

## 2. Clickable Tags

- [x] 2.1 Update `BlogHeader.astro` to render tags as `<a>` links with `href="/blog?tags={encodedTag}"` instead of plain `<li>` text
- [x] 2.2 Update `BlogHeader.module.css` to add link styling, hover states, and `:focus-visible` for tag links
- [x] 2.3 Update `BlogPostItem.astro` to render tags as `<a>` links with `href="/blog?tags={encodedTag}"` instead of plain `<li>` text
- [x] 2.4 Update `BlogPostItem.module.css` to add link styling, hover states, and `:focus-visible` for tag links
- [x] 2.5 Verify tag links on BlogPostItem do not trigger the parent post link when clicked

## 3. Social Sharing Component

- [x] 3.1 Create `SocialShare.astro` at `src/modules/blog/components/` with TypeScript Props interface accepting `url` and `title`
- [x] 3.2 Implement LinkedIn share link using `https://www.linkedin.com/sharing/share-offsite/?url={encodedUrl}`
- [x] 3.3 Implement Twitter/X share link using `https://twitter.com/intent/tweet?url={encodedUrl}&text={encodedTitle}`
- [x] 3.4 Implement copy-link button with Clipboard API and visual feedback
- [x] 3.5 Create `SocialShare.module.css` with mobile-first responsive layout, hover states, focus-visible states, and reduced-motion support
- [x] 3.6 Add accessible labels (`aria-label`) to all share buttons/links

## 4. Post Navigation Component

- [x] 4.1 Create `PostNavigation.astro` at `src/modules/blog/components/` with TypeScript Props interface accepting optional prev and next post objects
- [x] 4.2 Render prev/next links showing direction label and post title, linking to `/blog/{slug}`
- [x] 4.3 Handle edge cases: render nothing when no prev/next exist, show single direction at boundaries
- [x] 4.4 Create `PostNavigation.module.css` with mobile-first responsive layout, hover states, focus-visible states, and reduced-motion support

## 5. Related Posts Component

- [x] 5.1 Create `RelatedPosts.astro` at `src/modules/blog/components/` with TypeScript Props interface accepting current post and all posts
- [x] 5.2 Implement tag-overlap matching algorithm: count shared tags, sort by overlap then recency, exclude current post
- [x] 5.3 Implement recency fallback: fill remaining slots (up to 3) with most recent posts when fewer than 2 tag matches exist
- [x] 5.4 Render each related post with title (linked), publication date, and description
- [x] 5.5 Create `RelatedPosts.module.css` with mobile-first responsive layout, hover states, focus-visible states, and reduced-motion support

## 6. Blog Post Page Assembly

- [x] 6.1 Import `SocialShare`, `PostNavigation`, and `RelatedPosts` in `[slug].astro`
- [x] 6.2 Compute prev/next posts from the sorted posts collection in `getStaticPaths` or component logic
- [x] 6.3 Compute the canonical post URL for the SocialShare component
- [x] 6.4 Add components to the page template in order: BlogHeader, post content, SocialShare, AuthorCard, PostNavigation, RelatedPosts
- [x] 6.5 Pass required props to each new component

## 7. Verification

- [x] 7.1 Run `npm run build` and verify no build errors
- [x] 7.2 Run `npm run lint` and verify no linting errors
- [x] 7.3 Verify keyboard navigation works for all new interactive elements (tab through tags, share buttons, nav links, related post links)
- [x] 7.4 Verify reduced-motion media query disables transitions in all new components
- [x] 7.5 Verify tag links navigate to `/blog?tags=tagname` and the blog filter activates correctly
