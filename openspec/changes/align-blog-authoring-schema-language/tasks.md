## 1. Schema Language Alignment

- [x] 1.1 Update `openspec/schemas/blog-authoring/schema.yaml` with explicit plain-language and practical-example guidance.
- [x] 1.2 Preserve current artifact flow, dependencies, and quality-gate commands.

## 2. Template Language Alignment

- [x] 2.1 Update `openspec/schemas/blog-authoring/templates/intent.md` to request natural, concrete, non-buzzword language.
- [x] 2.2 Update `openspec/schemas/blog-authoring/templates/inspiration.md` to guide practical storytelling with real context.
- [x] 2.3 Update `openspec/schemas/blog-authoring/templates/revision.md` to include plain-language simplification checks.

## 3. Verification

- [x] 3.1 Run `npm run lint`.
- [x] 3.2 Run `npm run build`.
- [x] 3.3 Confirm schema files remain parseable and OpenSpec change status resolves without missing artifact blockers.

## 4. Three-Role Review Model

- [x] 4.1 Add `technical-review` and `editorial-review` artifacts to `blog-authoring` schema.
- [x] 4.2 Add templates for role 2 and role 3 review outputs.
- [x] 4.3 Update blog-authoring skill instructions to enforce writer -> technical -> editorial sequencing.

## 5. Dedicated Role Skills/Agents

- [x] 5.1 Add `openspec-blog-writer` skill and agent config.
- [x] 5.2 Add `openspec-blog-technical-review` skill and agent config.
- [x] 5.3 Add `openspec-blog-editorial-review` skill and agent config.
- [x] 5.4 Update `openspec-blog-authoring` router skill/agent to orchestrate the three role skills.
- [x] 5.5 Add `new-blog` orchestrator skill/agent for `/new-blog <change-id>` style kickoff.
