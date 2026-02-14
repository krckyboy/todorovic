# Migrate to Astro

> **STATUS: COMPLETED BASELINE** as of February 14, 2026.
> Follow-up enhancements now live in separate changes (for example: `redesign-portfolio`, `navigation-cta-fixes`, `blog-ux-improvements`, `optimize-header-hydration`, `setup-deployment`).

## Problem

The current portfolio site uses Next.js with Strapi CMS, which adds unnecessary complexity for a personal portfolio/blog:

- Server-side infrastructure for a mostly static site
- CMS maintenance overhead
- Heavier build process

## Solution

Migrate to Astro with:

- Static site generation (faster, simpler)
- Content Collections for blog (markdown files, no CMS)
- CSS Modules for styling (lightweight, scoped)
- AI-assisted development workflow (OpenSpec + Claude agents)

## Scope

### Included

- Full site migration (home, about, skills, blog)
- OpenSpec workflow setup
- AI agent architecture
- Content collection setup
- Component migration
- Search implementation (Pagefind)

### Not Included

- CMS integration (using markdown files instead)
- Server-side features
- Authentication/user features
- E-commerce

## Success Criteria

1. **Build passes** - `npm run build` succeeds
2. **All pages work** - Home, About, Skills, Blog functional
3. **Blog works** - Posts render, search works
4. **Performance** - Lighthouse 95+ score
5. **Accessibility** - WCAG 2.1 AA compliance
6. **OpenSpec works** - All skills and agents functional
7. **Documentation** - CLAUDE.md, AGENTS.md complete

## Technical Decisions

| Decision   | Choice              | Rationale           |
| ---------- | ------------------- | ------------------- |
| Framework  | Astro 5.x           | Best static site DX |
| Styling    | CSS Modules         | Scoped, no runtime  |
| Content    | Content Collections | Type-safe, built-in |
| Search     | Pagefind            | Client-side, fast   |
| AI Config  | Claude only         | Primary AI tool     |
| Components | Pure Astro          | No hydration needed |

## Timeline

This migration documents itself as an OpenSpec change to demonstrate the workflow.

## References

- [Astro Documentation](https://docs.astro.build)
- [Pagefind Documentation](https://pagefind.app)
