## ADDED Requirements

### Requirement: Portfolio module structure

The portfolio module SHALL be located at `src/modules/portfolio/` and follow the DDD module structure with views/ and components/ subdirectories.

#### Scenario: Module directory exists

- **WHEN** checking the file system
- **THEN** `src/modules/portfolio/views/` directory exists
- **AND** `src/modules/portfolio/components/` directory exists

### Requirement: Portfolio components location

Portfolio-specific presentational components SHALL be located in `src/modules/portfolio/components/`.

The following components SHALL be moved:

- `Timeline.astro` - Renders the experience/project timeline
- `TimelineItem.astro` - Individual timeline entry
- `SkillTags.astro` - Displays skill tags/cloud

#### Scenario: Components are in module

- **WHEN** looking for Timeline component
- **THEN** it exists at `src/modules/portfolio/components/Timeline.astro`

#### Scenario: Components not in global

- **WHEN** checking `src/components/` directory
- **THEN** Timeline.astro does not exist there
- **AND** TimelineItem.astro does not exist there
- **AND** SkillTags.astro does not exist there

### Requirement: Portfolio view component

A view component SHALL exist at `src/modules/portfolio/views/` to orchestrate portfolio section functionality.

#### Scenario: Portfolio view exists

- **WHEN** rendering the index page portfolio section
- **THEN** it can import from `src/modules/portfolio/views/`

### Requirement: Import path updates

All imports of moved portfolio components SHALL be updated to use the new module paths.

#### Scenario: Pages import from module

- **WHEN** a page needs Timeline
- **THEN** it imports from `@modules/portfolio/components/Timeline.astro` or relative equivalent

### Requirement: Skills communicate system-level frontend capability

The Skills section SHALL present not only tool familiarity but also system-level frontend engineering capability.

#### Scenario: Reusable UI libraries capability is represented

- **WHEN** reviewing Skills content
- **THEN** it includes evidence of building reusable UI libraries or design-system style component kits (for example, React Kit)

#### Scenario: Reusable services capability is represented

- **WHEN** reviewing Skills content
- **THEN** it includes evidence of designing reusable frontend services/utilities shared across features

#### Scenario: Microfrontends capability is represented

- **WHEN** reviewing Skills content
- **THEN** it includes evidence of microfrontend architecture or integration experience
