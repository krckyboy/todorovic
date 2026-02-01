## Context

The portfolio site has grown with multiple complex features. The current flat component structure in `src/components/` doesn't scale well for features with multiple related files (components, services, types).

The studio-frontend codebase demonstrates a proven module pattern:

- Feature-based organization (`modules/<feature>/`)
- Separation of views, components, services
- Colocation of related code

## Goals / Non-Goals

**Goals:**

- Adopt module structure for the search feature
- Split SearchBar (305 lines) into smaller components (~50 lines each)
- Extract Pagefind logic into a reusable service
- Establish pattern for future complex features

**Non-Goals:**

- Refactor all existing components
- Change component APIs or functionality
- Create a full Vue-style reactive system

## Decisions

### 1. Module Location

**Decision**: Create `src/modules/` for feature modules.

**Rationale**:

- Matches studio-frontend pattern
- Clear separation from shared components
- Doesn't disrupt existing `src/components/`

### 2. Module Structure

**Decision**: Each module contains `components/`, `services/`, and optional `types.ts`.

```
src/modules/search/
├── components/
│   ├── SearchButton.astro
│   ├── SearchModal.astro
│   ├── SearchInput.astro
│   └── SearchResults.astro
├── services/
│   └── pagefindService.ts
├── SearchBar.astro           # Main entry point
└── types.ts
```

**Rationale**:

- `components/` for presentational sub-components
- `services/` for business logic (Pagefind API wrapper)
- Entry point at module root for easy importing
- Types colocated with feature

### 3. Component Decomposition Strategy

**Decision**: Split by responsibility, not by DOM structure.

| Component     | Single Responsibility                   |
| ------------- | --------------------------------------- |
| SearchButton  | Trigger button, shortcut display        |
| SearchModal   | Modal container, open/close, focus trap |
| SearchInput   | Input field, debounce handling          |
| SearchResults | Results list, keyboard navigation       |

**Rationale**:

- Each component testable in isolation
- Clear prop interfaces
- Reusable (SearchResults could display other list types)

### 4. Service Pattern

**Decision**: TypeScript module with async functions, not a class.

```typescript
// pagefindService.ts
let pagefind: PagefindInstance | null = null;

export async function initPagefind(): Promise<PagefindInstance | null>;
export async function search(query: string): Promise<SearchResult[]>;
```

**Rationale**:

- Simpler than class-based services
- Lazy initialization built-in
- Matches Astro's functional style

### 5. Import Strategy

**Decision**: Import main component from module root.

```astro
// In Header.astro import SearchBar from '@/modules/search/SearchBar.astro';
```

**Rationale**:

- Clean import paths
- Internal structure is implementation detail
- Easy to refactor internals without changing consumers

## Risks / Trade-offs

**[Risk] Increased file count** → Mitigation: Only use for complex features; simple components stay flat.

**[Trade-off] More indirection** → Benefit of smaller, focused files outweighs navigation cost.

**[Trade-off] Astro doesn't have Vue's reactivity** → Use client-side scripts with DOM manipulation as before; service just extracts logic.
