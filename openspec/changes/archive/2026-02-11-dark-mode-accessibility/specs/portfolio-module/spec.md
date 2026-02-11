## MODIFIED Requirements

### Requirement: Portfolio components location

Portfolio-specific presentational components SHALL be located in `src/modules/portfolio/components/`.

The following components SHALL be moved:

- `Timeline.astro` - Renders the experience/project timeline
- `TimelineItem.astro` - Individual timeline entry with accessible current-item indicator
- `SkillTags.astro` - Displays skill tags/cloud

The `TimelineItem` component SHALL provide a non-color indicator (text label) for the current/active timeline entry, in addition to the existing color differentiation. This ensures colorblind users can identify the current role.

#### Scenario: Components are in module

- **WHEN** looking for Timeline component
- **THEN** it exists at `src/modules/portfolio/components/Timeline.astro`

#### Scenario: Components not in global

- **WHEN** checking `src/components/` directory
- **THEN** Timeline.astro does not exist there
- **AND** TimelineItem.astro does not exist there
- **AND** SkillTags.astro does not exist there

#### Scenario: Current timeline item has non-color indicator

- **WHEN** viewing the timeline with a current/active item
- **THEN** the current item displays a visible text label (e.g., "Current") in addition to color differentiation
- **AND** a screen reader can identify which timeline item is the current role
