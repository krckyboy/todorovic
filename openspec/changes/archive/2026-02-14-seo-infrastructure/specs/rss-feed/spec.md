## ADDED Requirements

### Requirement: RSS feed endpoint

The site SHALL serve an RSS 2.0 feed at `/rss.xml` containing all published (non-draft) blog posts. The feed SHALL be generated using `@astrojs/rss` and include: title, description, site URL, and individual items with title, pubDate, description, and link.

#### Scenario: RSS feed lists all published posts

- **WHEN** a client requests /rss.xml
- **THEN** the response is valid RSS 2.0 XML
- **AND** each non-draft blog post appears as an item
- **AND** each item includes the post title, publication date, description, and permalink

#### Scenario: Draft posts excluded from feed

- **WHEN** a blog post has draft: true in frontmatter
- **THEN** it does not appear in the RSS feed

### Requirement: RSS feed metadata

The RSS feed SHALL include channel-level metadata: site title, site description, and site URL matching the Astro site configuration.

#### Scenario: Feed channel metadata

- **WHEN** parsing the RSS feed channel element
- **THEN** the title matches the site name
- **AND** the link matches the configured Astro site URL
