# Modules and Services

## Convention

This repo uses a DDD-inspired module structure for complex features.

Module root:

- `src/modules/<feature>/views/`
- `src/modules/<feature>/components/`
- `src/modules/<feature>/services/`

No separate `hooks/` folder convention is used.
Reusable hook-style logic belongs in `services/`.

## Placement Rules

Put logic in `services/` when it includes:

- data shaping or sorting
- state coordination
- persistence access (storage/API)
- reusable behavior across multiple components/views

Keep logic in `views/` or `components/` when it is:

- purely presentational
- local UI state with no reuse
- simple template-level branching

## Example: Portfolio Module

- `src/modules/portfolio/services/experiences.ts` contains timeline data and ordering logic.
- `src/modules/portfolio/components/Timeline.astro` renders prepared data.

This separation keeps rendering simple and logic reusable.

## Refactor Trigger Checklist

Move UI logic into `services/` when one or more is true:

- logic is reused in multiple files
- component file mixes rendering with transformation rules
- tests are easier against pure service functions
- file readability declines due to inline business logic

## Related Specs

- [../openspec/specs/astro-conventions/spec.md#modules-ddd-convention](../openspec/specs/astro-conventions/spec.md#modules-ddd-convention)
- [../openspec/specs/portfolio-module/spec.md](../openspec/specs/portfolio-module/spec.md)
