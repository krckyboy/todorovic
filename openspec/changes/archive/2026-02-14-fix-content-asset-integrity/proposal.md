## Why

There is currently a broken author avatar reference on blog post pages, and static content can reference assets that are missing without a clear guardrail. Asset integrity issues reduce trust and are easy to miss until after deployment.

## What Changes

- Fix broken and inconsistent asset references used by blog/profile UI.
- Introduce a lightweight content asset integrity check that validates referenced local assets during verification.
- Add safe fallbacks for user-facing media (author avatar and optional profile imagery) so missing files do not break presentation.
- Standardize author profile defaults (name/title/avatar) to keep branding consistent across Hero, blog header, and author card.

## Capabilities

### New Capabilities

- `content-asset-integrity`: Validation and fallback behavior for locally referenced static assets used by pages, components, and content collections.

### Modified Capabilities

- `blog-module`: Author card rendering requirements updated to include robust avatar fallback behavior.

## Impact

- **Affected files**: `src/modules/blog/components/AuthorCard.astro`, potential `public/images/*` assets, and verification scripts/config.
- **Potential new files**: a small asset validation utility and/or npm script.
- **Dependencies**: no required runtime dependencies; optional dev-only tooling if validation is automated.
- **No breaking URL changes**: existing page routes remain unchanged.
