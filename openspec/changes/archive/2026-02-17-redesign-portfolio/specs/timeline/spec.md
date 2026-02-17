## ADDED Requirements

### Requirement: Display all roles without interaction

The Timeline component SHALL display all work experience entries in a single vertical view without requiring tabs or clicks to reveal content.

#### Scenario: All roles visible on page load

- **WHEN** user navigates to the skills page
- **THEN** all work experience entries are immediately visible in chronological order (newest first)

### Requirement: Vertical timeline with year markers

The component SHALL display a vertical line on the left side with year markers indicating career progression.

#### Scenario: Year markers shown

- **WHEN** user views the timeline
- **THEN** years (2025, 2024, 2020, 2018) are visible as markers along the timeline

### Requirement: Timeline item structure

Each timeline entry SHALL display: job title, company name, location, employment period, and duration.

#### Scenario: Complete role information

- **WHEN** user views a timeline entry
- **THEN** they see the job title prominently displayed
- **AND** company name and location below the title
- **AND** date range and calculated duration

### Requirement: Current role highlighting

The most recent/current role SHALL be visually distinguished from past roles using the primary color accent.

#### Scenario: Current role stands out

- **WHEN** user views the timeline
- **THEN** the "Frontend Team Lead at Constructor Tech" entry has a primary color accent
- **AND** past roles have neutral styling

### Requirement: Responsive timeline layout

The timeline SHALL adapt to mobile viewports while maintaining readability.

#### Scenario: Mobile layout

- **WHEN** viewport width is less than 768px
- **THEN** timeline stacks vertically
- **AND** all content remains readable without horizontal scrolling

### Requirement: Constructor Tech employment data

The timeline SHALL include Constructor Tech roles with accurate dates.

#### Scenario: Current employer displayed

- **WHEN** user views the timeline
- **THEN** "Frontend Team Lead" at Constructor Tech (Jan 2025 - Present) is shown
- **AND** "Senior Frontend Engineer" at Constructor Tech (Dec 2024 - Jan 2025) is shown

### Requirement: Complete employment history

The timeline SHALL include all past roles in reverse chronological order.

#### Scenario: All employers listed

- **WHEN** user views the timeline
- **THEN** the following companies appear in order:
  1. Constructor Tech (2024-present)
  2. Citrus Systems (2020-2024)
  3. Boca Tech (2018-2019)
