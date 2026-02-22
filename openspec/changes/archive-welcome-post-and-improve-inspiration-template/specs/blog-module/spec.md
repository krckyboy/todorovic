## ADDED Requirements

### Requirement: Archived blog posts are excluded from routable and list-visible surfaces

The blog module SHALL support an `archived` content state that keeps posts in-repo while excluding them from route generation and listing/filter surfaces.

#### Scenario: Archived post is excluded from static paths

- **WHEN** blog static paths are generated for `/blog/[slug]`
- **THEN** posts with `archived: true` are not included in routable post selection

#### Scenario: Archived post is excluded from blog listing surfaces

- **WHEN** blog index, featured lists, or tag-filter inputs are derived
- **THEN** posts with `archived: true` are excluded from list-visible selection
- **AND** non-archived draft visibility behavior remains unchanged

### Requirement: Blog content schema supports archived state

Blog frontmatter SHALL include an `archived` boolean flag with default `false`.

#### Scenario: Existing posts remain active by default

- **WHEN** a blog post does not specify `archived`
- **THEN** it is treated as `archived: false`
