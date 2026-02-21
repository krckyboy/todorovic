## ADDED Requirements

### Requirement: Deterministic initial island render

React islands SHALL render the same initial content during SSR and the first client hydration pass.

#### Scenario: Search shortcut label does not mismatch on hydration

- **WHEN** the header search island hydrates in production
- **THEN** the initial shortcut label text matches the server-rendered HTML
- **AND** no text mismatch hydration error is produced by the shortcut label

### Requirement: Client-only environment state is applied after hydration

Browser-only values (for example platform and URL query parameters) SHALL be applied after hydration using client-side effects.

#### Scenario: Platform-specific shortcut label is applied after mount

- **WHEN** the search island mounts on macOS
- **THEN** the shortcut label updates from the deterministic initial value to `Cmd`
- **AND** the update occurs after hydration completes

#### Scenario: URL tag filters are resolved after hydration

- **WHEN** `/blog?tags=<value>` loads
- **THEN** the blog filter initializes with deterministic SSR-compatible state
- **AND** active tags are synchronized from the URL in a client-side effect
