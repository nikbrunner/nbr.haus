# Styling

CSS approach and conventions used in this project.

## Overview

- **Regular CSS** with BEM naming
- **CSS custom properties** for tokens and theming, defined on `body` in `src/styles/global.css`
- **TX-02** Condensed for everything, self-hosted as Latin-subset WOFF2 in `public/fonts/TX-02/woff2/`
- **No CSS-in-JS** - styles are in co-located `.css` files

## File Structure

```txt
src/styles/
├── global.css   # Entry: tokens, base elements, component imports, print tokens last
└── fonts.css    # @font-face declarations
```

Component CSS is co-located with the component and imported in `global.css`.

## BEM Naming

```css
.Block {
}
.Block__element {
}
.Block--modifier {
}
```

Native nesting is fine inside a block (`&:hover`, `& p`).

## Tokens

### Type

A typewriter document: one size and one line unit carry nearly everything. Hierarchy comes from case, weight, tracking, rules and boxes, not from size.

- `--font-size-base` 16px (15px on phones, 10pt in print), `--line` 24px (15pt in print)
- `--line-half`, `--line-quarter`, `--line-double` for vertical distances; every distance is a whole line or adds up to one
- `--tab` (2ch) and `--label-width` (14ch, 12ch on phones) for horizontal tab stops; `--measure` 80ch for prose
- Weights `--font-weight-regular` 400, `--font-weight-semibold` 600, `--font-weight-bold` 700, plus 400 italic
- `--tracking-body` 0.02em on everything, `--tracking-caps` 0.06em on uppercase heads and labels
- Figures are tabular, and `ss01` gives TX-02's slashed zero

Section heads are bold caps on a 4px double rule; sub-heads are semibold caps on a 1px rule. Their padding and margin are quarter-line values that add up to one line below the head.

### Color

Neutrals and accents follow Black Atom's default theme. The sheet is tinted paper with blue-black ink in light mode and warm charcoal with chalk ink in dark mode. The desk behind it is a cutting mat (16px fine grid, 80px major grid) in the accent hue. Accent presets: red 27, orange 65, green 155, blue 265.

```css
--color-desk, --color-desk-line, --color-desk-fine  /* The mat */
--color-edge                                        /* Sheet edge and hard shadow */
--color-bg-main                                     /* Paper */
--color-fg-main                                     /* Ink, rules, boxes */
--color-fg-minor                                    /* Muted text */
--color-line                                        /* Light fills such as inline code */
--color-accent                                      /* Links and section numbers */
--color-fg-on-accent
```

The light accent sits at L 0.50 so links keep 4.5:1 or more on the tinted paper for every preset.

Use the tokens, not raw values.

## Component Isolation

A component's CSS never references another component's classes. Print and responsive adjustments live in the component's own file.

## Color Mode

```css
html {
  color-scheme: light dark;
}

html[data-color-mode="light"] {
  color-scheme: light;
}

html[data-color-mode="dark"] {
  color-scheme: dark;
}
```

`light-dark()` picks the value from the active color scheme.

## Print

The `@media print` block at the end of `src/styles/global.css` sets A4 with 14mm margins, forces the light scheme, and swaps in ink-on-white print tokens. Print drops the desk, grain, shadow and binder rings. It stays last in the file so it wins over the screen rules. Components hide their interactive parts in `@media print` (the control bar, the CV row via `SpecItem hideInPrint`). `.no-print` is available for one-off route content.
