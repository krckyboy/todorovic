## 1. About Page CTA

- [ ] 1.1 Replace the plain text "reach out through social links in the footer" in `src/pages/about.astro` with a styled "Get in Touch" button linking to `mailto:dusan.todorovic.dev@gmail.com`
- [ ] 1.2 Add a "View my skills →" link at the end of the bio section in `src/pages/about.astro` pointing to `/skills`

## 2. Skills Page Cross-Link

- [ ] 2.1 Add a "Read my story →" link on the Skills page (`src/pages/skills.astro`) pointing to `/about`

## 3. Author Title Consistency

- [ ] 3.1 Change the default `title` prop in `src/modules/blog/components/AuthorCard.astro` from "JavaScript Developer | Team Leader" to "Frontend Team Lead"

## 4. Breadcrumbs

- [ ] 4.1 Add breadcrumb navigation ("Home / About") to `src/pages/about.astro` following the BlogHeader.astro breadcrumb pattern
- [ ] 4.2 Add breadcrumb navigation ("Home / Skills & Experience") to `src/pages/skills.astro`

## 5. Hero Blog CTA

- [ ] 5.1 Add a "Read my latest article →" link to the Hero actions in `src/components/Hero.astro` pointing to `/blog`
- [ ] 5.2 Update `src/components/Hero.module.css` if needed for the additional CTA styling

## 6. 404 Page Improvements

- [ ] 6.1 Add a "You might be looking for" section to `src/pages/404.astro` with links to Blog, About, and Skills pages

## 7. Verification

- [ ] 7.1 Run `npm run build` and verify no build errors
- [ ] 7.2 Verify all cross-links navigate to correct pages
- [ ] 7.3 Verify breadcrumbs display correctly on About and Skills pages
- [ ] 7.4 Verify AuthorCard shows "Frontend Team Lead" on blog post pages
