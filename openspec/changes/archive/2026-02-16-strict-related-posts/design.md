## Context

Current `RelatedPosts` behavior:

1. Rank by shared-tag overlap
2. If overlap count is low, fill remaining slots with most recent posts

This ensures content is always shown, but may violate user expectation of “relatedness”.

## Goals / Non-Goals

**Goals:**

- Keep “Related Posts” semantically accurate
- Avoid showing unrelated posts under a relevance label
- Preserve deterministic behavior and simple implementation

**Non-Goals:**

- Semantic embeddings or AI-based similarity
- Full recommendation system

## Decisions

### 1. Strict relatedness default

A post qualifies as related only when shared tag overlap >= 1.

### 2. Continue Reading exclusions remain

Exclude current post plus `prevPost` and `nextPost` slugs from related candidates to avoid duplicate recommendations.

### 3. Empty-state strategy

Recommended default:

- If no qualifying related posts exist, do not render the Related section.

Alternative (optional):

- Render a separate section labeled “More Posts” for recency fallback (not labeled related).

## Algorithm

1. Build candidate set from published posts excluding current + explicitly excluded slugs
2. Compute overlap score against current post tags
3. Keep candidates where overlap > 0
4. Sort by overlap descending, then pubDate descending
5. Render top 3

## Risks / Trade-offs

- Fewer cards displayed for niche tags on small blogs
  - Mitigation: optional “More Posts” section as separate concept

## Open Question

- Prefer hidden section on zero matches, or explicit “More Posts” fallback block?
