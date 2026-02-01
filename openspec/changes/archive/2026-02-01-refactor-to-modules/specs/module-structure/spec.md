# Delta Spec: Module Directory Structure

## ADDED Requirements

### Requirement: Module Directory Structure

Complex features SHALL be organized in `src/modules/<feature>/` directories.

#### Scenario: Search module exists

- **WHEN** looking at the project structure
- **THEN** `src/modules/search/` directory exists with components, services subdirectories

#### Scenario: Module has standard structure

- **WHEN** examining a module directory
- **THEN** it contains `components/` for sub-components and `services/` for business logic

### Requirement: SearchButton Component

SearchButton SHALL be a focused component that renders the search trigger button.

#### Scenario: Button displays with shortcut hint

- **WHEN** rendering SearchButton
- **THEN** a button with search icon and keyboard shortcut hint is displayed

#### Scenario: Button detects platform for shortcut

- **WHEN** on macOS
- **THEN** shortcut displays as "Cmd+K"

#### Scenario: Button detects Windows/Linux for shortcut

- **WHEN** on Windows or Linux
- **THEN** shortcut displays as "Ctrl+K"

### Requirement: SearchModal Component

SearchModal SHALL be a focused component that handles the modal overlay and container.

#### Scenario: Modal renders with proper ARIA

- **WHEN** modal is open
- **THEN** it has role="dialog", aria-modal="true", aria-label

#### Scenario: Modal traps focus

- **WHEN** pressing Tab in modal
- **THEN** focus cycles within modal elements only

#### Scenario: Click outside closes modal

- **WHEN** clicking on overlay background
- **THEN** modal closes

### Requirement: SearchInput Component

SearchInput SHALL handle the search input field with debounced queries.

#### Scenario: Input has accessible label

- **WHEN** screen reader focuses input
- **THEN** accessible label is announced

#### Scenario: Input debounces queries

- **WHEN** user types rapidly
- **THEN** search triggers only after 200ms pause

### Requirement: SearchResults Component

SearchResults SHALL display search results with keyboard navigation.

#### Scenario: Results display title and excerpt

- **WHEN** search returns results
- **THEN** each result shows page title and highlighted excerpt

#### Scenario: Arrow keys navigate results

- **WHEN** pressing ArrowDown/ArrowUp
- **THEN** focus moves between results visually

#### Scenario: Enter navigates to result

- **WHEN** pressing Enter with result focused
- **THEN** browser navigates to that page

#### Scenario: No results shows message

- **WHEN** search returns empty
- **THEN** "No results found" message displays

### Requirement: Pagefind Service

pagefindService.ts SHALL encapsulate all Pagefind API interactions.

#### Scenario: Service lazy-loads Pagefind

- **WHEN** first search is triggered
- **THEN** Pagefind library is dynamically imported

#### Scenario: Service provides search function

- **WHEN** calling search(query)
- **THEN** returns array of SearchResult objects

#### Scenario: Service handles errors gracefully

- **WHEN** Pagefind fails to load
- **THEN** service returns null and logs error

### Requirement: SearchBar Entry Point

SearchBar.astro at module root SHALL compose all sub-components.

#### Scenario: SearchBar imports from module

- **WHEN** Header imports SearchBar
- **THEN** import path is `@/modules/search/SearchBar.astro`

#### Scenario: SearchBar coordinates state

- **WHEN** search button is clicked
- **THEN** modal opens and input is focused
