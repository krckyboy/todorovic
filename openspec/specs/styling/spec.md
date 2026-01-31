# Styling Conventions

CSS and styling standards for this project.

## CSS Custom Properties

All style values MUST use CSS custom properties from `src/styles/global.css`.

### Available Properties

```css
/* Colors */
--color-primary
--color-text
--color-text-muted
--color-background
--color-background-alt
--color-border

/* Spacing */
--spacing-xs
--spacing-sm
--spacing-md
--spacing-lg
--spacing-xl

/* Typography */
--font-size-xs
--font-size-sm
--font-size-base
--font-size-lg
--font-size-xl
--font-weight-normal
--font-weight-medium
--font-weight-bold

/* Effects */
--border-radius-sm
--border-radius-md
--border-radius-lg
--transition-fast
--transition-normal
```

## CSS Modules

### File Naming

- Use `ComponentName.module.css` for component styles
- Place in same directory as component

### Structure with Nesting

```css
/* ComponentName.module.css */

/* Base component styles with pseudo-selectors nested */
.link {
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  text-decoration: none;
  border-radius: var(--border-radius-md);
  transition: color var(--transition-fast), background-color var(--transition-fast);

  &:hover {
    color: var(--color-text);
    background-color: var(--color-background-alt);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &.active {
    color: var(--color-primary);
    font-weight: var(--font-weight-medium);
  }
}

/* Container with nested media queries */
.container {
  padding: var(--spacing-md);
  background: var(--color-background);

  @media (min-width: 768px) {
    padding: var(--spacing-lg);
  }
}

/* Separate class for distinct elements */
.title {
  font-size: var(--font-size-lg);
  margin-bottom: var(--spacing-sm);
}
```

## Nesting Rules

### DO Nest

- Pseudo-selectors (`:hover`, `:focus`, `:active`, `:disabled`)
- Pseudo-elements (`::before`, `::after`)
- State modifiers (`&.active`, `&.open`, `&.disabled`)
- Media queries inside the class they modify
- Direct child variations (`&.variant-primary`)

### DO NOT Nest

- Unrelated classes (keep flat)
- Deep descendant selectors (avoid `.parent .child .grandchild`)
- Element selectors (avoid `.container h2`)

## Property Order

Organize properties in this order:

1. **Layout** - display, position, flex, grid, gap
2. **Box Model** - width, height, margin, padding
3. **Typography** - font, color, text-align, line-height
4. **Visual** - background, border, border-radius, box-shadow
5. **Effects** - transition, transform, opacity, cursor
6. **Pseudo-selectors** - nested at end

### Example

```css
.button {
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);

  /* Box Model */
  padding: var(--spacing-sm) var(--spacing-md);

  /* Typography */
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);

  /* Visual */
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-md);

  /* Effects */
  transition: all var(--transition-fast);
  cursor: pointer;

  /* Pseudo-selectors */
  &:hover {
    background-color: var(--color-background-alt);
    border-color: var(--color-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

## Responsive Design

### Mobile-First Approach

Start with mobile styles, add breakpoints for larger screens:

```css
.container {
  /* Mobile (default) */
  padding: var(--spacing-sm);
  flex-direction: column;

  /* Tablet */
  @media (min-width: 768px) {
    padding: var(--spacing-md);
    flex-direction: row;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    padding: var(--spacing-lg);
    max-width: 1200px;
  }
}
```

### Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Small desktops |
| xl | 1280px | Large desktops |

## Accessibility

### Focus States

ALL interactive elements MUST have visible focus styles:

```css
.interactive {
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
}
```

### Reduced Motion

Respect user preferences for reduced motion:

```css
.animated {
  transition: transform var(--transition-normal);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```

## Global Styles

Global styles live in `src/styles/global.css`:

- CSS custom property definitions
- Reset/normalize styles
- Base typography
- Utility classes (`.container`, `.visually-hidden`)

DO NOT add global styles in CSS Modules.
