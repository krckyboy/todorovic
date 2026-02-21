## ADDED Requirements

### Requirement: Optimized default social image fallback

The system SHALL provide a default social preview image at `/og-default.jpg` with dimensions 1200x630 pixels and file size below 600 KB.

#### Scenario: Default image meets platform-friendly constraints

- **WHEN** inspecting `public/og-default.jpg`
- **THEN** its pixel dimensions are exactly 1200 by 630
- **AND** its file size is less than 600 KB

### Requirement: Neutral default OG card composition

The default social preview image SHALL remain neutral and SHALL NOT include a CTA button.

#### Scenario: Default fallback image does not include CTA button

- **WHEN** generating the default OG image from `scripts/generate-og-default.swift`
- **THEN** the output card has no CTA button text or button block

### Requirement: Blog OG CTA placement and styling

The blog OG generator SHALL retain a blog-oriented CTA button, place it in the bottom-right region of the card, and avoid decorative motif overlap near the CTA area.

#### Scenario: Blog OG images use bottom-right CTA style

- **WHEN** generating blog OG images from `scripts/generate-og-blog.mjs`
- **THEN** each generated image includes a blog-oriented CTA button in the bottom-right region
- **AND** square/circle decorative motif elements are not rendered

### Requirement: Complete social image metadata tags

Pages rendered via `BaseLayout.astro` SHALL emit Open Graph and Twitter social image tags including image URL and image alt text, and SHALL emit Open Graph image dimensions.

#### Scenario: Social metadata includes image and accessibility hints

- **WHEN** rendering a page with `BaseLayout.astro`
- **THEN** `og:image`, `og:image:alt`, `og:image:width`, and `og:image:height` meta tags are present
- **AND** `twitter:image` and `twitter:image:alt` meta tags are present

### Requirement: Homepage metadata copy length optimization

The homepage SHALL use concise title copy and expanded description copy sized for stronger social preview readability, with description length between 110 and 160 characters.

#### Scenario: Homepage copy follows recommended ranges

- **WHEN** reading metadata constants in `src/pages/index.astro`
- **THEN** the `title` communicates role-focused identity without requiring a writer label
- **AND** the `description` length is between 110 and 160 characters
