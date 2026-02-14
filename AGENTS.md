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
- `astro-page` - For creating pages
- `blog-content` - For creating blog posts

Example: `/opsx:new add-contact-page --schema astro-page`

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

**Always read the relevant spec before implementation:**

| Task      | Read First                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------------- |
| Component | [openspec/specs/astro-conventions/spec.md#components](openspec/specs/astro-conventions/spec.md)          |
| Page      | [openspec/specs/astro-conventions/spec.md#pages](openspec/specs/astro-conventions/spec.md)               |
| Blog post | [openspec/specs/astro-conventions/spec.md#content-collections](openspec/specs/astro-conventions/spec.md) |
| Styling   | [openspec/specs/astro-conventions/spec.md#css-modules](openspec/specs/astro-conventions/spec.md)         |

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
├── openspec/
│   ├── config.yaml             # Project context
│   ├── specs/                  # Source of truth
│   ├── changes/                # Active proposals
│   └── schemas/                # Custom workflows
├── src/
│   ├── content/blog/           # Blog posts (markdown)
│   ├── components/             # Astro components
│   ├── layouts/                # Page layouts
│   ├── pages/                  # Routes
│   └── styles/                 # Global CSS
└── public/                     # Static assets
```

## Key Conventions

- **Components**: PascalCase, CSS Modules, TypeScript Props interface
- **Pages**: kebab-case, BaseLayout wrapper, unique title/description
- **Blog**: Markdown with frontmatter, draft flag for WIP
- **Styling**: CSS custom properties from global.css, mobile-first

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
