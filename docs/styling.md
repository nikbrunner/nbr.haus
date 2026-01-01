# Styling

CSS approach and conventions used in this project.

## Overview

- **Regular CSS** with BEM naming convention
- **Open Props** for design tokens (spacing, typography, borders)
- **CSS custom properties** for theming
- **No CSS-in-JS** - styles are in co-located `.css` files

## File Structure

All CSS is imported through `src/styles/global.css`:

```txt
src/styles/
├── global.css      # Main entry, imports everything
├── fonts.css       # @font-face declarations
├── spacings.css    # Spacing utilities
├── print.css       # Print styles
└── print-utils.css # Print utility classes
```

Component CSS is co-located with components and imported in `global.css`:

```css
/* global.css */
@import "../components/Button.css";
@import "../components/Job.css";
```

## BEM Naming

Use Block-Element-Modifier pattern:

```css
.Block {
}
.Block__element {
}
.Block--modifier {
}
```

Example:

```css
.Button {
}
.Button--accent {
}
.Button--large {
}

.Job {
}
.Job__title {
}
.Job__company {
}
```

## CSS Variables

### Color System

Colors use OKLCH with CSS `light-dark()` for automatic theme switching:

```css
/* Semantic color tokens (all prefixed with --color-) */
--color-bg-main        /* Main background */
--color-bg-support     /* Secondary background */
--color-bg-accent      /* Accent background */

--color-fg-main        /* Main text */
--color-fg-support     /* Secondary text */
--color-fg-minor       /* Tertiary/muted text */
--color-fg-accent      /* Accent text */
--color-fg-on-accent   /* Text on accent background */

--color-accent         /* Primary accent color */
--color-accent-alt     /* Complementary accent color */
```

### Hue System

The accent hue is set by `useAccent` hook, complementary is calculated in CSS:

```css
/* Set dynamically via JS */
--hue-accent              /* User-selected accent hue (0-360) */

/* Defined in CSS */
--hue-accent-compl-degree /* Offset for complementary (default: 90) */
--hue-accent-compl        /* calc(--hue-accent + --hue-accent-compl-degree) */

/* Chroma multiplier for contrast levels */
--chroma                  /* low=0.6, base=1, high=1.4 */
```

Note: oklch wraps hue values automatically, so `--hue-accent-compl` doesn't need clamping.

### Using Theme Colors

Always use semantic tokens, not raw OKLCH values:

```css
/* Good */
.Component {
  color: var(--color-fg-main);
  background-color: var(--color-bg-support);
  border-color: var(--color-fg-accent);
}

/* Avoid */
.Component {
  color: oklch(0.25 0.01 var(--hue-accent));
}
```

## Open Props

Design tokens from Open Props are available globally:

```css
/* Spacing */
var(--size-1)    /* 0.25rem */
var(--size-2)    /* 0.5rem */
var(--size-3)    /* 1rem */
...

/* Typography */
var(--font-size-0)
var(--font-weight-7)
var(--font-lineheight-3)

/* Borders */
var(--border-size-1)
var(--border-size-2)
var(--radius-2)
```

## Component Isolation

**Critical rule:** A component's CSS must never reference another component's classes.

```css
/* Bad - Job shouldn't know about Tag */
.Job .Tag {
  margin-left: var(--size-2);
}

/* Good - Use a Job-specific element */
.Job__tag {
  margin-left: var(--size-2);
}
```

This keeps components independent and reusable.

## Where Styling Lives

| Layer      | Styling                            |
| ---------- | ---------------------------------- |
| Components | All styling (co-located CSS files) |
| Partials   | Minimal to none                    |
| Routes     | Layout only (grid, positioning)    |

Routes and partials should not define visual styles - those belong in components.

## Color Mode

Color mode is handled via `data-color-mode` attribute on `<html>`:

```css
/* System default (uses prefers-color-scheme) */
html {
  color-scheme: light dark;
}

/* Manual overrides */
html[data-color-mode="light"] {
  color-scheme: light;
}

html[data-color-mode="dark"] {
  color-scheme: dark;
}
```

The `light-dark()` function automatically picks the right color:

```css
--color-bg-main: light-dark(
  oklch(0.95 0.005 var(--hue-accent-compl)),
  /* light mode */ oklch(0.25 0.005 var(--hue-accent-compl)) /* dark mode */
);
```

## Print Styles

Print-specific styles are in `src/styles/print.css`. The `/cv` route is designed for PDF export.

```css
@media print {
  .no-print {
    display: none !important;
  }
}
```

## Fluid Typography

Use fluid font sizes for responsive text:

```css
--font-size-fluid-0: clamp(0.75rem, 5cqw, 1rem);
--font-size-fluid-1: clamp(1rem, 5cqw, 1.5rem);
--font-size-fluid-2: clamp(1.5rem, 5cqw, 2.5rem);
--font-size-fluid-3: clamp(2rem, 5cqw, 3.5rem);
```
