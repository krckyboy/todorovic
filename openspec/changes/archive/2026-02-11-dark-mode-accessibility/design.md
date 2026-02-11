## Context

The site supports light/dark themes via CSS custom properties toggled by `[data-theme="dark"]` in global.css. Dark mode has a border contrast issue: `--color-border: #2a2a2a` on `--color-background: #121212` gives approximately 1.3:1 contrast — borders are nearly invisible. The Timeline component marks the current role only with `--color-primary` (orange), which fails WCAG for users who cannot distinguish color. Navigation uses `title` attributes on mobile icon-only links, which screen readers don't consistently announce. The search modal uses a `.focused` CSS class for highlighting results but lacks `focus-visible` support for keyboard navigation.

## Goals / Non-Goals

**Goals:**

- Achieve WCAG 2.1 AA compliance for border visibility in dark mode (minimum 3:1 contrast for UI components)
- Provide non-color differentiation for the current timeline item
- Ensure screen readers announce all navigation links on mobile
- Prevent keyboard traps in the search modal
- Add proper focus indicators to search results for keyboard users

**Non-Goals:**

- Full WCAG AAA compliance
- Redesigning the theme system
- Adding skip navigation links (separate change)
- Automated accessibility testing infrastructure

## Decisions

**1. Border color: #404040 (not #3a3a3a)**
Rationale: `#404040` on `#121212` gives approximately 2.6:1 contrast ratio — still subtle but clearly visible. `#3a3a3a` at ~2.0:1 is borderline. Going higher (e.g., `#555`) would make borders too prominent and distract from content.

**2. Current timeline item: Add "Current" text label**
Rationale: A text label is the most robust accessible indicator — it works for colorblind users, screen readers, and low-vision users. Adding a border or icon alone would still rely on visual perception. The text label supplements the existing color indicator.

**3. aria-label replaces title on Navigation links**
Rationale: `aria-label` is the standard attribute for accessible names. `title` is inconsistently announced by screen readers and primarily shows a tooltip on hover, which is useless on mobile touch devices.

**4. Search modal focus management via keydown event handler**
Rationale: The modal already has keyboard navigation for up/down arrows. Adding Escape-to-close (if not present) and Tab focus trapping within the modal boundaries prevents keyboard users from accidentally navigating behind the overlay.

## Risks / Trade-offs

- **[Risk]** Changing border color affects all components using `--color-border` in dark mode → Intentional: the token is global by design, and all borders benefit from better visibility
- **[Risk]** "Current" label on timeline may feel redundant with "Present" in the date → The label serves an accessibility purpose; can be styled as visually subtle while remaining available to screen readers
