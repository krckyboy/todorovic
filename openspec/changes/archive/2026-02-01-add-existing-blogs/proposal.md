# Proposal: Add Existing Blogs

## Problem

The existing blog posts from todorovic.dev need to be migrated to the new Astro site.

## Goals

1. Migrate all existing blog posts from todorovic.dev
2. Preserve original publication dates
3. Maintain SEO (redirects if URLs change)
4. Ensure proper formatting and code highlighting

## Scope

- Fetch/export existing blog content from Strapi CMS or current site
- Convert to Markdown with proper frontmatter
- Add to src/content/blog/
- Verify Content Collections work with all posts
- Update any internal links

## Tasks

1. [ ] List all existing blog posts from todorovic.dev
2. [ ] Export content (from Strapi or scrape from site)
3. [ ] Convert each post to Markdown
4. [ ] Add proper frontmatter (title, description, pubDate, tags)
5. [ ] Verify images are migrated to public/
6. [ ] Test build with all posts
7. [ ] Verify code blocks render correctly

## Notes

- May need to adjust Content Collection schema if existing posts have different metadata
- Consider keeping draft posts as draft: true
