# SEO Metadata Matrix (Hybrid Strategy)

Date: February 16, 2026  
Scope: Tasks `4.1` and `4.2` for `sync-live-blog-and-prepare-deploy`

## Strategy

- Keep route-specific metadata (no site-wide generic title/description reuse).
- Reuse high-value intent from live site where relevant:
  - `JavaScript developer`
  - `team lead` / `team leader`
  - `React`
  - `web development`
- Keep each route differentiated for search intent and social previews.

## Route Matrix

| Route          | Current Title                           | Proposed Title         | Current Description                                 | Proposed Description                                                                                                 |
| -------------- | --------------------------------------- | ---------------------- | --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `/`            | `Dušan Todorović - Software Developer`  | `Dušan Todorović       | Frontend Team Lead and JavaScript Engineer`         | `Personal portfolio and blog of Dušan Todorović. Software developer focused on web technologies.`                    | `Frontend Team Lead and JavaScript engineer sharing work on React, Next.js, and modern web development.`          |
| `/about`       | `About - Dušan Todorović`               | `About Dušan Todorović | Frontend Team Lead, React and Next.js`              | `Learn more about Dušan Todorović, a software developer passionate about web technologies.`                          | `About Dušan Todorović: frontend team lead focused on React, Next.js, leadership, and scalable web engineering.`  |
| `/skills`      | `Skills & Experience - Dušan Todorović` | `Skills and Experience | Dušan Todorović, Frontend Team Lead`                | `Technical skills, soft skills, and work experience of Dušan Todorović in web development and software engineering.` | `Technical skills and leadership experience across React, Next.js, frontend architecture, and software delivery.` |
| `/blog`        | `Blog - Dušan Todorović`                | `Blog                  | Dušan Todorović on Web Development and Engineering` | `Articles about web development, programming, and technology.`                                                       | `Articles on frontend engineering, React, team leadership, and AI-assisted software development workflows.`       |
| `/blog/[slug]` | `${title} - Dušan Todorović`            | `${title}              | Dušan Todorović Blog`                               | Uses post frontmatter description                                                                                    | Keep post-level frontmatter description, optimized per article intent                                             |

## Live Intent Term Mapping

| Live Intent Term              | Target Route(s)                   | How It Is Preserved                                                           |
| ----------------------------- | --------------------------------- | ----------------------------------------------------------------------------- |
| `Senior JavaScript Developer` | `/`, `/skills`                    | Kept as `JavaScript engineer` and role/skills phrasing in title + description |
| `Team Leader`                 | `/`, `/about`, `/skills`          | Preserved as `Frontend Team Lead` in route-level metadata                     |
| `React`                       | `/`, `/about`, `/skills`, `/blog` | Explicitly included in metadata where technically relevant                    |
| `Web development`             | `/`, `/about`, `/blog`            | Preserved as broad topical intent for discoverability                         |

## Implementation Notes

- Apply these values in:
  - `src/pages/index.astro`
  - `src/pages/about.astro`
  - `src/pages/skills.astro`
  - `src/pages/blog/index.astro`
  - `src/pages/blog/[slug].astro`
- Keep `BaseLayout` canonical, OG, and Twitter tags route-specific via passed `title`/`description`.
- Post-level metadata quality depends on strong frontmatter descriptions in `src/content/blog/*.md`.
