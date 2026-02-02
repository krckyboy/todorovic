## Context

The portfolio currently uses React components (Skills.tsx, Experience.tsx) with tabbed interfaces requiring user interaction. The About page has a broken ImageSection gallery with no images. Employment data ends at Citrus Systems (Oct 2024).

Current pain points:

- Skills require 2 clicks to see all (tech tab + soft tab)
- Experience requires clicking each company to see roles
- Gallery section shows nothing useful
- Missing 4+ months of career history

## Goals / Non-Goals

**Goals:**

- All skills visible at a glance (no tabs)
- Full career timeline visible immediately
- Remove broken UI elements (gallery)
- Add Constructor Tech employment history
- Modernize Hero section messaging

**Non-Goals:**

- Adding new features beyond presentational changes
- Changing the blog or search functionality
- Adding animations beyond hover states
- Creating new page routes

## Decisions

### Decision 1: Static Astro components over React

**Choice**: Replace React components with static Astro components
**Rationale**: Skills and timeline don't need client-side interactivity. Removing React reduces bundle size and improves performance.
**Alternative**: Keep React but simplify - rejected because no interactivity is needed.

### Decision 2: Tag cloud layout for skills

**Choice**: Flexbox wrap container with pill-styled items
**Rationale**: Simple, responsive, shows everything at once. Familiar pattern users understand.
**Alternative**: CSS Grid with fixed columns - rejected because content length varies.

### Decision 3: Vertical timeline for experience

**Choice**: Left-aligned timeline with year markers and cards
**Rationale**: Natural reading flow (top to bottom = newest to oldest). Shows career progression clearly.
**Alternative**: Horizontal timeline - rejected because it requires horizontal scrolling on mobile.

### Decision 4: Data embedded in components

**Choice**: Hardcode skills and experience data in the components
**Rationale**: This is personal portfolio data that rarely changes. Content Collections would be overkill.
**Alternative**: Create content collections for skills/experience - rejected as over-engineering.

## Risks / Trade-offs

**[Risk]** Deleting React components may break other pages
→ **Mitigation**: Search codebase for imports before deletion; skills.astro is the only consumer.

**[Risk]** Timeline may look sparse with only 5 roles
→ **Mitigation**: Design accommodates growth; current roles fill the viewport well.

**[Trade-off]** Hardcoded data vs content collections
→ Skills/experience change rarely; quick edits in component are acceptable for a personal site.
