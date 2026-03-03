# Research

## Claim-to-Source Map

| Claim                                                                                                           | Source (primary preferred)                                                                                           | Confidence | Recency Risk | Notes                                                                                     |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------- | ------------ | ----------------------------------------------------------------------------------------- |
| OpenSpec supports schema-driven workflows with ordered artifact dependencies.                                   | `openspec/schemas/blog-authoring/schema.yaml`                                                                        | High       | Low          | Artifact chain is explicit (`intent` -> `inspiration`/`research` -> `revision`).          |
| OpenSpec CLI baseline command surface includes change creation, status checks, instructions, and archive flows. | Local CLI output from `openspec --help` and `openspec --version` (`1.1.1`, checked February 28, 2026).               | High       | Medium       | Command names can change across CLI versions.                                             |
| This repo has a real completed example suitable for walkthrough (`investigate-blog-authoring-strategy`).        | `openspec/changes/investigate-blog-authoring-strategy/proposal.md` and `tasks.md`                                    | High       | Low          | Completed status and checklist are documented and easy to explain to readers.             |
| Advanced OpenSpec usage can encode strict procedural rules inside custom schemas.                               | `../react-kit/openspec/schemas/react-kit-component/schema.yaml`                                                      | High       | Low          | Schema includes mandatory instructions, verification loops, and prevention feedback flow. |
| Blog publish readiness in this repo requires lint/build plus manual checks.                                     | `documentation/blog-authoring-workflow.md`; `openspec/schemas/blog-authoring/schema.yaml` revision instruction block | High       | Low          | Supports the article's "verification is part of authoring" message.                       |

## Source Quality Notes

- Primary sources used: Local schema files, local OpenSpec change artifacts, local OpenSpec CLI output.
- Secondary sources used: OpenSpec GitHub repository link for reader reference (`https://github.com/Fission-AI/OpenSpec`).
- Gaps: No remote-doc scrape in this pass; examples rely on local repo state and installed CLI behavior.

## Time-Sensitive Checks

- Claims that may drift:
  - Exact CLI command set and flags.
  - Latest OpenSpec version.
- Required date/version stamps:
  - "Validated against OpenSpec CLI `1.1.1` on February 28, 2026."

## Known Unknowns

1. Whether readers are on older/newer OpenSpec versions with different command behavior.
2. Whether readers' repositories already include custom schema patterns comparable to the `react-kit-component` example.
3. How much detail readers want in the advanced section before it feels too heavy for a first post.

## Decisions

- Claims approved for draft:
  - Basic command walkthrough
  - Real-change roleplay example
  - Advanced section on schemas + skills + verification
- Claims removed or softened:
  - Any claim implying OpenSpec command stability across all versions without version/date qualifiers.
