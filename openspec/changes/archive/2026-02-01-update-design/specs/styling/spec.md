# Delta Spec: Styling Updates

## MODIFIED Requirements

### Requirement: CSS Custom Properties

All style values MUST use CSS custom properties from `src/styles/global.css`. The design token system SHALL be expanded to include additional properties for comprehensive design coverage.

#### Available Properties

```css
/* Colors */
--color-primary
--color-primary-light
--color-primary-dark
--color-text
--color-text-muted
--color-background
--color-background-alt
--color-border
--color-accent
--color-success
--color-error

/* Gradients */
--gradient-primary
--gradient-subtle

/* Spacing */
--spacing-xs
--spacing-sm
--spacing-md
--spacing-lg
--spacing-xl
--spacing-2xl
--spacing-3xl

/* Typography */
--font-family-base
--font-family-heading
--font-size-xs
--font-size-sm
--font-size-base
--font-size-lg
--font-size-xl
--font-size-2xl
--font-size-3xl
--font-size-4xl
--font-weight-normal
--font-weight-medium
--font-weight-bold
--line-height-tight
--line-height-normal
--line-height-relaxed

/* Effects */
--border-radius-sm
--border-radius-md
--border-radius-lg
--border-radius-full
--transition-fast
--transition-normal
--shadow-sm
--shadow-md
--shadow-lg

/* Layout */
--max-width-content
--max-width-prose
```

#### Scenario: Expanded design tokens are available

- **WHEN** a component needs styling
- **THEN** all required design tokens are available in global.css

#### Scenario: Fluid typography works across screen sizes

- **WHEN** viewing on mobile, tablet, and desktop
- **THEN** font sizes scale smoothly using clamp() values

## ADDED Requirements

### Requirement: Hero Section Styling

The home page SHALL include a hero section with prominent typography and optional gradient background.

#### Scenario: Hero displays on home page

- **WHEN** user visits the home page
- **THEN** a hero section with name, title, and brief intro is displayed

#### Scenario: Hero is responsive

- **WHEN** viewing on mobile
- **THEN** hero content stacks vertically with appropriate spacing

### Requirement: Card Component Styling

Cards SHALL have consistent styling with subtle shadows and hover effects.

#### Scenario: Card hover interaction

- **WHEN** user hovers over a card
- **THEN** card elevates with increased shadow

#### Scenario: Card respects reduced motion

- **WHEN** user has prefers-reduced-motion enabled
- **THEN** hover transitions are disabled

### Requirement: Skills Component Styling

Skills page SHALL display skills in categorized groups with visual tags.

#### Scenario: Skills are grouped by category

- **WHEN** viewing skills page
- **THEN** skills are organized under category headings

#### Scenario: Skill tags have consistent styling

- **WHEN** viewing skill tags
- **THEN** each tag uses pill-shaped styling with primary color accent

### Requirement: Experience Component Styling

About page SHALL display work experience in a timeline or card format.

#### Scenario: Experience entries show chronologically

- **WHEN** viewing about page
- **THEN** experience entries display with dates and descriptions

### Requirement: Author Card Component Styling

Blog posts SHALL include an author card at the bottom.

#### Scenario: Author card displays after post content

- **WHEN** reading a blog post
- **THEN** author card with name, avatar, and bio appears after content

### Requirement: Categories Component Styling

Blog listing SHALL include category filters.

#### Scenario: Category filters are clickable

- **WHEN** user clicks a category filter
- **THEN** blog posts filter to show only that category

#### Scenario: Active category is visually distinct

- **WHEN** a category is selected
- **THEN** it displays with primary color background
