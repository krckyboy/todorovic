## MODIFIED Requirements

### Requirement: Blog components location

Blog-specific presentational components SHALL be located in `src/modules/blog/components/`.

The following components SHALL be in this module:

- `BlogPostItem.astro` - Renders a single blog post card/item
- `BlogHeader.astro` - Header for blog post pages
- `AuthorCard.astro` - Displays author information
- `FeaturedPosts.astro` - Displays featured/recent posts

The `AuthorCard` component SHALL use a canonical default avatar path and provide resilient fallback behavior when avatar assets fail to load.

#### Scenario: Components are in module

- **WHEN** looking for `AuthorCard`
- **THEN** it exists at `src/modules/blog/components/AuthorCard.astro`

#### Scenario: AuthorCard uses canonical avatar path

- **WHEN** `AuthorCard` renders without an explicit `avatarSrc` prop
- **THEN** the avatar source defaults to `/images/dusan.png`

#### Scenario: AuthorCard fallback behavior

- **WHEN** the provided avatar source cannot be loaded
- **THEN** `AuthorCard` renders a fallback avatar state without broken-image UI
