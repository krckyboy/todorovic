## Context

Live `https://www.todorovic.dev/about` contains richer personal storytelling than the current Astro About page. The live page includes a gallery plus multiple narrative sections. Current Astro page keeps only a short bio and utility sections.

This change targets **content parity for narrative depth**, not full layout parity.

## Goals / Non-Goals

**Goals:**

- Restore meaningful narrative context from the live About page.
- Keep section structure recognizable for parity audits.
- Preserve current streamlined UX and avoid regressing into media-heavy layout.

**Non-Goals:**

- Gallery/image-grid parity.
- Pixel-perfect recreation of the legacy About page.
- Long, unedited copy dumps that hurt readability.

## Decisions

### 1. Selective parity model

Use live `/about` as a source baseline for structure and themes, then adapt copy to be concise and current.

### 2. Gallery excluded by default

The old gallery is intentionally excluded. If visual storytelling is needed later, it should come via a separate, scoped proposal with performance/accessibility requirements.

### 3. Narrative-first ordering

Retain a clear sequence that matches reader mental model:

1. Introduction
2. Musical Background
3. Transition to Programming
4. Early Career
5. Leading
6. Interests

### 4. Preserve conversion and wayfinding

Do not remove About page CTA/cross-link behaviors introduced in navigation improvements.

## Risks / Trade-offs

- More text may reduce scanability.
  - Mitigation: keep paragraphs concise and use clear section headings.
- Legacy narrative details may feel outdated.
  - Mitigation: edit for current role context and avoid obsolete title language.

## Open Questions

- Should any of the long-form narrative move into blog content later?
- Should a compact media block (single image) be considered after parity is complete?
