## ADDED Requirements

### Requirement: Scalable blog tag filter behavior

The blog tag filter UI SHALL scale when tag count grows by introducing searchable and collapsible controls.

#### Scenario: Large tag set enables search and collapse

- **WHEN** available tag options exceed 12
- **THEN** the filter renders a tag search input
- **AND** the default view shows up to 10 tags with an explicit expand control

#### Scenario: Expand and collapse controls are keyboard accessible

- **WHEN** users interact with tag expansion controls by keyboard
- **THEN** the control is focusable
- **AND** it exposes `aria-expanded` state
- **AND** it references the controlled tag list via `aria-controls`

### Requirement: Tag options are ordered for discovery

Tag options SHALL be ordered by post frequency (descending), then by label (ascending) for ties.

#### Scenario: Tag ordering

- **WHEN** tag options are generated for `/blog`
- **THEN** tags with higher post counts appear first
- **AND** equally frequent tags are ordered alphabetically by display label

### Requirement: URL filter compatibility is preserved

Tag filtering SHALL continue to support URL query parameters (`?tags=`) for deep links and reload persistence.

#### Scenario: Query-driven filter state

- **WHEN** `/blog?tags=<value>` is loaded
- **THEN** matching tag filters are pre-activated
- **AND** unknown query tags are ignored without breaking the page

#### Scenario: Filter updates URL state

- **WHEN** a user toggles tag filters in the UI
- **THEN** the browser URL updates `tags` query parameters without full page reload
