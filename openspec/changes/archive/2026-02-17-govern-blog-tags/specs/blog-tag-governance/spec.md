## ADDED Requirements

### Requirement: Canonical blog tag catalog

The repository SHALL maintain a canonical blog tag catalog with metadata for each allowed tag.

Each catalog entry SHALL include:

- `slug` (lowercase kebab-case)
- `label` (display label)
- `description` (short usage guidance)

#### Scenario: Canonical catalog is defined in code

- **WHEN** blog tag metadata is resolved
- **THEN** canonical tags are sourced from a single service module under `src/modules/blog/services/`
- **AND** each entry includes slug, label, and description

### Requirement: New tag admission policy

A new canonical tag SHALL only be introduced when it has clear discovery value beyond existing tags.

#### Scenario: New tag approval criteria

- **WHEN** a contributor proposes a new tag
- **THEN** the tag is added only if it applies to at least 2 current/planned posts
- **OR** it introduces a distinct discovery axis not covered by existing canonical tags

### Requirement: Event-style tag governance

Event-style tags (for example `launch`) SHALL be used only for meaningful, repeatable event clusters.

#### Scenario: Event tag usage

- **WHEN** assigning event-style tags to a post
- **THEN** the tag represents a recurring or meaningful release cluster
- **AND** it is not used for one-off, low-discovery labels

### Requirement: Unknown tag policy

Unknown (non-canonical) tags SHALL be treated as warn-only during the initial governance rollout.

#### Scenario: Unknown tag handling

- **WHEN** blog tags include values outside the canonical catalog
- **THEN** the system emits a warning
- **AND** build and deployment are not blocked by that warning
