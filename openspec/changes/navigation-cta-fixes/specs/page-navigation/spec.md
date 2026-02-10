## ADDED Requirements

### Requirement: About page contact CTA

The About page SHALL have a styled CTA button in the "Get in Touch" section that links directly to the site owner's email address via a `mailto:` link. The button SHALL use the site's primary button styling.

#### Scenario: CTA is a clickable button

- **WHEN** viewing the About page
- **THEN** the "Get in Touch" section contains a styled button element
- **AND** the button links to `mailto:dusan.todorovic.dev@gmail.com`

### Requirement: About and Skills cross-linking

The About page SHALL contain a link to the Skills page, and the Skills page SHALL contain a link to the About page.

#### Scenario: About links to Skills

- **WHEN** viewing the About page
- **THEN** there is a visible "View my skills" link pointing to `/skills`

#### Scenario: Skills links to About

- **WHEN** viewing the Skills page
- **THEN** there is a visible "Read my story" link pointing to `/about`

### Requirement: Breadcrumbs on About and Skills

The About and Skills pages SHALL display breadcrumb navigation showing "Home / Page Name", following the same visual pattern as blog post breadcrumbs in BlogHeader.astro.

#### Scenario: About page breadcrumb

- **WHEN** viewing the About page
- **THEN** a breadcrumb displays "Home" (linked to /) followed by "About"

#### Scenario: Skills page breadcrumb

- **WHEN** viewing the Skills page
- **THEN** a breadcrumb displays "Home" (linked to /) followed by "Skills & Experience"

### Requirement: Hero blog CTA

The Hero section SHALL include a link to the blog page alongside the existing "About Me" and "View Experience" CTAs.

#### Scenario: Blog link in Hero

- **WHEN** viewing the homepage Hero section
- **THEN** there is a visible "Read my latest article" link pointing to `/blog`

### Requirement: 404 page content suggestions

The 404 page SHALL include a "You might be looking for" section with links to the Blog, About, and Skills pages, in addition to the existing "Go Home" button.

#### Scenario: 404 shows suggestions

- **WHEN** viewing the 404 error page
- **THEN** links to `/blog`, `/about`, and `/skills` are visible below the error message
