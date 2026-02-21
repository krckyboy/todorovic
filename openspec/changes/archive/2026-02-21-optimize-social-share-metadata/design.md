## Context

The site already emits canonical, Open Graph, and Twitter metadata from `BaseLayout.astro`, with fallback OG image resolution handled by `buildBaseLayoutMeta`. The current fallback image (`public/og-default.png`) is 2400x1260 and ~2.8 MB, which triggers platform diagnostics (notably WhatsApp size threshold warnings). The homepage metadata copy is also concise enough to trigger "short title/description" guidance in preview analyzers.

## Goals / Non-Goals

**Goals:**

- Provide a default OG image asset that matches recommended dimensions (1200x630) and practical size constraints (<600 KB).
- Preserve existing metadata architecture while improving social metadata completeness.
- Improve homepage share copy quality by expanding title and description within stronger preview ranges.
- Keep implementation local and static (no runtime OG rendering dependency).

**Non-Goals:**

- Adding per-page or per-post dynamic OG image generation.
- Reworking blog post OG SVG generation.
- Introducing new client-side UI behavior.

## Decisions

1. **Use compressed JPEG for the default OG fallback**
   - JPEG provides materially smaller output for this gradient-heavy card than PNG.
   - This is the most direct way to satisfy WhatsApp-oriented size guidance without reducing visual clarity excessively.
   - Alternative considered: keep PNG and simplify artwork; rejected because file size remained less predictable.

2. **Fix default image generation at source in Swift script**
   - The script currently produces a retina-scaled pixel output (2400x1260) despite 1200x630 logical canvas values.
   - Use explicit `NSBitmapImageRep` dimensions and JPEG export with compression factor to guarantee deterministic output.
   - Alternative considered: post-process with external tools (`sips`/ImageMagick); rejected for lower reproducibility.

3. **Keep metadata changes centralized in existing layout/service files**
   - Fallback path update stays in `buildBaseLayoutMeta`.
   - Additional OG/Twitter tags stay in `BaseLayout.astro` to preserve current responsibility boundaries.

4. **Strengthen copy only where analyzer feedback is explicit**
   - Update homepage title/description and base fallback description.
   - Avoid broad rewrites across all pages to minimize unnecessary content churn.

5. **Separate CTA strategy by context**
   - Keep `generate-og-default.swift` neutral (no CTA) for evergreen page shares.
   - Keep CTA only in `generate-og-blog.mjs`, move it to bottom-right, and remove square/circle decorations that can visually collide with CTA elements.
   - Keep existing title-wrapping logic unchanged to avoid regression risk for long post titles.

## Risks / Trade-offs

- **[Risk]** JPEG compression can soften sharp edges/text slightly.  
  **Mitigation:** Use moderate compression and validate readability after generation.

- **[Risk]** Some platforms cache old OG image URLs aggressively.  
  **Mitigation:** Use updated metadata and verify after cache refresh windows; optionally version URL later if needed.

- **[Risk]** Analyzer recommendations differ by platform and are advisory.  
  **Mitigation:** Target widely accepted ranges and keep tags standards-compliant.

## Migration Plan

- Regenerate fallback OG image via `npm run generate:og`.
- Deploy with updated metadata and new image asset.
- Validate with local checks (`lint`, `build`) and share-preview tools.
- Rollback path: revert fallback image path to previous PNG and restore previous metadata copy.

## Open Questions

- None blocking implementation.
