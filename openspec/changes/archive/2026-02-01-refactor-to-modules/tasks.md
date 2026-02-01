## 1. Module Structure Setup

- [ ] 1.1 Create `src/modules/` directory
- [ ] 1.2 Create `src/modules/search/` directory
- [ ] 1.3 Create `src/modules/search/components/` directory
- [ ] 1.4 Create `src/modules/search/services/` directory

## 2. Type Definitions

- [ ] 2.1 Create `src/modules/search/types.ts` with SearchResult interface
- [ ] 2.2 Add SearchState type for modal state management

## 3. Pagefind Service

- [ ] 3.1 Create `src/modules/search/services/pagefindService.ts`
- [ ] 3.2 Implement `initPagefind()` function with lazy loading
- [ ] 3.3 Implement `search(query)` function returning SearchResult[]
- [ ] 3.4 Add error handling for failed initialization

## 4. Sub-Components

- [ ] 4.1 Create `SearchButton.astro` with search icon and shortcut hint
- [ ] 4.2 Create `SearchButton.module.css` with button styling
- [ ] 4.3 Create `SearchModal.astro` with overlay and dialog container
- [ ] 4.4 Create `SearchModal.module.css` with modal styling
- [ ] 4.5 Create `SearchInput.astro` with input field and icon
- [ ] 4.6 Create `SearchInput.module.css` with input styling
- [ ] 4.7 Create `SearchResults.astro` with results list and states
- [ ] 4.8 Create `SearchResults.module.css` with results styling

## 5. Main Entry Point

- [ ] 5.1 Create `src/modules/search/SearchBar.astro` composing sub-components
- [ ] 5.2 Implement state coordination between components
- [ ] 5.3 Wire up keyboard shortcuts (Cmd/Ctrl+K, Escape, arrows)
- [ ] 5.4 Implement focus trap in modal

## 6. Integration

- [ ] 6.1 Update Header.astro to import from `@/modules/search/SearchBar.astro`
- [ ] 6.2 Remove old `src/components/SearchBar.astro`
- [ ] 6.3 Remove old `src/components/SearchBar.module.css`

## 7. Verification

- [ ] 7.1 Run `npm run build` to verify no import errors
- [ ] 7.2 Test search functionality in browser
- [ ] 7.3 Verify keyboard shortcuts work
- [ ] 7.4 Verify accessibility (focus trap, ARIA labels)
- [ ] 7.5 Verify each sub-component is under 60 lines
