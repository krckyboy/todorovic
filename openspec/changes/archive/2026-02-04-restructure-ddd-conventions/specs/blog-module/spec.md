## ADDED Requirements

### Requirement: Blog module structure

The blog module SHALL be located at `src/modules/blog/` and follow the DDD module structure with views/ and components/ subdirectories.

#### Scenario: Module directory exists

- **WHEN** checking the file system
- **THEN** `src/modules/blog/views/` directory exists
- **AND** `src/modules/blog/components/` directory exists

### Requirement: Blog components location

Blog-specific presentational components SHALL be located in `src/modules/blog/components/`.

The following components SHALL be moved:

- `BlogPostItem.astro` - Renders a single blog post card/item
- `BlogHeader.astro` - Header for blog post pages
- `AuthorCard.astro` - Displays author information
- `FeaturedPosts.astro` - Displays featured/recent posts

#### Scenario: Components are in module

- **WHEN** looking for BlogPostItem component
- **THEN** it exists at `src/modules/blog/components/BlogPostItem.astro`

#### Scenario: Components not in global

- **WHEN** checking `src/components/` directory
- **THEN** BlogPostItem.astro does not exist there
- **AND** BlogHeader.astro does not exist there
- **AND** AuthorCard.astro does not exist there
- **AND** FeaturedPosts.astro does not exist there

### Requirement: Blog view component

A view component SHALL exist at `src/modules/blog/views/` to orchestrate blog list functionality.

#### Scenario: Blog list view exists

- **WHEN** rendering the blog index page
- **THEN** it imports from `src/modules/blog/views/`

### Requirement: Import path updates

All imports of moved blog components SHALL be updated to use the new module paths.

#### Scenario: Pages import from module

- **WHEN** a page needs BlogPostItem
- **THEN** it imports from `@modules/blog/components/BlogPostItem.astro` or relative equivalent
