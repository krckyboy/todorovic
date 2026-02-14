# Validation and Quality Gates

## Required Commands

Run before handoff:

- `npm run lint`
- `npm run build`

## Lint Gate

`npm run lint` runs:

- ESLint for JS/TS/TSX/Astro
- Stylelint for CSS

## Build Gate

`npm run build` verifies static generation and catches integration/runtime build issues.

## Commit-Time Behavior

This repo has a Husky pre-commit hook:

- `.husky/pre-commit` runs `npx lint-staged`

`lint-staged` currently runs:

- `stylelint --fix` on `*.css`
- `eslint --fix` on `*.{js,ts,jsx,tsx,astro}`
- `prettier --write` on `*.{js,ts,jsx,tsx,astro,css,json,md}`

## Release-Readiness Checklist

- Relevant OpenSpec artifacts updated
- `npm run lint` passes
- `npm run build` passes
- Docs/spec references updated when conventions changed
- Manual checks for changed UX/flows documented
