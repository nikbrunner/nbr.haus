# Components

Component architecture and patterns used in this project.

## Core Pattern: Smart Routes, Dumb Components

```txt
src/routes/        → Smart containers (data, hooks, logic, copy)
src/partials/      → Reusable compositions (no styling)
src/components/    → Dumb components (props only, all styling)
```

### Routes (Smart)

Routes call loaders and queries, prepare data, and hold the copy. Each route renders the `SiteHeader` partial with its own meta and title, and its `Colophon`. The root renders the sheet and the grain.

```tsx
// src/routes/index.tsx
<SpecSection number="02" title="About">
  <Prose>
    <p>I build frontend architecture and design systems…</p>
  </Prose>
</SpecSection>
```

### Partials (Compositions)

Partials compose components into reusable units without styling of their own. `MarkdownContent` renders a study post's Markdown inside a numbered `Prose`, and `InlineMarkdown` renders one source line; `SiteHeader` puts the document header and `SiteControls` beside `SiteIndex` in a `Masthead`; `SiteControls`, `SiteIndex` and `NotFound` are small containers that read hooks or loader data.

### Components (Dumb)

Components receive all data via props, own their co-located CSS, and know nothing about the app.

| Component        | Role                                                                        |
| ---------------- | --------------------------------------------------------------------------- |
| `Sheet`          | Tinted paper on the desk; `punched` adds binder rings and a perforation     |
| `DocumentHeader` | Identity and meta blocks, then the boxed document title (`h1`)              |
| `Masthead`       | Two columns above the first section, closed by a dashed rule; stacks narrow |
| `ControlBar`     | Wrapping row of control groups                                              |
| `ControlGroup`   | Uppercase label followed by its options or links                            |
| `ControlButton`  | Bracketed option, `[LIGHT]`; inverted when pressed                          |
| `SpecSection`    | Numbered section head on a double rule (`h2`)                               |
| `SpecSubsection` | Numbered sub-head on a single rule (`h3`)                                   |
| `SpecList`       | Label and value rows on a tab stop (`dl`)                                   |
| `Entry`          | Tab-stopped aside column, then the entry body                               |
| `Text`           | Inline caps, bold or muted text; `spaced` starts a new block                |
| `Rule`           | Solid or dashed separator                                                   |
| `Prose`          | Long-form text; `numberPrefix` numbers `h2`s (01.1, 01.2) with CSS counters |
| `DataTable`      | Generic table from column definitions, with a placeholder row               |
| `InlineList`     | Wrapping row of links or short items                                        |
| `Contents`       | Labelled index tree with CSS-drawn lines and a current-page marker          |
| `WebUiAgentFlow` | Inline SVG of the web-ui agent flow: skills you run, knowledge it reads     |
| `Colophon`       | Footer: start, italic center, end                                           |
| `Grain`          | Animated film-grain overlay                                                 |

## File Structure

```txt
src/components/
├── SpecSection.tsx           # Component
├── SpecSection.css           # Styles (BEM), imported in global.css
└── SpecSection.stories.tsx   # Storybook story
```

## Adding a New Component

1. Create the component file in `src/components/`
2. Create co-located CSS with BEM naming and import it in `src/styles/global.css`
3. Add a Storybook story
4. Use it in a route or partial

## Key Principles

1. **Components own their styling** - Never reference another component's CSS classes
2. **Props down, events up** - Data flows down, callbacks handle user actions
3. **Partials have no styling** - They compose, they don't style
4. **Routes are the boundary** - Routes prepare data; only routes and partials access hooks
5. **Print is part of the component** - A component hides or adapts itself in `@media print`

See [styling.md](./styling.md) for CSS conventions.
