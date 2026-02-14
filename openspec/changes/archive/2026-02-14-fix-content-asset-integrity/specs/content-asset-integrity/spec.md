## ADDED Requirements

### Requirement: Canonical local profile asset paths

The system SHALL use canonical local paths for profile assets referenced by UI components. Author avatar assets SHALL be served from `public/images/` and referenced via `/images/...` URLs.

#### Scenario: Canonical avatar path used

- **WHEN** `AuthorCard` renders with default props
- **THEN** the avatar source points to `/images/dusan.png`

#### Scenario: Duplicate legacy path avoided

- **WHEN** checking profile avatar defaults
- **THEN** legacy root-level avatar paths are not used as canonical defaults

### Requirement: Graceful fallback for missing avatar assets

User-facing profile media SHALL degrade gracefully if a referenced local avatar file is missing or fails to load.

#### Scenario: Missing avatar file

- **WHEN** the default avatar source cannot be loaded
- **THEN** the author card renders a fallback avatar instead of a broken image icon
- **AND** text content (name/title/bio) remains visible and usable

### Requirement: Fallback asset availability

The project SHALL include a local fallback avatar asset used by profile UI when the primary avatar path cannot be loaded.

#### Scenario: Fallback asset exists

- **WHEN** checking static assets for profile media
- **THEN** `/images/avatar-fallback.svg` exists under `public/images/`
