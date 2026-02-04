## Context

The portfolio codebase currently has all components in `src/components/`, regardless of whether they're global (Header, Footer) or feature-specific (BlogPostItem, Timeline). The astro-conventions spec already documents DDD module conventions, but they haven't been applied to existing features.

Current structure:

```
src/components/
├── Header.astro         # Global
├── Footer.astro         # Global
├── Navigation.astro     # Global
├── SocialIcons.astro    # Global
├── Hero.astro           # Global
├── ImageAndText.astro   # Global
├── BlogPostItem.astro   # Blog-specific
├── BlogHeader.astro     # Blog-specific
├── AuthorCard.astro     # Blog-specific
├── FeaturedPosts.astro  # Blog-specific
├── Timeline.astro       # Portfolio-specific
├── TimelineItem.astro   # Portfolio-specific
└── SkillTags.astro      # Portfolio-specific
```

## Goals / Non-Goals

**Goals:**

- Organize feature-specific components into DDD modules
- Create clear separation between global and feature components
- Follow the module structure defined in astro-conventions spec
- Establish views as entry points that orchestrate components

**Non-Goals:**

- Changing component functionality or behavior
- Adding new features or services
- Creating React hooks (this is an Astro-only project)
- Creating index.ts barrel exports (not idiomatic for Astro)

## Decisions

### 1. Module Structure

Use simplified Astro-appropriate structure (no hooks/index.ts):

```
src/modules/<feature>/
├── views/           # Entry components for pages
├── components/      # Internal presentational components
└── services/        # Business logic and types (if needed)
```

**Rationale**: Astro components are imported directly by path, not through barrel exports. The hooks/ directory is React-specific.

### 2. Component Classification

| Component                                           | Classification        | Location                        |
| --------------------------------------------------- | --------------------- | ------------------------------- |
| Header, Footer, Navigation                          | Global layout         | `components/`                   |
| SocialIcons                                         | Global utility        | `components/`                   |
| Hero, ImageAndText                                  | Global content blocks | `components/`                   |
| BlogPostItem, BlogHeader, AuthorCard, FeaturedPosts | Blog feature          | `modules/blog/components/`      |
| Timeline, TimelineItem, SkillTags                   | Portfolio feature     | `modules/portfolio/components/` |

**Rationale**: Global components are used across multiple pages/features. Feature components are only used within their domain.

### 3. Views as Page Orchestrators

Create view components that:

- Import and compose feature components
- Handle data fetching where appropriate
- Are imported by page files in `src/pages/`

**Rationale**: Pages should be thin routing layers; views contain the feature logic.

### 4. No Services Initially

Don't create services/ files in this change unless extracting existing inline logic.

**Rationale**: Avoid over-engineering. Add services when there's actual business logic to extract.

## Risks / Trade-offs

**[Risk]** Import paths become longer (e.g., `../modules/blog/components/BlogPostItem.astro`)
→ **Mitigation**: Path aliases could be added later if needed; clarity outweighs brevity.

**[Risk]** Some components might fit multiple modules (e.g., AuthorCard could be global)
→ **Mitigation**: Start with feature-first classification; refactor if reuse emerges.

**[Trade-off]** More directories to navigate
→ **Benefit**: Clear ownership and domain boundaries; easier to understand feature scope.
