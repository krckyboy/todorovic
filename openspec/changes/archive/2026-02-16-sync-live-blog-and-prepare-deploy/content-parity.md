# Content Parity Audit (Live vs Local)

Date: February 16, 2026  
Scope: `sync-live-blog-and-prepare-deploy` Task 1 baseline audit

## Method

- Live source checked with `curl` against:
  - `https://todorovic.dev/blog/`
  - `https://todorovic.dev/blog/burnout-in-software-engineering`
  - `https://todorovic.dev/blog/unlocking-opportunities-why-conferences-matter`
  - `https://todorovic.dev/blog/welcome`
- Local source checked from:
  - `src/content/blog/burnout-in-software-engineering.md`
  - `src/content/blog/unlocking-opportunities-why-conferences-matter.md`
  - `src/content/blog/welcome.md`

## Inventory Summary

| Slug                                             | Live                | Local                  | Title parity | Date parity        | Notes                                   |
| ------------------------------------------------ | ------------------- | ---------------------- | ------------ | ------------------ | --------------------------------------- |
| `burnout-in-software-engineering`                | Present on `/blog`  | Present                | Yes          | Yes (`2024-06-08`) | Body content differs significantly      |
| `unlocking-opportunities-why-conferences-matter` | Present on `/blog`  | Present                | Yes          | Yes (`2024-06-02`) | Body content differs significantly      |
| `welcome`                                        | Missing (404 route) | Present (`welcome.md`) | No           | No                 | Must be replaced by planned launch post |

## Post-by-Post Findings

### 1) `burnout-in-software-engineering`

- Metadata parity:
  - Title matches: "Burnout in Software Engineering"
  - Date matches: June 08, 2024
  - Blog list read time on live: 9 min
- Body parity: **No**
  - Live contains longer, narrative sections and additional details not present in local markdown.
  - Live headings include:
    - `Recognizing the Symptoms`
    - `My Recent Experience with Remote Work`
    - `Causes of Burnout: Overwork`
    - `How It Affects the Team`
    - `My Frustrations`
  - Local file is a condensed rewrite and is not a body-faithful copy of the live post.

### 2) `unlocking-opportunities-why-conferences-matter`

- Metadata parity:
  - Title matches: "Unlocking Opportunities: Why Conferences Matter"
  - Date matches: June 02, 2024
  - Blog list read time on live: 6 min
- Body parity: **No**
  - Live contains substantially more detailed narrative sections than local markdown.
  - Live includes speaker/talk specifics and richer detail (for example references to Debbie O'Brien, Rose Akoth, Tejas Kumar, Bramus Van Damme with longer explanations).
  - Local file is shortened and not a body-faithful copy of the live post.

### 3) `welcome`

- Live route result: `404` with page heading `Oops!`
- Local file exists: `src/content/blog/welcome.md` ("Welcome to My Blog", `2024-01-31`)
- Parity status: **No**
  - This local post is not part of the current live site baseline.
  - Aligns with proposal task to replace it with a new launch post for the new Astro site.

## Additional SEO Observation (from live)

- `/blog` currently uses site-wide generic metadata (same title/description pattern used across multiple routes in live app).
- This confirms the need for the approved hybrid SEO strategy in this change:
  - keep route-specific metadata in Astro
  - selectively preserve useful search intent from live copy
  - avoid generic one-size-fits-all metadata behavior

## Task 1 Completion Decision

- `1.1 Inventory live blog slugs, titles, dates, and visible metadata`: complete
- `1.2 Compare live content to local markdown and record diffs`: complete
- `1.3 Produce parity checklist`: complete (this file)
