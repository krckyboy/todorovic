# Architecture: todorovic Portfolio

## Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Astro 5.x | Static site generation |
| Styling | CSS Modules | Scoped component styles |
| Variables | CSS Custom Properties | Design tokens |
| Content | Astro Content Collections | Type-safe markdown |
| Search | Pagefind | Client-side search |
| Build | Vite (via Astro) | Fast builds |
| Deploy | TBD | Static hosting |

## Directory Structure

```
todorovic/
├── .claude/                    # AI configuration
│   ├── agents/                 # Specialized AI agents
│   │   ├── orchestrator.md
│   │   ├── task-executor.md
│   │   ├── dependency-resolver.md
│   │   ├── feedback-listener.md
│   │   ├── verify-build.md
│   │   ├── verify-a11y.md
│   │   └── verify-seo.md
│   ├── skills/                 # Task templates
│   │   ├── opsx-new/
│   │   ├── opsx-status/
│   │   ├── opsx-next/
│   │   ├── new-component/
│   │   ├── new-page/
│   │   ├── new-post/
│   │   └── deploy/
│   └── state/                  # Runtime state
├── openspec/                   # Planning & specs
│   ├── project.md
│   ├── AGENTS.md
│   ├── specs/
│   │   └── astro-conventions/
│   ├── changes/
│   │   ├── migrate-to-astro/   # This change!
│   │   └── archive/
│   └── schemas/
│       ├── astro-project/
│       ├── astro-component/
│       ├── astro-page/
│       └── blog-content/
├── src/
│   ├── content/                # Content collections
│   │   ├── config.ts
│   │   └── blog/
│   ├── components/             # Astro components
│   ├── layouts/                # Page layouts
│   ├── pages/                  # Routes
│   ├── styles/                 # Global styles
│   │   └── global.css
│   └── data/                   # Static data
├── public/                     # Static assets
├── CLAUDE.md                   # AI quick reference
├── AGENTS.md                   # AI workflow docs
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

## Component Architecture

### Layouts

```
BaseLayout.astro
└── Provides: HTML structure, head, meta tags
    ├── Header
    ├── <slot /> (page content)
    └── Footer
```

### Components

| Component | Purpose | Props |
|-----------|---------|-------|
| Header | Site navigation | none |
| Footer | Footer content | none |
| Navigation | Nav links | none |
| BlogPostItem | Post preview | post |
| AuthorCard | Author info | none |
| Categories | Tag list | tags |
| Skills | Skills display | none |
| Experience | Work history | none |
| SocialIcons | Social links | none |

### Pages

| Route | Page | Data |
|-------|------|------|
| `/` | index.astro | featured posts |
| `/about` | about.astro | static |
| `/skills` | skills.astro | skills data |
| `/blog` | blog/index.astro | all posts |
| `/blog/[slug]` | blog/[slug].astro | single post |
| `/404` | 404.astro | static |

## Data Flow

```
Markdown files (src/content/blog/)
    ↓ Content Collections
Typed data (frontmatter + content)
    ↓ getCollection()
Page components
    ↓ Props
Child components
    ↓ Render
Static HTML
```

## Styling Strategy

### CSS Custom Properties (global.css)

```css
:root {
  /* Colors, typography, spacing, etc. */
  --color-primary: #3b82f6;
  --font-size-base: 1rem;
  --spacing-md: 1rem;
}
```

### CSS Modules (per component)

```css
/* Header.module.css */
.header {
  padding: var(--spacing-md);
}
```

### No Global Component Styles

Each component owns its styles via CSS Modules.

## Build Pipeline

```
Source files
    ↓ Astro build
Static HTML/CSS/JS
    ↓ Pagefind indexing
Search index
    ↓ Deploy
Production site
```

## AI Integration

### Orchestrator Pattern

```
User request
    ↓ Orchestrator
Parse & plan
    ↓ Parallel execution
Task agents
    ↓ Verification
Build/A11y/SEO agents
    ↓ Results
User feedback
```

### Feedback Loop

```
User correction
    ↓ Feedback listener
Pattern detection
    ↓ Spec update proposal
User approval
    ↓ Apply
Future tasks follow new rules
```
