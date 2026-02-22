# Research

## Claim-to-Source Map

| Claim                                               | Source (primary preferred)                                                                  | Confidence | Recency Risk | Notes                                         |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------- | ------------ | --------------------------------------------- |
| Site uses Astro and content collections             | `README.md`, `package.json`, `src/content/config.ts`                                        | High       | Low          | Stable repository facts                       |
| Non-trivial work follows OpenSpec-first flow        | `documentation/engineering-workflow.md`, `AGENTS.md`                                        | High       | Low          | Explicit repository policy                    |
| Blog authoring has quality gates (`lint`, `build`)  | `documentation/validation-and-quality-gates.md`, `documentation/blog-authoring-workflow.md` | High       | Low          | Keep wording aligned with docs                |
| Workflow includes AI assistance with human sign-off | `documentation/blog-authoring-workflow.md`                                                  | High       | Low          | Keep claim bounded to process, not guarantees |

## Source Quality Notes

- Primary sources used: repository docs and config files.
- Secondary sources used: none.
- Gaps: none for process/stack claims in this post.

## Time-Sensitive Checks

- Claims that may drift: roadmap status items and deployment state.
- Required date/version stamps: none required in body, but avoid implying completed deployment unless verified.

## Known Unknowns

1. Exact public launch state at read time.
2. Whether all roadmap items listed remain pending.
3. Future publishing cadence.

## Decisions

- Claims approved for draft: stack/workflow/process claims backed by current repo docs.
- Claims removed or softened: any hard assertion that all roadmap goals are already complete.
