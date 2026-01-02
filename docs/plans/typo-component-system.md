# Typo Component System

## Status: Phase 1 Complete

## Completed

### Core Infrastructure

- Types (`Typo.types.ts`), colors (`Typo.colors.ts`), base CSS
- Components: H1, H2 (with decorated variant), H3, H4, P, Highlight
- Prose-friendly default margins
- Storybook stories

### Flex Refactor

- Converted to CSS classes via CVA
- Gap via CSS custom property
- `resetChildMargins` prop (default: `false`)

### Migration

- Section, Job, SpecCard, NotFound use Typo components
- Removed global h1/h2/h3/p rules from `global.css`
- Highlight migrated to Typo.Highlight
- `src/routes/index.tsx` - ~20 `<p>` → `<Typo.P>`, 1 `<h3>` → `<Typo.H3>`
- `src/components/LookingForJob.tsx` - `<h1>` → `<Typo.H1>`
- Story files (Flex, Note, GlitchEffect) migrated

### Skipped (Intentional)

- `src/components/Header.tsx` - Logo intentionally lowercase
- `src/components/cv/*` - Print-specific styles, migrate separately

---

## Future Work

### Missing Components

| Component       | Purpose                 | Priority |
| --------------- | ----------------------- | -------- |
| `Lead`          | Larger intro paragraphs | Medium   |
| `Small`         | Small/caption text      | Medium   |
| `Large`         | Emphasized large text   | Low      |
| `Blockquote`    | Quoted text blocks      | Low      |
| `InlineCode`    | Inline code snippets    | Low      |
| `UnorderedList` | Styled `<ul>`           | Low      |
| `OrderedList`   | Styled `<ol>`           | Low      |

### CV Components Migration

- `cv/CvHeader.tsx` - `<h1>`
- `cv/CvJob.tsx` - `<h3>`, `<p>`
- `cv/CvProject.tsx` - `<h3>`
- `cv/CvSection.tsx` - `<h2>`

Note: CV has print-specific styles that need careful handling.

---

## API Reference

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

**File Structure:**

```
src/components/Typo/
├── index.ts
├── Typo.types.ts
├── Typo.colors.ts
├── Typo.css
├── Typo.H1.tsx + .css
├── Typo.H2.tsx + .css
├── Typo.H3.tsx + .css
├── Typo.H4.tsx + .css
├── Typo.P.tsx + .css
├── Typo.Highlight.tsx + .css
└── Typo.stories.tsx
```
