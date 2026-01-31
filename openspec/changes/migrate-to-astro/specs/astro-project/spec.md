# Spec: Astro Project Requirements

## Overview

Requirements and specifications added by this migration.

## Project Configuration

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://todorovic.dev', // Update with actual URL
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
```

### TypeScript

- Strict mode enabled
- Path aliases configured

## Content Collections

### Blog Collection

Schema defined in `src/content/config.ts`:

| Field | Type | Required | Default |
|-------|------|----------|---------|
| title | string | Yes | - |
| description | string | Yes | - |
| pubDate | date | Yes | - |
| updatedDate | date | No | - |
| author | string | No | "Dušan Todorović" |
| image | {url, alt} | No | - |
| tags | string[] | No | [] |
| draft | boolean | No | false |

## Layouts

### BaseLayout

Required props:
- `title: string` - Page title
- `description?: string` - Meta description

Provides:
- HTML document structure
- Meta tags (title, description, OG, Twitter)
- Canonical URL
- Global styles import
- Header and Footer

## Components Required

| Component | Purpose | Priority |
|-----------|---------|----------|
| Header | Site header with nav | High |
| Footer | Site footer | High |
| Navigation | Nav links | High |
| BlogPostItem | Post preview card | High |
| Categories | Tag display | Medium |
| AuthorCard | Author info | Medium |
| Skills | Skills display | Medium |
| Experience | Work history | Medium |
| SocialIcons | Social media links | Low |

## Pages Required

| Route | Purpose | Priority |
|-------|---------|----------|
| / | Home page | High |
| /about | About page | High |
| /skills | Skills page | Medium |
| /blog | Blog listing | High |
| /blog/[slug] | Blog post | High |
| /404 | Not found | Medium |

## Styling Requirements

### CSS Custom Properties

Defined in `global.css`:
- Colors (text, background, primary, accent)
- Typography (font families, sizes)
- Spacing (xs through 3xl)
- Layout (max-width, content-width)
- Borders, shadows, transitions

### Component Styles

- CSS Modules for each component
- Use custom properties
- Mobile-first responsive
- No inline styles

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Semantic HTML throughout
- Keyboard navigation
- Skip links
- Proper heading hierarchy
- Alt text on images
- Visible focus states

## Performance Requirements

- Lighthouse Performance: 95+
- No client-side JS unless necessary
- Optimized images
- Lazy loading for below-fold content

## SEO Requirements

- Unique titles per page
- Meta descriptions
- Open Graph tags
- Twitter Card tags
- Sitemap generation
- Canonical URLs
