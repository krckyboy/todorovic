# Architecture Conventions

## Related Specs

- [../openspec/specs/astro-conventions/spec.md](../openspec/specs/astro-conventions/spec.md)
- [../openspec/specs/portfolio-module/spec.md](../openspec/specs/portfolio-module/spec.md)
- [../openspec/specs/styling/spec.md](../openspec/specs/styling/spec.md)

## Related Docs

- [modules-and-services.md](modules-and-services.md)
- [engineering-workflow.md](engineering-workflow.md)

## DDD Convention

This repo uses a **DDD-inspired module structure**.

- Complex features are organized in `src/modules/<feature>/`.
- Module internals use folders like `views/`, `components/`, and `services/`.
- Hook-style reusable logic is placed inside `services/` (no separate `hooks/` convention).
- Business/data logic belongs in `services/`.
- UI rendering belongs in `views/` and `components/`.

Examples in the current codebase:

- `src/modules/portfolio/views/`
- `src/modules/portfolio/components/`
- `src/modules/portfolio/services/`
- `src/modules/theme/views/`, `src/modules/theme/services/`

Note: this is module-level DDD organization, not full tactical DDD (entities/value objects/aggregates everywhere).

## Astro Convention

Astro conventions are defined and already applied in this repo.

Source of truth:

- `openspec/specs/astro-conventions/spec.md`

This spec defines:

- Naming conventions (components/pages/layouts/content)
- Component and page structure
- CSS Modules patterns
- Module (DDD) guidance
- Content collections and SEO requirements

## Working Rule

For all implementation work:

1. Read `openspec/specs/astro-conventions/spec.md` first.
2. Keep logic in module services when logic grows beyond simple rendering.
3. Keep pages/layouts/components aligned with Astro conventions from the spec.
