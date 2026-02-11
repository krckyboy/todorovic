## MODIFIED Requirements

### Requirement: Dark mode border visibility

The dark theme `--color-border` token SHALL use `#404040` to provide sufficient contrast against the dark background (`#121212`). All components using `--color-border` SHALL have visible borders in dark mode.

#### Scenario: Border is visible in dark mode

- **WHEN** viewing any component with a border in dark mode
- **THEN** the border is visually distinguishable from the background

#### Scenario: Border color token value

- **WHEN** inspecting the `[data-theme="dark"]` CSS custom properties
- **THEN** `--color-border` is set to `#404040`

### Requirement: Search modal focus management

The search modal SHALL trap keyboard focus within the modal when it is open. Pressing Escape SHALL close the modal and return focus to the element that opened it. Tab and Shift+Tab SHALL cycle through focusable elements within the modal without escaping to the page behind.

#### Scenario: Focus trapped in open modal

- **WHEN** the search modal is open and the user presses Tab
- **THEN** focus cycles through the search input and result items without leaving the modal

#### Scenario: Escape closes modal

- **WHEN** the search modal is open and the user presses Escape
- **THEN** the modal closes and focus returns to the search trigger button

### Requirement: Search result focus indicators

Search result items SHALL have a visible `focus-visible` outline when navigated via keyboard, in addition to the existing `.focused` class styling applied via JavaScript.

#### Scenario: Keyboard focus on result item

- **WHEN** a user navigates search results using keyboard
- **THEN** the focused result has a visible outline using `focus-visible` styling

### Requirement: Navigation aria-labels

Navigation links SHALL use `aria-label` attributes instead of `title` attributes to ensure screen readers announce the link purpose on mobile devices where links display as icon-only.

#### Scenario: Mobile navigation link accessibility

- **WHEN** a screen reader encounters a navigation link on mobile
- **THEN** the link has an `aria-label` attribute with the link's purpose (e.g., "Home", "About")

### Requirement: Social link aria-label clarity

Social media links in SocialIcons SHALL use descriptive `aria-label` values that include the action context (e.g., "Visit GitHub" instead of "GitHub").

#### Scenario: Social link screen reader announcement

- **WHEN** a screen reader encounters a social media link
- **THEN** the aria-label reads "Visit {platform name}" (e.g., "Visit GitHub", "Visit LinkedIn")
