# Astro Conventions

Coding standards and patterns for this Astro project.

## File Naming

| Type        | Convention        | Example             |
| ----------- | ----------------- | ------------------- |
| Components  | PascalCase        | `Header.astro`      |
| CSS Modules | PascalCase.module | `Header.module.css` |
| Pages       | kebab-case        | `about.astro`       |
| Layouts     | PascalCase        | `BaseLayout.astro`  |
| Content     | kebab-case        | `my-first-post.md`  |

## Components

### Structure

```astro
---
// 1. Imports
import styles from './ComponentName.module.css';
import OtherComponent from './OtherComponent.astro';

// 2. Props interface
interface Props {
  title: string;
  isActive?: boolean;
}

// 3. Props destructuring
const { title, isActive = false } = Astro.props;

// 4. Logic (if needed)
const classes = [styles.container, isActive && styles.active]
  .filter(Boolean)
  .join(' ');
---

<!-- 5. Template -->
<div class={classes}>
  <h2>{title}</h2>
  <slot />
</div>
```

### Props

- Always define TypeScript interface
- Use optional (`?`) for non-required props
- Provide defaults in destructuring
- Document complex props with comments

### Slots

- Use default slot for main content
- Use named slots for specific areas
- Document available slots in comments

## Modules (DDD Convention)

Complex features with multiple components and services SHALL use a module structure following Domain-Driven Design principles.

### Module Structure

```
src/modules/<feature>/
├── views/                    # Entry points (what consumers import)
│   ├── FeatureMain.tsx       # Main component
│   └── FeatureMain.module.css
├── components/               # Internal sub-components
│   ├── SubComponent.tsx
│   └── SubComponent.module.css
├── services/                 # Business logic, API, storage
│   └── featureService.ts
├── constants.ts              # Feature-specific constants
├── types.ts                  # TypeScript types
└── index.ts                  # Public exports
```

### Guidelines

1. **views/** - Contains entry point components that are imported by pages/other modules
2. **components/** - Internal sub-components, not exported publicly
3. **services/** - Business logic, localStorage, API calls, and reusable hook-style logic
4. **index.ts** - Re-exports from views/ for clean imports

### Example Import

```typescript
// Clean public API via index.ts
import { ThemeToggle } from '@/modules/theme';

// Or direct import from views/
import ThemeToggle from '@/modules/theme/views/ThemeToggle';
```

### When to Use Modules

- Feature has 3+ related files
- Feature has its own state/services
- Feature could be extracted as a package
- Examples: search, theme, auth

### When NOT to Use Modules

- Simple, standalone components (use `src/components/`)
- Single-file utilities
- Page-specific components

## CSS Modules

See [styling spec](../styling/spec.md) for complete CSS conventions.

### Quick Reference

- Use CSS custom properties from `global.css`
- Nest pseudo-selectors (`:hover`, `:focus`, `&.active`)
- Nest media queries inside classes
- Mobile-first responsive design
- Always include `:focus-visible` for accessibility

## Pages

### Structure

```astro
---
// 1. Imports
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';

// 2. Data fetching (if needed)
const posts = await getCollection('blog');

// 3. Page metadata
const title = 'Page Title';
const description = 'Page description for SEO';
---

<BaseLayout title={title} description={description}>
  <main class="container">
    <h1>{title}</h1>
    <!-- Page content -->
  </main>
</BaseLayout>
```

### Dynamic Routes

Use `[param].astro` syntax for dynamic routes. Requires `getStaticPaths()` for static generation:

```astro
---
// src/pages/blog/[slug].astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

interface Props {
  post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
const { title, description, pubDate, author, tags } = post.data;
const { Content } = await post.render();
---

<BaseLayout title={`${title} - Dušan Todorović`} description={description}>
  <article class="container content">
    <h1>{title}</h1>
    <Content />
  </article>
</BaseLayout>
```

### SEO Requirements

- Unique `<title>` per page
- Meta description (150-160 chars)
- Single `<h1>` per page
- Logical heading hierarchy
- Descriptive link text

## Layouts

### BaseLayout

The main layout that wraps all pages:

```astro
---
interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalURL} />
    <!-- Open Graph, etc. -->
  </head>
  <body>
    <slot />
  </body>
</html>
```

## Content Collections

### Blog Schema

```typescript
// src/content/config.ts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Dušan Todorović'),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
```

### Blog Post Frontmatter

```yaml
---
title: 'Post Title'
description: 'Brief description for SEO and previews'
pubDate: 2024-01-15
author: 'Dušan Todorović'
tags: ['astro', 'web development']
draft: false
image:
  url: '/images/post-image.jpg'
  alt: 'Descriptive alt text'
---
```

### Content Rendering

Use `render()` to get the Content component from collection entries:

```astro
---
const { post } = Astro.props;
const { title, description, pubDate } = post.data;

// Render the markdown content
const { Content } = await post.render();

// Format dates for display
const formattedDate = pubDate.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
---

<article>
  <h1>{title}</h1>
  <time datetime={pubDate.toISOString()}>{formattedDate}</time>

  <!-- Render the markdown content -->
  <div class="post-content">
    <Content />
  </div>
</article>
```

**Note:** The `Content` component renders markdown with full styling. Use `:global()` selectors in scoped styles to target rendered content:

```css
.post-content :global(h2) {
  font-size: var(--font-size-2xl);
  margin-top: var(--spacing-2xl);
}

.post-content :global(pre) {
  background-color: var(--color-background-alt);
  border-radius: var(--border-radius-md);
}
```

## Error Pages

### 404 Page

Create `src/pages/404.astro` for the not-found page:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

const title = '404 - Page Not Found';
const description = 'The page you are looking for could not be found.';
---

<BaseLayout title={title} description={description}>
  <div class="container error-page">
    <h1>404</h1>
    <p>Page not found</p>
    <p class="message">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <a href="/" class="button">Go Home</a>
  </div>
</BaseLayout>

<style>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    text-align: center;
  }

  h1 {
    font-size: 6rem;
    color: var(--color-primary);
    margin-bottom: var(--spacing-sm);
  }

  p {
    font-size: var(--font-size-xl);
    color: var(--color-text);
    margin-bottom: var(--spacing-sm);
  }

  .message {
    color: var(--color-text-muted);
    font-size: var(--font-size-base);
    margin-bottom: var(--spacing-xl);
  }

  .button {
    padding: var(--spacing-sm) var(--spacing-lg);
    background-color: var(--color-primary);
    color: white;
    border-radius: var(--border-radius-md);
    text-decoration: none;
    font-weight: 500;
    transition: background-color var(--transition-fast);
  }

  .button:hover {
    background-color: var(--color-primary-hover);
  }
</style>
```

### Error Page Guidelines

1. **Clear messaging** - Tell users what happened
2. **Navigation** - Provide a way back (home link)
3. **Consistent styling** - Use the standard layout
4. **Centered layout** - Use flexbox for vertical centering
5. **Visual hierarchy** - Large error code, smaller explanation

## Accessibility

### Requirements

1. **Semantic HTML** - Use appropriate elements
2. **Landmarks** - header, nav, main, footer
3. **Headings** - Logical hierarchy (h1 → h2 → h3)
4. **Images** - Alt text required
5. **Links** - Descriptive text (not "click here")
6. **Focus** - Visible focus states
7. **Color** - Don't rely on color alone

### ARIA

- Use ARIA only when HTML semantics insufficient
- Common patterns:
  - `aria-label` for icon buttons
  - `aria-current="page"` for current nav item
  - `aria-expanded` for toggles

### Focus States

Use `:focus-visible` for keyboard-accessible focus indicators. Global styles are defined in `global.css`:

```css
/* Base focus style for all elements */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Interactive elements with rounded corners */
a:focus-visible,
button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
[tabindex]:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: var(--border-radius-sm);
}
```

**Guidelines:**

1. **Use `:focus-visible`** instead of `:focus` to only show focus rings on keyboard navigation
2. **Consistent styling** - Use `var(--color-primary)` for the outline color
3. **Adequate offset** - Use `outline-offset: 2px` for visibility
4. **Match border-radius** - Add `border-radius` to match element styling
5. **Never remove focus** - Always provide visible focus indicators

## Performance

### Guidelines

1. **Optimize images** - Use appropriate formats, sizes
2. **Lazy load** - Below-fold images
3. **Minimize JS** - Use Astro's zero-JS default
4. **Critical CSS** - Inline above-fold styles
5. **Font loading** - Use `font-display: swap`
