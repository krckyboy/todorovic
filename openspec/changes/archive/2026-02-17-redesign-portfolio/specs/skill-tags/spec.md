## ADDED Requirements

### Requirement: Display all skills without interaction

The SkillTags component SHALL display all technical and soft skills in a single view without requiring tabs, clicks, or scrolling to reveal content.

#### Scenario: Skills visible on page load

- **WHEN** user navigates to the skills page
- **THEN** all technical skills and soft skills are immediately visible

### Requirement: Tag cloud layout

The component SHALL render skills as a flexbox container with wrap, displaying each skill as a pill-shaped tag.

#### Scenario: Skills wrap on narrow viewports

- **WHEN** viewport width is less than the total width of all skills
- **THEN** skills wrap to multiple lines while maintaining consistent spacing

### Requirement: Visual distinction between skill categories

The component SHALL group technical skills and soft skills under separate headings.

#### Scenario: Categories are labeled

- **WHEN** user views the skills section
- **THEN** "Technical Skills" heading appears above technical skills
- **AND** "Soft Skills" heading appears above soft skills

### Requirement: Skills are display-only metadata

Skill tags on the Skills page SHALL be non-interactive presentation elements, not links/buttons.

#### Scenario: No click navigation on skill tags

- **WHEN** user clicks or taps a skill tag
- **THEN** no navigation or filtering action is triggered

#### Scenario: Non-interactive semantics

- **WHEN** inspecting rendered skill tags
- **THEN** they render as non-interactive text elements (not anchors or buttons)

### Requirement: Skills communicate advanced engineering scope

Skills content SHALL include system-level frontend capabilities in addition to framework/tool names.

#### Scenario: Reusable libraries and services are represented

- **WHEN** reviewing technical skills content
- **THEN** it references reusable UI library/component-kit work (for example, React Kit)
- **AND** it references reusable frontend services/utilities

#### Scenario: Microfrontend capability is represented

- **WHEN** reviewing technical skills content
- **THEN** it references microfrontend architecture or integration experience
