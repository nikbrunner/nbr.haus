# Architecture

Overview of how the system is structured and how the pieces connect.

## Tech Stack

- **TanStack Start** - SSR framework with file-based routing
- **React 19** - UI library
- **TypeScript** - Type safety
- **CSS** - Regular CSS with BEM naming (no CSS-in-JS)
- **Zod** - Schema validation for search params and types

## Routing

File-based routing in `src/routes/`. The route tree is auto-generated at `src/routeTree.gen.ts` - never edit this file manually.

### Routes

| Route | Purpose                        |
| ----- | ------------------------------ |
| `/`   | Main portfolio page            |
| `/cv` | Print-friendly CV (PDF export) |

### Search Params

URL search params are the source of truth for UI state. Defined in `src/validators/rootSearchParams.ts`:

- `hue` - Accent color preset
- `colorMode` - light/dark/system
- `contrast` - Low/medium/high contrast
- `lang` - Locale (en/de)

These params are **retained across navigation** via TanStack Router's `retainSearchParams` middleware in `__root.tsx`.

### Server Functions

For server-only code (filesystem access, database queries, etc.), use TanStack Start's `createServerFn`. This ensures code runs only on the server and is not bundled into the client.

```tsx
import { createServerFn } from "@tanstack/react-start";

// Define the server function
export const getAllPosts = createServerFn({ method: "GET" })
  .inputValidator((data: { locale: "en" | "de" }) => data)
  .handler(async ({ data }) => {
    // Node.js APIs are safe here - this only runs on server
    const posts = await readPostsFromFilesystem(data.locale);
    return posts;
  });

// Call from route loader
export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const posts = await getAllPosts({ data: { locale: "en" } });
    return { posts };
  }
});
```

**Key points:**

- Use `.inputValidator()` for type-safe input (note: some docs show `.validator()` but v1.145.0 uses `.inputValidator()`)
- Node.js imports (`node:fs`, `node:path`) are safe inside the handler
- Call server functions from route loaders, not at module level
- Server functions can be called from the client - they become RPC calls

### Root Layout

`src/routes/__root.tsx` handles:

- SEO meta tags and structured data (JSON-LD)
- Global CSS import
- Search param validation and retention
- ControlPanel (client-only)
- Color mode initialization script (prevents flash)

## i18n System

Lightweight localization without external libraries.

### How It Works

```txt
URL ?lang=de  →  useLocale() reads param  →  useTexts() returns texts[locale]
     ↓
localStorage persists preference across sessions
```

### Text Structure

Texts are organized by domain in `src/texts/domains/`:

```txt
texts/
├── domains/
│   ├── shared.en.ts    # Common UI labels
│   ├── shared.de.ts
│   ├── jobs.en.ts      # Employment section
│   ├── jobs.de.ts
│   ├── projects.en.ts  # Projects section
│   └── ...
├── en.ts               # Merges all English domains
└── de.ts               # Merges all German domains
```

### Usage

```tsx
// In a route (smart container):
const t = useTexts();
return <Job title={t.jobs.dealerCenter.title} />;

// Get/set locale:
const { locale, setLocale } = useLocale();
```

### Adding Translations

1. Add text to both `*.en.ts` and `*.de.ts` in the appropriate domain
2. TypeScript will enforce that both locales have the same keys

## Theming System

The ControlPanel manages visual customization via CSS custom properties.

### CSS Variables

Set on `:root` and updated dynamically:

- `--hue` - Base hue value (0-360)
- `--hue-accent` - Accent color hue
- `--hue-accent-alt` - Alternative accent hue
- `--contrast-l` - Lightness multiplier
- `--contrast-c` - Chroma multiplier

### State Flow

```txt
User clicks ControlPanel option
    ↓
Hook updates (useHue, useColorMode, etc.)
    ↓
URL search param updated + localStorage persisted
    ↓
CSS variables updated on :root
    ↓
UI reacts via CSS
```

### Color Mode

Color mode uses `data-color-mode` attribute on `<html>`. A blocking script in `__root.tsx` reads the preference before React hydrates to prevent flash of wrong theme.

## Data Flow Summary

```txt
Routes (smart)
    ├── Call hooks (useTexts, useLocale, etc.)
    ├── Fetch/prepare data
    └── Pass props down
         ↓
Partials (compositions)
    ├── Compose multiple components
    ├── May have local state (e.g., isExpanded)
    └── Minimal styling
         ↓
Components (dumb)
    ├── Receive props only
    ├── Own all their styling
    └── Know nothing about context
```

See [components.md](./components.md) for details on this pattern.
