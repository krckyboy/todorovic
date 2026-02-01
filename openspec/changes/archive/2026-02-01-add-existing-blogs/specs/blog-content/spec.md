# Delta Spec: Blog Content

## ADDED Requirements

### Requirement: Blog Post - Burnout in Software Engineering

A blog post about burnout in software engineering SHALL be created.

#### Scenario: Post exists with correct metadata

- **WHEN** viewing the blog listing
- **THEN** "Burnout in Software Engineering" appears with date 2024-06-08

#### Scenario: Post has required frontmatter

- **WHEN** inspecting the markdown file
- **THEN** it contains title, description, pubDate, and tags

#### Scenario: Post renders correctly

- **WHEN** visiting /blog/burnout-in-software-engineering
- **THEN** the full post content displays with proper formatting

### Requirement: Blog Post - Unlocking Opportunities

A blog post about conferences SHALL be created.

#### Scenario: Post exists with correct metadata

- **WHEN** viewing the blog listing
- **THEN** "Unlocking Opportunities: Why Conferences Matter" appears with date 2024-06-02

#### Scenario: Post has required frontmatter

- **WHEN** inspecting the markdown file
- **THEN** it contains title, description, pubDate, and tags

#### Scenario: Post renders correctly

- **WHEN** visiting /blog/unlocking-opportunities-why-conferences-matter
- **THEN** the full post content displays with proper formatting

### Requirement: Content Collection Compatibility

All blog posts SHALL work with Astro Content Collections.

#### Scenario: Build succeeds with new posts

- **WHEN** running npm run build
- **THEN** build completes without Content Collection errors

#### Scenario: Posts appear in blog listing

- **WHEN** visiting /blog
- **THEN** both new posts appear in the listing sorted by date
