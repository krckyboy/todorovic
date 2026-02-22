## ADDED Requirements

### Requirement: Blog post presentation services are runtime-scoped

Blog post presentation logic SHALL be implemented through runtime-scoped services so server and client rendering paths do not import incompatible modules.

#### Scenario: Server surfaces use server presenter

- **WHEN** a server-rendered blog surface works with `CollectionEntry<'blog'>` data
- **THEN** it uses a server-side blog presenter service for UI view-model derivation

#### Scenario: Client surfaces avoid server-only imports

- **WHEN** a client-rendered blog surface (React island) derives blog post presentation state
- **THEN** it uses a client-safe presenter input shape (serialized data)
- **AND** it does not import modules that depend on `astro:content`

### Requirement: PostCard consumes a unified post view model

`PostCard` SHALL receive a single post view-model prop rather than repeated scalar props.

#### Scenario: Blog list/filter provides card data

- **WHEN** `/blog` list/filter renders post cards
- **THEN** each card is rendered from a presenter-produced view model
- **AND** draft badge semantics remain consistent with shared policy helpers

#### Scenario: Featured/post item surfaces provide card data

- **WHEN** `BlogPostItem` (or equivalent server list items) renders `PostCard`
- **THEN** it passes a single presenter-produced post view model
- **AND** card behavior matches `/blog` card behavior for shared fields

### Requirement: Blog detail page context is service-derived

The `/blog/[slug]` page SHALL derive navigation and related-post context through a blog service rather than inline page logic.

#### Scenario: Navigation context is prepared in service

- **WHEN** rendering a blog detail page
- **THEN** previous/next post resolution is produced by a service function
- **AND** the page consumes this prepared context for rendering

#### Scenario: Related-post exclusion inputs are prepared in service

- **WHEN** rendering related posts on a blog detail page
- **THEN** exclusion slug inputs are produced by the same context service
- **AND** rendered related post behavior remains unchanged
