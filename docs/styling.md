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
├── flex.css        # Flex utilities
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
/* Semantic color tokens */
--bg-main        /* Main background */
--bg-support     /* Secondary background */
--bg-accent      /* Accent background */

--fg-main        /* Main text */
--fg-support     /* Secondary text */
--fg-minor       /* Tertiary/muted text */
--fg-accent      /* Accent text */
--fg-on-accent   /* Text on accent background */
```

### Theme Variables

Set dynamically by the ControlPanel:

```css
--hue            /* Base hue (0-360) */
--hue-accent     /* Accent color hue */
--hue-accent-alt /* Alternative accent hue */
--chroma         /* Saturation multiplier (0.6, 1, 1.4) */
```

### Using Theme Colors

Always use semantic tokens, not raw OKLCH values:

```css
/* Good */
.Component {
  color: var(--fg-main);
  background-color: var(--bg-support);
  border-color: var(--fg-accent);
}

/* Avoid */
.Component {
  color: oklch(0.25 0.01 var(--hue));
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
--bg-main: light-dark(
  oklch(0.95 0.005 var(--hue)),
  /* light mode */ oklch(0.2 0.005 var(--hue)) /* dark mode */
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
