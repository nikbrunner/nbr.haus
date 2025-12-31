# Content

How to add and update content in the project.

## Adding Translations

Texts are organized by domain in `src/texts/domains/`. Each domain has an English (`.en.ts`) and German (`.de.ts`) file.

### Structure

```txt
src/texts/
├── domains/
│   ├── shared.en.ts     # Common UI labels
│   ├── shared.de.ts
│   ├── jobs.en.ts       # Employment section
│   ├── jobs.de.ts
│   ├── projects.en.ts   # Projects section
│   ├── projects.de.ts
│   ├── about.en.ts      # About section
│   ├── about.de.ts
│   ├── connect.en.ts    # Connect section
│   ├── connect.de.ts
│   ├── cv.en.ts         # CV page
│   ├── cv.de.ts
│   ├── controlPanel.en.ts
│   └── controlPanel.de.ts
├── en.ts                # Merges all English domains
└── de.ts                # Merges all German domains
```

### Adding Text to an Existing Domain

1. Add the text to the English file:

```ts
// src/texts/domains/shared.en.ts
export const texts = {
  // existing...
  newLabel: "New Label"
} as const;
```

2. Add the same key to the German file:

```ts
// src/texts/domains/shared.de.ts
export const texts = {
  // existing...
  newLabel: "Neues Label"
} as const;
```

TypeScript will error if keys don't match between locales.

### Creating a New Domain

1. Create both language files in `src/texts/domains/`:

```ts
// src/texts/domains/newDomain.en.ts
export const texts = {
  title: "My Title"
} as const;

// src/texts/domains/newDomain.de.ts
export const texts = {
  title: "Mein Titel"
} as const;
```

2. Add to the aggregator files:

```ts
// src/texts/en.ts
import { texts as newDomain } from "@/texts/domains/newDomain.en";

export const en = {
  // existing...
  newDomain
} as const;

// src/texts/de.ts (same pattern)
```

### Using Translations

In routes (smart containers):

```tsx
const t = useTexts();
return <Component label={t.shared.newLabel} />;
```

## Adding a New Route

1. Create a route file in `src/routes/`:

```tsx
// src/routes/about.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutRoute
});

function AboutRoute() {
  const t = useTexts();
  return <div>{t.about.title}</div>;
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

CV content lives in `src/texts/domains/cv.en.ts` and `cv.de.ts`.

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

## Updating ControlPanel Sections

Section navigation is configured in `src/components/ControlPanel/config.ts`:

```ts
export const routeSectionsConfig: Record<string, SectionConfig[]> = {
  "/": [
    { id: "connect", labelKey: "connect" },
    { id: "about", labelKey: "about" }
    // Add sections here...
  ]
};
```

Section IDs must match the `id` attribute on `<Section>` components in the route.
