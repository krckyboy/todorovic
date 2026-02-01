# Proposal: Refactor to Module Directory Structure

## Problem

The current component structure is flat with all components in `src/components/`. The SearchBar component is 305 lines and combines template, state, event handling, search logic, and keyboard navigation in a single file. This doesn't scale well and makes components harder to maintain.

## Reference Architecture

Based on research of the **studio-frontend** codebase, the module pattern organizes code by feature:

```
src/modules/
├── <feature>/
│   ├── components/    # Sub-components (presentational)
│   ├── views/         # Page-level containers (optional for Astro)
│   ├── services/      # Business logic, state management
│   ├── utils.ts       # Feature-specific utilities
│   └── constants.ts   # Feature-specific constants
```

## Goals

1. Adopt module-based directory structure for complex features
2. Split large components into smaller, focused sub-components
3. Extract reusable logic into services
4. Keep simple, shared components in `src/components/`
5. Improve maintainability and testability

## Proposed Structure

```
src/
├── components/                    # Shared, simple components
│   ├── Header.astro
│   ├── Footer.astro
│   ├── Navigation.astro
│   ├── Hero.astro
│   ├── SocialIcons.astro
│   └── ...
├── modules/
│   ├── search/                    # Search feature module
│   │   ├── components/
│   │   │   ├── SearchButton.astro
│   │   │   ├── SearchButton.module.css
│   │   │   ├── SearchModal.astro
│   │   │   ├── SearchModal.module.css
│   │   │   ├── SearchInput.astro
│   │   │   ├── SearchInput.module.css
│   │   │   ├── SearchResults.astro
│   │   │   └── SearchResults.module.css
│   │   ├── services/
│   │   │   └── pagefindService.ts # Pagefind init and search logic
│   │   ├── SearchBar.astro        # Main entry (composes sub-components)
│   │   └── types.ts               # SearchResult, SearchState types
│   └── blog/                      # Blog feature module (future)
│       ├── components/
│       │   ├── AuthorCard.astro
│       │   ├── Categories.astro
│       │   ├── BlogPostItem.astro
│       │   └── FeaturedPosts.astro
│       └── types.ts
├── layouts/
├── pages/
└── styles/
```

## SearchBar Decomposition

**Current** (305 lines, single file):

- HTML template (trigger + modal)
- CSS Module import
- Pagefind initialization
- Search state management
- Event listeners
- Keyboard navigation
- Focus trap logic

**Proposed** (split into ~6 files):

| Component             | Responsibility                         | ~Lines |
| --------------------- | -------------------------------------- | ------ |
| `SearchButton.astro`  | Trigger button with shortcut hint      | 30     |
| `SearchModal.astro`   | Modal container, open/close logic      | 50     |
| `SearchInput.astro`   | Input field, debounce, clear           | 40     |
| `SearchResults.astro` | Results list, keyboard nav, no-results | 60     |
| `pagefindService.ts`  | Pagefind init, search API wrapper      | 40     |
| `SearchBar.astro`     | Composition, state coordination        | 50     |

## Migration Strategy

1. **Phase 1**: Create module structure for search
2. **Phase 2**: Extract SearchBar into sub-components
3. **Phase 3**: Update Header to import from module path
4. **Phase 4**: Move blog components to blog module (optional)
5. **Phase 5**: Update specs and documentation

## Scope

### In Scope

- Create `src/modules/` directory structure
- Refactor SearchBar into module with sub-components
- Extract Pagefind logic into service
- Update imports in Header

### Out of Scope

- Refactoring all existing components (only search for now)
- Creating new features
- Changing component functionality

## Benefits

- **Maintainability**: Smaller, focused files (~50 lines each)
- **Reusability**: Sub-components can be used independently
- **Testability**: Services can be unit tested in isolation
- **Scalability**: Pattern can apply to future complex features
- **Discoverability**: Related code grouped together

## Risks

- **Migration effort**: Requires updating imports
- **Learning curve**: New pattern for this codebase
- **Over-engineering risk**: Don't apply to simple components

Mitigation: Only use modules for complex features (search, blog). Keep simple shared components flat.
