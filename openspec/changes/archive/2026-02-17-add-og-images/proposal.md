# Proposal: Add OG Images

> **STATUS: BACKLOG** as of February 14, 2026.

## Problem

When sharing links on social media (Twitter, LinkedIn, Slack), there's no preview image.

## Goals

1. Auto-generate Open Graph images for each page
2. Include page title in image
3. Consistent branding
4. Work for blog posts and static pages

## Approach

Use `@vercel/og` or `satori` to generate images at build time.

Alternative: Use a template-based approach with Canvas API.

## Scope

- Create OG image template
- Generate images for:
  - Home page
  - About page
  - Skills page
  - Each blog post
- Update BaseLayout meta tags to use generated images

## Design

- Background: gradient or solid color matching site theme
- Title: Large, readable text
- Author/site name: Smaller text
- Optional: Logo or avatar

## Out of Scope

- Dynamic runtime generation
- Custom images per post (use generated ones)
