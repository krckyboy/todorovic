# Delta Spec: Theme System

## ADDED Requirements

### Requirement: Dark Theme CSS Custom Properties

The site SHALL support dark theme via CSS custom properties.

#### Scenario: Dark theme colors applied

- **WHEN** `data-theme="dark"` is set on `<html>`
- **THEN** all color custom properties reflect dark theme values

#### Scenario: Light theme is default

- **WHEN** no `data-theme` attribute is present
- **THEN** light theme colors are applied

#### Scenario: Color transitions are smooth

- **WHEN** theme changes
- **THEN** colors transition over 200ms

### Requirement: System Preference Detection

The site SHALL detect and respect system color scheme preference.

#### Scenario: System prefers dark

- **WHEN** user's system is set to dark mode
- **AND** no localStorage preference exists
- **THEN** dark theme is applied

#### Scenario: System prefers light

- **WHEN** user's system is set to light mode
- **AND** no localStorage preference exists
- **THEN** light theme is applied

### Requirement: Theme Persistence

User's theme preference SHALL persist across sessions.

#### Scenario: Preference saved to localStorage

- **WHEN** user toggles theme
- **THEN** preference is saved to localStorage

#### Scenario: Preference restored on load

- **WHEN** page loads with existing localStorage preference
- **THEN** saved theme is applied

### Requirement: No Flash of Wrong Theme

The correct theme SHALL be applied before any content is painted.

#### Scenario: Theme applied synchronously

- **WHEN** page loads
- **THEN** `data-theme` attribute is set in `<head>` before body renders

### Requirement: ThemeToggle Component

A ThemeToggle component SHALL allow users to switch themes.

#### Scenario: Toggle displays current theme icon

- **WHEN** theme is light
- **THEN** moon icon is displayed (click to switch to dark)

#### Scenario: Toggle displays sun in dark mode

- **WHEN** theme is dark
- **THEN** sun icon is displayed (click to switch to light)

#### Scenario: Toggle is keyboard accessible

- **WHEN** toggle is focused
- **THEN** Enter and Space keys activate it

#### Scenario: Toggle has accessible label

- **WHEN** screen reader focuses toggle
- **THEN** current theme and action are announced

### Requirement: Module Structure (DDD)

The theme module SHALL follow domain-driven design conventions.

#### Scenario: Module has views folder

- **WHEN** examining the theme module
- **THEN** `src/modules/theme/views/ThemeToggle.tsx` exists as entry point

#### Scenario: Module has proper exports

- **WHEN** importing from theme module
- **THEN** `import { ThemeToggle } from '@/modules/theme'` works

### Requirement: Header Integration

ThemeToggle SHALL be integrated into the site header.

#### Scenario: Toggle visible in header

- **WHEN** viewing any page
- **THEN** theme toggle button is visible in header actions area
