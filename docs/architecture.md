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

| Route             | Purpose                                 |
| ----------------- | --------------------------------------- |
| `/`               | Main portfolio page                     |
| `/cv`             | Print-friendly CV (PDF export)          |
| `/study`          | Study posts list                        |
| `/study/$slug`    | Study post (Markdown in `src/content/`) |
| `/cover`          | Cover letters                           |
| `/cover/$company` | Cover letter for one company            |

Unknown paths render the root `notFoundComponent` with HTTP 404.

### Search Params

URL search params are the source of truth for UI state. Defined in `src/validators/rootSearchParams.ts`:

- `accent` - Accent hue preset
- `colorMode` - light/dark/system
- `contrast` - low/base/high

`accent` and `colorMode` are **retained across navigation** via TanStack Router's `retainSearchParams` middleware in `__root.tsx`. Params equal to their default are stripped from the URL.

### Server Functions

For server-only code (filesystem access, database queries, etc.), use TanStack Start's `createServerFn`. This ensures code runs only on the server and is not bundled into the client.

```tsx
import { createServerFn } from "@tanstack/react-start";

// src/lib/study/posts.ts
export const getPostBySlug = createServerFn({ method: "GET" })
  .validator((d: { slug: string }) => d)
  .handler(async ({ data }) => {
    // Only runs on the server
    return fetchPostBySlug(data.slug);
  });

// src/routes/study/$slug.tsx
export const Route = createFileRoute("/study/$slug")({
  loader: async ({ params: { slug } }) => {
    const post = await getPostBySlug({ data: { slug } });
    // ...
  }
});
```

**Key points:**

- Use `.validator()` for type-safe input
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

## Theming System

The ControlPanel manages visual customization via CSS custom properties.

### CSS Variables

Defined in `src/styles/global.css`, two inputs are set on `<body>` at runtime:

- `--hue-accent` - Accent hue (OKLCH), from the `accent` param
- `--chroma` - Chroma multiplier, from the `contrast` param

All colors (`--color-accent`, `--color-bg-*`, `--color-fg-*`) derive from these two.

### State Flow

```txt
User clicks ControlPanel option
    ↓
Hook updates (useAccent, useContrast, useColorMode)
    ↓
URL search param updated + localStorage persisted
    ↓
CSS variables / data-color-mode updated
    ↓
UI reacts via CSS
```

### Color Mode

Color mode uses `data-color-mode` attribute on `<html>`. `src/scripts/theme-blocking.js` is inlined in `__root.tsx` and applies color mode and accent before React hydrates, preventing a flash of the wrong theme. Keep its accent values in sync with `src/types/style.ts`.

## Data Flow Summary

```txt
Routes (smart)
    ├── Call hooks
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
