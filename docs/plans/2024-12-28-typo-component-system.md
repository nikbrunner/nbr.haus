# Typo Component System Implementation Plan

## Overview

Create a unified typography component system that becomes the single source of truth, replacing global CSS typography rules.

## API Design

```tsx
// Two orthogonal props
<Typo.H2 color="accent" variant="decorated">Section Title</Typo.H2>
<Typo.P color="support">Secondary text</Typo.P>

// Variant helpers for custom elements
<div className={typoVariants.h1({ color: "accent" })}>Custom</div>
```

**Props:**

- `color`: main (default) | support | minor | accent | accentAlt
- `variant`: element-specific (e.g., H2 has "default" | "decorated")

**Defaults match current global.css:**

- H1, H3, H4, P, etc.: `color="main"`
- H2: `color="accent" variant="decorated"` (preserves current Section styling)

## File Structure

```text
src/components/Typo/
├── index.ts              # Barrel file (exports Typo + typoVariants)
├── Typo.types.ts         # Shared types (TypoColor, etc.)
├── Typo.colors.ts        # Shared color variant definitions
├── Typo.css              # Shared color classes
├── Typo.H1.tsx + .css
├── Typo.H2.tsx + .css
├── Typo.H3.tsx + .css
├── Typo.H4.tsx + .css
├── Typo.P.tsx + .css
├── Typo.Small.tsx + .css
├── Typo.Large.tsx + .css
├── Typo.Lead.tsx + .css
├── Typo.UnorderedList.tsx + .css
├── Typo.OrderedList.tsx + .css
├── Typo.Blockquote.tsx + .css
├── Typo.InlineCode.tsx + .css
└── Typo.stories.tsx
```

## Implementation Steps

### 1. Create shared infrastructure

- `Typo.types.ts` - TypoColor type
- `Typo.colors.ts` - Color variant config for CVA
- `Typo.css` - Shared `.Typo--color-*` classes

### 2. Create components (in order)

1. `Typo.P` (most used)
2. `Typo.H1`
3. `Typo.H2` (with "default" and "decorated" variants)
4. `Typo.H3`
5. `Typo.H4`
6. `Typo.Small`
7. `Typo.Large`
8. `Typo.Lead`
9. `Typo.UnorderedList` (no color prop)
10. `Typo.OrderedList` (no color prop)
11. `Typo.Blockquote` (no color prop)
12. `Typo.InlineCode` (no color prop)

### 3. Create barrel file

- `index.ts` exports `Typo` object and `typoVariants`

### 4. Add CSS imports to global.css

### 5. Create Storybook stories

### 6. Migrate usage

**Routes:**

- `src/routes/index.tsx` - raw `<p>`, `<h3>` tags
- `src/routes/cv.tsx` - raw `<p>` tags

**Components:**

- `Section.tsx` - `<h2>` → `<Typo.H2>` (default props work)
- `Header.tsx` - `<h1>`
- `Job.tsx` - `<h3>`
- `SpecCard.tsx` - `<h3>`
- `LookingForJob.tsx` - `<h1>`
- `NotFound.tsx` - `<h1>`
- `cv/CvHeader.tsx` - `<h1>`
- `cv/CvJob.tsx` - `<h3>`, `<p>`
- `cv/CvProject.tsx` - `<h3>`
- `cv/CvSection.tsx` - `<h2>`

### 7. Remove global typography styles

Delete lines 235-263 from `src/styles/global.css` (h1, h2, h3, p rules).
Keep `strong` and `button` rules.

## Key Files

- `src/styles/global.css` (lines 235-263) - Typography rules to migrate/remove
- `src/components/Badge.tsx` - Reference for CVA + BEM pattern in this project
- Reference: `/Users/nbr/repos/dealercenter-digital/bc-web-client-poc/frontend/src/components/Typo.tsx`

## Component Example: Typo.H2

```tsx
// Typo.H2.tsx
import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants, type TypoColor } from "./Typo.colors";

import "./Typo.H2.css";

export const h2Variants = cva("Typo-H2", {
  variants: {
    color: colorVariants,
    variant: {
      default: "",
      decorated: "Typo-H2--decorated"
    }
  },
  defaultVariants: {
    color: "accent", // Match current global.css
    variant: "decorated" // Match current global.css
  }
});

interface Props
  extends React.ComponentProps<"h2">,
    VariantProps<typeof h2Variants> {}

export function H2({ children, className, color, variant, ...props }: Props) {
  return (
    <h2 className={cx(h2Variants({ color, variant }), className)} {...props}>
      {children}
    </h2>
  );
}
```

```css
/* Typo.H2.css */
.Typo-H2 {
  font-size: var(--font-size-fluid-3);
  font-weight: var(--font-weight-9);
  margin-top: 0;
}

.Typo-H2--decorated {
  border-bottom: var(--border-size-2) dashed var(--fg-accent);
  padding-bottom: var(--size-1);
  text-transform: uppercase;
}
```
