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

### Requirement: Hover state on skill tags

Each skill tag SHALL have a hover state that uses the primary color.

#### Scenario: Tag hover effect

- **WHEN** user hovers over a skill tag
- **THEN** the tag border or background changes to primary color
- **AND** transition is smooth (using CSS transition)

### Requirement: Accessible focus states

Each skill tag SHALL be focusable and show visible focus indicators.

#### Scenario: Keyboard navigation

- **WHEN** user tabs through the skills section
- **THEN** each skill tag receives visible focus outline
