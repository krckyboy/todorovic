## Context

The blog module currently mixes presentation shaping with rendering:

- `PostCard` expects many fields and each caller remaps post data manually.
- list/detail pages compute view-level derivations inline.
- client React code must avoid importing server-only modules (`astro:content`), but this boundary is easy to violate when helpers live in mixed files.

This change introduces presenter services that are explicit about runtime (server vs client) and backed by shared pure policy helpers.

## Goals

- Centralize blog post display semantics (`draft`, `archived`, date formatting flags).
- Reduce prop-drilling and repeated mapping into `PostCard`.
- Keep client islands free from server-only imports.
- Keep current `/blog` and `/blog/[slug]` behavior unchanged.

## Non-goals

- Changing blog filtering UX.
- Changing routing policy for draft/archived posts.
- Introducing new data sources or CMS integration.

## Proposed Architecture

### 1. Shared runtime-safe policy helpers

Add a pure helper module (no `astro:content` imports), for example:

- `isDraftVisible(draft, archived)`
- helpers for archive/draft booleans used by both presenters

This becomes the single source of truth for badge semantics.

### 2. Runtime-scoped presenters

- `blogPostPresenter.server.ts`
  - input: `CollectionEntry<'blog'>`
  - output: UI view models for server-rendered components/pages
- `blogPostPresenter.client.ts`
  - input: serialized post shape
  - output: same UI-facing card view model contract for client React use

Both presenters use shared policy helpers to prevent semantics drift.

### 3. Card view model contract

Refactor `PostCard` to accept one `post` prop (view model), not scalar props.
All callers prepare this model via presenter services.

### 4. Blog detail page context service

Move `[slug].astro` derived calculations (prev/next, related exclusions, metadata inputs) into a service function so the page becomes composition-focused.

## Alternatives Considered

### One mixed presenter for all runtimes

Rejected because it risks reintroducing server-only imports into client bundles.

### React context/provider for blog data everywhere

Rejected for now because most blog rendering is Astro server templates; context helps only inside React islands and adds complexity without solving server/client boundary concerns.

### Keep current prop mapping + helper calls

Rejected because repeated mapping and policy duplication increase maintenance cost and regression risk.

## Risks and Mitigations

- **Risk**: server/client presenters diverge over time.
  - **Mitigation**: shared view-model type contract and shared policy helpers.
- **Risk**: hidden behavior regression in draft badges or navigation.
  - **Mitigation**: preserve existing outputs and add manual verification checklist in tasks.
- **Risk**: over-refactor beyond current need.
  - **Mitigation**: scope to blog post presentation paths only.
