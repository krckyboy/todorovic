## ADDED Requirements

### Requirement: Default OG image fallback

The system SHALL provide a default og:image meta tag on every page when no explicit social image is provided. The fallback image SHALL be a static branded image served from the public directory.

#### Scenario: Page without explicit image

- **WHEN** a page is rendered without a socialImageURL prop
- **THEN** the og:image meta tag uses the default fallback image URL based on Astro.site

#### Scenario: Page with explicit image

- **WHEN** a page provides a socialImageURL prop
- **THEN** the og:image meta tag uses the provided image URL

### Requirement: BlogPosting JSON-LD on blog posts

Each individual blog post page SHALL include a `<script type="application/ld+json">` block containing a valid Schema.org BlogPosting object. The structured data SHALL include: headline, datePublished, dateModified (if available), author (as Person), description, and url.

#### Scenario: Blog post renders structured data

- **WHEN** a blog post page at /blog/[slug] is rendered
- **THEN** the HTML contains a script tag with type="application/ld+json"
- **AND** the JSON contains "@type": "BlogPosting"
- **AND** the headline matches the post title
- **AND** the datePublished matches the post's pubDate
- **AND** the author contains "@type": "Person" with the author name

#### Scenario: Blog post with updated date

- **WHEN** a blog post has an updatedDate in frontmatter
- **THEN** the JSON-LD includes dateModified with the updated date value

### Requirement: Person JSON-LD on homepage

The homepage SHALL include a `<script type="application/ld+json">` block containing a valid Schema.org Person object for the site owner. The structured data SHALL include: name, jobTitle, url, and sameAs links to social profiles.

#### Scenario: Homepage renders Person structured data

- **WHEN** the homepage at / is rendered
- **THEN** the HTML contains a script tag with type="application/ld+json"
- **AND** the JSON contains "@type": "Person"
- **AND** the name, jobTitle, and url fields are populated

### Requirement: robots.txt

A robots.txt file SHALL exist at the site root that allows all crawlers and references the sitemap URL.

#### Scenario: robots.txt is accessible

- **WHEN** a crawler requests /robots.txt
- **THEN** the response contains "Sitemap: https://todorovic.dev/sitemap-index.xml"
- **AND** the response allows all user agents
