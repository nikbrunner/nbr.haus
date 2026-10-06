# Content

How to add and update content in the project.

## Text

All copy is English and written inline in the routes (`src/routes/*.tsx`). Components receive text via props.

## Study Posts

Study posts are Markdown files with frontmatter in `src/content/study/<slug>.en.md`. They are loaded by the server functions in `src/lib/study/posts.ts` and served at `/study/<slug>`.

## Adding a New Route

1. Create a route file in `src/routes/`:

```tsx
// src/routes/about.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutRoute
});

function AboutRoute() {
  return <div>About</div>;
}
```

2. (Optional) Create co-located CSS:

```css
/* src/routes/about.css */
```

3. Import CSS in `src/styles/global.css`:

```css
@import "../routes/about.css";
```

4. The route tree regenerates automatically on `npm run dev`.

## Updating CV Content

CV content lives inline in `src/routes/cv.tsx`. `npm run generate:cv` regenerates `public/Nikolaus_Brunner_CV_en.pdf` from it.

The CV route (`/cv`) is designed for PDF export via browser print.

## Updating Tech Stack

Tech definitions live in `src/config.ts`:

```ts
export const tech = {
  typescript: {
    name: "TypeScript",
    url: "https://www.typescriptlang.org",
    color: "#3178c6"
  }
  // Add new tech here...
} as const;
```

Use in components:

```tsx
import { tech } from "@/config";

<Tag name={tech.react.name} url={tech.react.url} />;
```

## ControlPanel Sections

The ControlPanel's section navigation is built at runtime by `useDynamicSections`, which scans `<main>` for `[data-section]`, `section[id]`, `h2[id]` and `h3[id]`. Give a section an `id` and it shows up; the label comes from `data-section-label`, `aria-label` or the text content.
