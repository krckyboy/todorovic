## MODIFIED Requirements

### Requirement: Blog components location

Blog-specific presentational components SHALL be located in `src/modules/blog/components/`.

The following components SHALL be moved:

- `BlogPostItem.astro` - Renders a single blog post card/item
- `BlogHeader.astro` - Header for blog post pages with reading time display
- `AuthorCard.astro` - Displays author information
- `FeaturedPosts.astro` - Displays featured/recent posts

The `AuthorCard` component SHALL use "Frontend Team Lead" as the default title prop value, matching the Hero section's positioning.

#### Scenario: Components are in module

- **WHEN** looking for BlogPostItem component
- **THEN** it exists at `src/modules/blog/components/BlogPostItem.astro`

#### Scenario: Components not in global

- **WHEN** checking `src/components/` directory
- **THEN** BlogPostItem.astro does not exist there
- **AND** BlogHeader.astro does not exist there
- **AND** AuthorCard.astro does not exist there
- **AND** FeaturedPosts.astro does not exist there

#### Scenario: AuthorCard default title matches Hero

- **WHEN** AuthorCard renders without an explicit title prop
- **THEN** the displayed title is "Frontend Team Lead"
