## ADDED Requirements

### Requirement: Local page images use Astro optimization pipeline

Local images used in high-visibility page content SHALL be rendered via `Image` from `astro:assets` with import-based sources.

#### Scenario: Hero portrait is optimized

- **WHEN** the homepage hero renders
- **THEN** the portrait image is rendered through `Image` from `astro:assets`
- **AND** its source is imported from `src/assets`

#### Scenario: About page photos are optimized

- **WHEN** the about page renders
- **THEN** each local photo in the main narrative sections uses `Image` from `astro:assets`
- **AND** sources are imported from `src/assets`

### Requirement: Accessibility and layout behavior are preserved

Image optimization migration SHALL preserve accessibility metadata and layout stability.

#### Scenario: Alt text and dimensions remain explicit

- **WHEN** optimized images are rendered
- **THEN** each image has meaningful `alt` text
- **AND** width/height are explicitly provided to preserve layout stability
