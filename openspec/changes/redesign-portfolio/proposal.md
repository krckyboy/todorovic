> **STATUS: MOSTLY COMPLETE** as of February 14, 2026.
> Core redesign implementation is done; remaining work is validation across responsive, dark mode, and keyboard-accessibility checks.

## Why

The current portfolio has a tabbed skills interface and experience section that require clicking to explore, a broken gallery section with no images, and outdated employment info (missing Constructor Tech). Modernizing to a scannable tag cloud for skills and a vertical timeline for experience improves usability and showcases career progression at a glance.

## What Changes

- **Skills Section**: Replace tabbed interface with simple tag cloud showing all skills at once
- **Experience Section**: Replace tabbed company selector with vertical timeline showing all roles
- **About Page**: Remove broken Gallery section, update bio copy to be more memorable
- **Experience Data**: Add Constructor Tech roles (Senior Frontend Engineer Dec 2024, Frontend Team Lead Jan 2025 - Present)
- **Home Page**: Update Hero title/intro, simplify CTAs, rename "Recent Posts" to "From the Blog"

## Capabilities

### New Capabilities

- `skill-tags`: Tag cloud component for displaying skills as pills with hover effects
- `timeline`: Vertical timeline component for displaying career history with year markers

### Modified Capabilities

- `astro-conventions`: No requirement changes - using existing component patterns

## Impact

- **Files to Create**: SkillTags.astro, Timeline.astro, TimelineItem.astro + CSS Modules
- **Files to Delete**: Skills.tsx, SkillSection.tsx, Experience.tsx, ImageSection.astro + CSS Modules
- **Files to Modify**: skills.astro, about.astro, Hero.astro, index.astro, FeaturedPosts.astro
- **Dependencies**: None - all changes are presentational

## UX Outcomes

- Skills and career history are now scannable at first glance, without tab interactions.
- Portfolio messaging is more current and aligned with current role/title.
- Broken or empty sections are removed, reducing visual noise and dead UI.
