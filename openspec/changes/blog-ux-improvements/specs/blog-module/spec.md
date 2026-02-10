## MODIFIED Requirements

### Requirement: Blog components location

Blog-specific presentational components SHALL be located in `src/modules/blog/components/`.

The following components SHALL exist:

- `BlogPostItem.astro` - Renders a single blog post card/item
- `BlogHeader.astro` - Header for blog post pages
- `AuthorCard.astro` - Displays author information
- `FeaturedPosts.astro` - Displays featured/recent posts
- `RelatedPosts.astro` - Displays related posts based on tag matching
- `SocialShare.astro` - Social sharing buttons for blog posts
- `PostNavigation.astro` - Prev/next post navigation links

#### Scenario: Components are in module

- **WHEN** looking for any blog component
- **THEN** it exists at `src/modules/blog/components/`

#### Scenario: Components not in global

- **WHEN** checking `src/components/` directory
- **THEN** no blog-specific components exist there

## ADDED Requirements

### Requirement: Clickable tags in BlogHeader

Tags displayed in `BlogHeader` SHALL be rendered as anchor links navigating to `/blog?tags={tagname}` where `{tagname}` is the URL-encoded tag value.

#### Scenario: Tag renders as link

- **WHEN** a blog post has tags
- **THEN** each tag in BlogHeader renders as an `<a>` element
- **AND** the href is `/blog?tags={encodedTagName}`

#### Scenario: Tag link navigates to filtered blog

- **WHEN** a user clicks a tag link in BlogHeader
- **THEN** the browser navigates to the blog index page
- **AND** the BlogFilter component activates the corresponding tag filter

#### Scenario: Tag accessibility

- **WHEN** tags render as links
- **THEN** each tag link SHALL have visible focus states using `:focus-visible`

### Requirement: Clickable tags in BlogPostItem

Tags displayed in `BlogPostItem` SHALL be rendered as anchor links navigating to `/blog?tags={tagname}` where `{tagname}` is the URL-encoded tag value.

#### Scenario: Tag renders as link in post item

- **WHEN** a blog post item displays tags in the list view
- **THEN** each tag renders as an `<a>` element with href `/blog?tags={encodedTagName}`

#### Scenario: Tag click does not trigger parent link

- **WHEN** a user clicks a tag link inside a BlogPostItem
- **THEN** the navigation goes to the filtered blog listing
- **AND** the parent post link is not triggered

#### Scenario: Tag link accessibility

- **WHEN** tags render as links in BlogPostItem
- **THEN** each tag link SHALL have visible focus states using `:focus-visible`

### Requirement: Computed reading time

The `[slug].astro` page SHALL compute the actual reading time from the post content using the `reading-time` package and pass it to `BlogHeader` via the `readingTime` prop.

#### Scenario: Reading time is computed

- **WHEN** a blog post page builds
- **THEN** the reading time is calculated from `post.body` using the `reading-time` package
- **AND** the result text (e.g., "3 min read") is passed to BlogHeader's `readingTime` prop

#### Scenario: Reading time replaces default

- **WHEN** BlogHeader receives a computed readingTime value
- **THEN** the computed value is displayed instead of the default "5 min read"
