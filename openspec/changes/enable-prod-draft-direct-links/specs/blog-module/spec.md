## ADDED Requirements

### Requirement: Production draft routes are generated for direct access

The blog post route generation SHALL include draft posts in production so draft slugs can be accessed directly.

#### Scenario: Draft slug is present in static paths

- **WHEN** production static paths are generated for `/blog/[slug]`
- **THEN** posts with `draft: true` are included in route generation
- **AND** a built page exists for each draft slug

### Requirement: Draft posts are excluded from browse surfaces

Draft posts SHALL remain hidden from public listing surfaces.

#### Scenario: Blog index excludes drafts in production

- **WHEN** `/blog` is rendered in production
- **THEN** posts with `draft: true` are not present in the listing

#### Scenario: Homepage featured posts exclude drafts in production

- **WHEN** homepage featured posts are rendered in production
- **THEN** posts with `draft: true` are not included

### Requirement: Direct draft pages retain draft context

A directly opened draft post page SHALL expose draft state to users and search engines safely.

#### Scenario: Draft badge is visible on direct draft page

- **WHEN** a production user opens a direct draft URL
- **THEN** draft UI indicators remain visible on the post page

#### Scenario: Draft page is marked noindex

- **WHEN** a draft post page is rendered
- **THEN** it includes a `robots` meta directive with `noindex`

### Requirement: Draft pages are excluded from site search index

Draft pages SHALL be omitted from the client-side search index while remaining routable by exact URL.

#### Scenario: Pagefind index excludes draft pages

- **WHEN** a production build generates the Pagefind index
- **THEN** draft post pages are not indexed as searchable bodies
- **AND** published pages remain indexed
