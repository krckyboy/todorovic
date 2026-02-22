# Project Instructions

Instructions for AI assistants working on this Astro portfolio project.

## OpenSpec Workflow

Use OpenSpec for any non-trivial changes:

| Command          | Purpose                  |
| ---------------- | ------------------------ |
| `/opsx:new`      | Start a new change       |
| `/opsx:continue` | Create next artifact     |
| `/opsx:apply`    | Implement tasks          |
| `/opsx:archive`  | Archive completed change |

**Custom schemas available:**

- `astro-component` - For creating components
- `blog-authoring` - For blog ideation, research, drafting, and editing

Example: `/opsx:new write-openspec-agent-flow-post --schema blog-authoring`

## Open Proposal Tracker

- Maintain `openspec/specs/open-proposals/spec.md` as the umbrella tracker for all non-archived proposals.
- Keep it synchronized whenever proposal status, title, summary, or task progress changes.
- Update the tracker when a change is created, archived, superseded, or marked completed.

## Approval and Git Rules

- Never commit without explicit user approval.
- Never push without explicit user approval.
- Keep changes local and uncommitted until the user asks to commit/push.
- If the user says not to commit yet, continue implementation without committing.

## Delivery Summary Flow

At the end of each substantial task, provide a concise summary in this order:

1. What changed (high-level outcome)
2. Where it changed (grouped by page/route and key files)
3. Validation status (`npm run lint`, `npm run build`, and notable checks)
4. Git state (local-only vs committed/pushed, with commit hash if applicable)
5. Remaining manual checks or open items

## Before Writing Code

Use on-demand loading to keep context lean:

- Always read the relevant OpenSpec spec for the task.
- Do not preload all files in `documentation/`; open only the doc(s) needed for the current task.

| Task             | Read First                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| Component        | [openspec/specs/astro-conventions/spec.md#components](openspec/specs/astro-conventions/spec.md)             |
| Page             | [openspec/specs/astro-conventions/spec.md#pages](openspec/specs/astro-conventions/spec.md)                  |
| Blog post        | [openspec/specs/astro-conventions/spec.md#content-collections](openspec/specs/astro-conventions/spec.md)    |
| Blog tags        | [documentation/blog-authoring-workflow.md#tag-governance](documentation/blog-authoring-workflow.md)         |
| Styling          | [openspec/specs/astro-conventions/spec.md#css-modules](openspec/specs/astro-conventions/spec.md)            |
| Module/service   | [openspec/specs/astro-conventions/spec.md#modules-ddd-convention](openspec/specs/astro-conventions/spec.md) |
| Workflow         | [documentation/engineering-workflow.md](documentation/engineering-workflow.md)                              |
| Quality gates    | [documentation/validation-and-quality-gates.md](documentation/validation-and-quality-gates.md)              |
| Repo conventions | [documentation/architecture-conventions.md](documentation/architecture-conventions.md)                      |

## Pre-Implementation Brief (Required)

For any non-trivial implementation, explain the plan in plain language before making code changes.

Include these points:

1. The problem and expected outcome.
2. The implementation approach in simple terms (for example: "replace React island with DOM script" vs "optimize existing React code").
3. The exact files to be changed and why.
4. What users will notice after the change, and what should stay the same.
5. Main risks/tradeoffs (performance, maintainability, accessibility, regression risk).

Rules:

- If the approach changes implementation style (example: React to DOM manipulation), call it out explicitly at the top.
- Ask for confirmation before implementing unless the user explicitly asks to proceed immediately.
- If the approach changes during implementation, stop and provide an updated brief before continuing.

## Quick Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Directory Structure

```
todorovic/
├── .claude/                    # AI configuration (managed by OpenSpec)
├── documentation/              # Repo-wide engineering documentation
├── openspec/
│   ├── config.yaml             # Project context
│   ├── specs/                  # Source of truth
│   ├── changes/                # Active proposals
│   └── schemas/                # Custom workflows
├── src/
│   ├── content/blog/           # Blog posts (markdown)
│   ├── components/             # Astro components
│   ├── layouts/                # Page layouts
│   ├── modules/                # DDD-inspired feature modules
│   ├── pages/                  # Routes
│   └── styles/                 # Global CSS
└── public/                     # Static assets
```

## Key Conventions

- **Architecture**: Domain-Driven Design inspired module boundaries for complex features (`src/modules/<feature>/views|components|services`)
- **Module internals**: No separate `hooks/` folder convention; reusable hook-style logic belongs in `services/`
- **Modules**: Keep business/data logic in `services/`; keep rendering in `views/` and `components/`
- **Components**: PascalCase, CSS Modules, TypeScript Props interface
- **Pages**: kebab-case, BaseLayout wrapper, unique title/description
- **Blog**: Markdown with frontmatter, draft flag for WIP
- **Styling**: CSS custom properties from global.css, mobile-first
- **Astro conventions**: Follow `openspec/specs/astro-conventions/spec.md` as source of truth

# Subagent Usage

Use subagents (via the Task tool) when it benefits quality or context preservation:

- **Parallel exploration**: Search multiple areas of the codebase simultaneously
- **Self-review**: Run multiple review agents to catch different types of issues
- **Bulk operations**: Execute independent tasks in parallel for efficiency
- **Context management**: Delegate to subagents to preserve main conversation context

Guidelines:

- Use 3-10 subagents for comprehensive reviews or multi-area searches
- Prefer parallel execution when tasks are independent
- Summarize subagent findings concisely for the user
