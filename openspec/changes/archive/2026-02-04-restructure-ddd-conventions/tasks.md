## 1. Create Module Directory Structure

- [x] 1.1 Create `src/modules/blog/views/` directory
- [x] 1.2 Create `src/modules/blog/components/` directory
- [x] 1.3 Create `src/modules/portfolio/views/` directory
- [x] 1.4 Create `src/modules/portfolio/components/` directory

## 2. Move Blog Components

- [x] 2.1 Move `BlogPostItem.astro` to `modules/blog/components/`
- [x] 2.2 Move `BlogHeader.astro` to `modules/blog/components/`
- [x] 2.3 Move `AuthorCard.astro` to `modules/blog/components/`
- [x] 2.4 Move `FeaturedPosts.astro` to `modules/blog/components/`
- [x] 2.5 Update CSS module imports in moved blog components (if any)

## 3. Move Portfolio Components

- [x] 3.1 Move `Timeline.astro` to `modules/portfolio/components/`
- [x] 3.2 Move `TimelineItem.astro` to `modules/portfolio/components/`
- [x] 3.3 Move `SkillTags.astro` to `modules/portfolio/components/`
- [x] 3.4 Update CSS module imports in moved portfolio components (if any)

## 4. Create View Components

- [x] 4.1 Create `BlogListView.astro` in `modules/blog/views/`
- [x] 4.2 Create `PortfolioSection.astro` in `modules/portfolio/views/`

## 5. Update Imports

- [x] 5.1 Update imports in `src/pages/index.astro`
- [x] 5.2 Update imports in `src/pages/blog/index.astro`
- [x] 5.3 Update imports in `src/pages/blog/[slug].astro`
- [x] 5.4 Update any cross-component imports within modules

## 6. Verification

- [x] 6.1 Run `npm run build` to verify no broken imports
- [x] 6.2 Run `npm run dev` and visually verify all pages render correctly
- [x] 6.3 Verify no components remain in wrong locations
