## MODIFIED Requirements

### Requirement: Blog components location

Blog-specific presentational components SHALL be located in `src/modules/blog/components/`.

The following components SHALL be moved:

- `BlogPostItem.astro` - Renders a single blog post card/item
- `BlogHeader.astro` - Header for blog post pages with reading time display
- `AuthorCard.astro` - Displays author information
- `FeaturedPosts.astro` - Displays featured/recent posts

The `BlogHeader` component SHALL display the actual reading time calculated from the post content. The reading time value SHALL be passed as a prop from the blog post page rather than using a hardcoded default.

#### Scenario: Components are in module

- **WHEN** looking for BlogPostItem component
- **THEN** it exists at `src/modules/blog/components/BlogPostItem.astro`

#### Scenario: Components not in global

- **WHEN** checking `src/components/` directory
- **THEN** BlogPostItem.astro does not exist there
- **AND** BlogHeader.astro does not exist there
- **AND** AuthorCard.astro does not exist there
- **AND** FeaturedPosts.astro does not exist there

#### Scenario: Reading time is calculated from content

- **WHEN** a blog post page renders BlogHeader
- **THEN** the readingTime prop contains the actual calculated reading time string (e.g., "3 min read")
- **AND** the value is computed from the post body using the reading-time package
