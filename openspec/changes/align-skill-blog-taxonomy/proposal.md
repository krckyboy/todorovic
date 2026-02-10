## Why

Skills on the Skills page are currently rendered in a way that implies tag/filter behavior and links into blog filtering. That couples two unrelated concerns: skills representation in portfolio UI and content taxonomy in blog search.

## What Changes

- Treat skills as representation-only UI elements (pills/chips), not filter tags.
- Remove direct skill-to-blog filter links from the Skills page.
- Keep skills visually scannable and semantically clear as profile information.
- If discovery is needed, use explicit CTAs ("Read blog", "Featured posts") instead of implicit per-skill tag links.

## Capabilities

### New Capabilities

- `skills-representation`: Visual and semantic rules for displaying skills as profile metadata, without coupling to blog filtering behavior.

### Modified Capabilities

- `portfolio-module`: Skill items change from interactive filter links to non-interactive representation elements.

## Impact

- **Affected files**: `src/modules/portfolio/components/SkillTags.astro` and `src/modules/portfolio/components/SkillTags.module.css`.
- **Potential new files**: none required.
- **Dependencies**: no new dependencies required.
- **Behavioral change**: Skills page becomes presentation-only; blog discovery remains explicit and separate.
