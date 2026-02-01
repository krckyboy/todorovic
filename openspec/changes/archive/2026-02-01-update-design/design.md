## Context

The current portfolio design is minimal/placeholder. The site needs a polished, professional design that reflects Dušan Todorović's identity as a software engineer. The existing site at todorovic.dev serves as a reference point.

Current state:

- Basic Astro setup with minimal styling
- CSS custom properties defined but limited
- Components exist but need visual refinement
- Mobile-first approach already in place

## Goals / Non-Goals

**Goals:**

- Create a cohesive visual identity with refined design tokens
- Improve typography, spacing, and visual hierarchy
- Add visual interest (gradients, subtle animations)
- Ensure excellent mobile experience
- Redesign Header, Footer, and page layouts
- Create supporting components (Skills, Experience, AuthorCard, Categories)

**Non-Goals:**

- Dark/light theme toggle (separate proposal)
- Search functionality (separate proposal: add-pagefind-search)
- Content changes to blog posts
- JavaScript-heavy interactions

## Decisions

### 1. Design Token System

**Decision**: Extend CSS custom properties in global.css with comprehensive design tokens.

**Rationale**:

- Maintains consistency across all components
- Easy to update site-wide colors, spacing, typography
- Already using this approach, just needs expansion

**Alternatives considered**:

- Tailwind CSS: Would require significant refactoring, adds complexity
- CSS-in-JS: Doesn't align with Astro's static-first approach

### 2. Component Architecture

**Decision**: Keep existing CSS Modules pattern, create new components where needed.

**Rationale**:

- CSS Modules already scoped, prevents conflicts
- Follows established project conventions
- Good performance (styles extracted at build time)

### 3. Layout Approach

**Decision**: Enhance BaseLayout with semantic landmark regions, add Hero component for home.

**Rationale**:

- Semantic HTML improves accessibility
- Hero section creates strong visual entry point
- Consistent wrapper structure across pages

### 4. Typography Scale

**Decision**: Use fluid typography with clamp() for responsive text sizing.

**Rationale**:

- Smooth scaling without breakpoints
- Better reading experience across devices
- Modern CSS approach

### 5. Animation Strategy

**Decision**: Subtle CSS transitions only, respect prefers-reduced-motion.

**Rationale**:

- Enhances UX without distraction
- Accessible to motion-sensitive users
- No JavaScript dependency

## Risks / Trade-offs

**[Risk] Design may not match user's vision** → Mitigation: Design tokens make iteration quick, components are modular.

**[Risk] Too many components increases maintenance** → Mitigation: Only create components with clear reuse value.

**[Trade-off] Fluid typography requires careful testing** → Benefits of smooth scaling outweigh added testing effort.

**[Trade-off] No dark mode in this phase** → Keeps scope manageable, design tokens will make dark mode easier to add later.
