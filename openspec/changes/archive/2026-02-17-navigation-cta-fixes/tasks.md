> Progress snapshot: February 17, 2026.
> Scope update: Hero blog CTA was dropped for cleaner visual hierarchy. All remaining scoped tasks are complete.

## 1. About Page CTA

- [x] 1.1 Replace the plain text "reach out through social links in the footer" in `src/pages/about.astro` with a styled "Get in Touch" button linking to `mailto:dusan.todorovic.dev@gmail.com`
- [x] 1.2 Add a "View my skills →" link at the end of the bio section in `src/pages/about.astro` pointing to `/skills`

## 2. Skills Page Cross-Link

- [x] 2.1 Add a "Read my story →" link on the Skills page (`src/pages/skills.astro`) pointing to `/about`

## 3. Author Title Consistency

- [x] 3.1 Ensure the default `title` prop in `src/modules/blog/components/AuthorCard.astro` is "Software Engineer & Team Lead" to match site-wide positioning

## 4. 404 Page Improvements

- [x] 4.1 Add a "You might be looking for" section to `src/pages/404.astro` with links to Blog, About, and Skills pages

## 5. Verification

- [x] 5.1 Run `npm run build` and verify no build errors
- [x] 5.2 Verify all cross-links navigate to correct pages
- [x] 5.3 Verify AuthorCard shows "Software Engineer & Team Lead" on blog post pages
