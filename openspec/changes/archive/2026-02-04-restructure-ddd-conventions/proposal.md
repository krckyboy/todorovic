## Why

The codebase currently has all components in a flat `src/components/` directory, mixing global shared components with feature-specific ones. This makes it harder to understand component ownership and doesn't leverage Domain-Driven Design principles that are already documented in the astro-conventions spec.

## What Changes

- Create `modules/blog/` with views/, components/, and services/ subdirectories
- Create `modules/portfolio/` with views/, components/, and services/ subdirectories
- Move blog-related components (BlogPostItem, BlogHeader, AuthorCard, FeaturedPosts) to `modules/blog/components/`
- Move portfolio-related components (Timeline, TimelineItem, SkillTags) to `modules/portfolio/components/`
- Create view components that orchestrate feature logic
- Keep global/shared components (Header, Footer, Navigation, SocialIcons, Hero, ImageAndText) in `src/components/`
- Update all import paths throughout the codebase

## Capabilities

### New Capabilities

- `blog-module`: DDD module structure for blog-related components, views, and services
- `portfolio-module`: DDD module structure for portfolio-related components, views, and services

### Modified Capabilities

(none - this is a structural reorganization following existing DDD conventions)

## Impact

- **Files moved**: 7 components moving to modules
- **Import updates**: All pages and components that import moved components
- **No functional changes**: Pure restructuring, no behavior changes
- **Pages affected**: index.astro, blog/index.astro, blog/[slug].astro
