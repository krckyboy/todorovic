## ADDED Requirements

### Requirement: Related posts component

A `RelatedPosts` component SHALL exist at `src/modules/blog/components/RelatedPosts.astro` with an accompanying CSS module. It SHALL accept the current post and all posts as props, display up to 3 related posts based on shared tags, and fall back to recent posts when insufficient tag overlap exists. The current post SHALL be excluded from the results.

#### Scenario: Posts share tags with current post

- **WHEN** other posts share one or more tags with the current post
- **THEN** up to 3 posts are displayed, sorted by tag overlap count descending then by pubDate descending
- **AND** the current post is not shown in the results

#### Scenario: No posts share tags

- **WHEN** no other posts share any tags with the current post
- **THEN** up to 3 most recent posts (by pubDate descending) are displayed, excluding the current post

#### Scenario: Fewer than 2 tag-matched posts

- **WHEN** fewer than 2 posts share tags with the current post
- **THEN** remaining slots (up to 3 total) are filled with recent posts that are not already included

#### Scenario: Only one other post exists

- **WHEN** only one other post exists in the collection
- **THEN** that single post is displayed
- **AND** no empty state or placeholder is shown

#### Scenario: Component rendering

- **WHEN** the RelatedPosts component renders
- **THEN** each related post displays its title, publication date, and description
- **AND** each post title links to `/blog/{slug}`
- **AND** the section has a heading "Related Posts"

### Requirement: Social sharing component

A `SocialShare` component SHALL exist at `src/modules/blog/components/SocialShare.astro` with an accompanying CSS module. It SHALL provide sharing options for LinkedIn, Twitter/X, and a copy-link button.

#### Scenario: LinkedIn share button

- **WHEN** user clicks the LinkedIn share button
- **THEN** a new tab opens with the LinkedIn share URL containing the encoded post URL

#### Scenario: Twitter/X share button

- **WHEN** user clicks the Twitter/X share button
- **THEN** a new tab opens with the Twitter intent URL containing the encoded post URL and post title as text

#### Scenario: Copy link button

- **WHEN** user clicks the copy-link button
- **THEN** the current post URL is copied to the clipboard using the Clipboard API
- **AND** visual feedback is shown to confirm the copy action

#### Scenario: Component props

- **WHEN** the SocialShare component is used
- **THEN** it SHALL accept `url` (string) and `title` (string) as required props

#### Scenario: Accessibility

- **WHEN** the sharing buttons render
- **THEN** each button/link SHALL have an accessible label describing its action
- **AND** external links SHALL have `rel="noopener noreferrer"` and `target="_blank"`

### Requirement: Post navigation component

A `PostNavigation` component SHALL exist at `src/modules/blog/components/PostNavigation.astro` with an accompanying CSS module. It SHALL display links to the previous and next posts in chronological order.

#### Scenario: Post has both prev and next

- **WHEN** the current post has both an older and a newer post
- **THEN** both "Previous" and "Next" links are displayed
- **AND** "Previous" links to the older post and "Next" links to the newer post

#### Scenario: Newest post (no next)

- **WHEN** the current post is the most recent post
- **THEN** only the "Previous" link is displayed

#### Scenario: Oldest post (no previous)

- **WHEN** the current post is the oldest post
- **THEN** only the "Next" link is displayed

#### Scenario: Navigation display

- **WHEN** the PostNavigation component renders
- **THEN** each link displays the direction label ("Previous" or "Next") and the target post title
- **AND** links navigate to `/blog/{slug}`

#### Scenario: Only one post exists

- **WHEN** the current post is the only post in the collection
- **THEN** the PostNavigation component SHALL not render any output

### Requirement: Blog post page integration

The `[slug].astro` page SHALL integrate all new components in the correct order: BlogHeader, post content, SocialShare, AuthorCard, PostNavigation, RelatedPosts.

#### Scenario: Component order on page

- **WHEN** a blog post page renders
- **THEN** components appear in order: BlogHeader, post content, SocialShare, AuthorCard, PostNavigation, RelatedPosts

#### Scenario: Data passing

- **WHEN** the blog post page builds
- **THEN** it SHALL pass all posts to RelatedPosts
- **AND** it SHALL pass prev/next posts to PostNavigation
- **AND** it SHALL pass the post URL and title to SocialShare
- **AND** it SHALL compute and pass reading time to BlogHeader

#### Scenario: SocialShare receives canonical absolute URL

- **WHEN** SocialShare receives the post URL
- **THEN** the URL is absolute and canonical for the current slug
- **AND** includes the trailing slash style used by blog routes

### Requirement: New components follow project conventions

All new components SHALL follow the project's Astro component conventions.

#### Scenario: Component structure

- **WHEN** examining any new component file
- **THEN** it SHALL have a TypeScript Props interface
- **AND** it SHALL use CSS Modules for styling
- **AND** it SHALL use CSS custom properties from global.css
- **AND** it SHALL follow mobile-first responsive design
- **AND** it SHALL include `:focus-visible` states for interactive elements

#### Scenario: Reduced motion support

- **WHEN** the user prefers reduced motion
- **THEN** all transitions and animations in new components SHALL be disabled via `@media (prefers-reduced-motion: reduce)`
