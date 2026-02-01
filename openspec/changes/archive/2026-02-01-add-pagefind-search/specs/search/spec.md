# Delta Spec: Search Functionality

## ADDED Requirements

### Requirement: Pagefind Integration

The site SHALL use Pagefind for client-side search functionality.

#### Scenario: Search index generated at build

- **WHEN** running npm run build
- **THEN** Pagefind generates a search index in the dist folder

#### Scenario: Search works without JavaScript errors

- **WHEN** user performs a search
- **THEN** results display without console errors

### Requirement: SearchBar Component

A SearchBar component SHALL provide the search interface.

#### Scenario: Search button visible in header

- **WHEN** viewing any page
- **THEN** a search button/icon is visible in the header

#### Scenario: Search modal opens on click

- **WHEN** user clicks the search button
- **THEN** a search modal/dialog opens with input field

#### Scenario: Search modal opens with keyboard shortcut

- **WHEN** user presses Cmd+K (Mac) or Ctrl+K (Windows/Linux)
- **THEN** the search modal opens

#### Scenario: Search modal closes on Escape

- **WHEN** search modal is open and user presses Escape
- **THEN** the modal closes

### Requirement: Search Results Display

Search results SHALL display in a styled list matching site design.

#### Scenario: Results show title and excerpt

- **WHEN** search returns results
- **THEN** each result shows page title and text excerpt

#### Scenario: Clicking result navigates to page

- **WHEN** user clicks a search result
- **THEN** browser navigates to that page

#### Scenario: No results message

- **WHEN** search returns no results
- **THEN** a "No results found" message displays

### Requirement: Accessibility

The search component SHALL be fully accessible.

#### Scenario: Search input has label

- **WHEN** screen reader focuses search input
- **THEN** an accessible label is announced

#### Scenario: Results are keyboard navigable

- **WHEN** user presses arrow keys in results
- **THEN** focus moves between results

#### Scenario: Focus trapped in modal

- **WHEN** modal is open
- **THEN** tab key cycles within modal only
