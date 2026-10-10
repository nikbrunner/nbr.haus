# Architecture

How the site is structured and how the pieces connect.

## Tech Stack

- **TanStack Start** - SSR framework with file-based routing
- **TanStack Query** - Client-side server state (the commit log)
- **React 19** - UI library
- **TypeScript** - Type safety
- **CSS** - Regular CSS with BEM naming (no CSS-in-JS)
- **Zod** - Validation for search params and GitHub responses

Vercel is the deploy target.

## Routing

File-based routing in `src/routes/`. The route tree is auto-generated at `src/routeTree.gen.ts` - never edit this file manually.

### Routes

| Route          | Purpose                                                         |
| -------------- | --------------------------------------------------------------- |
| `/`            | Spec sheet: ident, work, projects, study. Also the printable CV |
| `/study`       | Study posts list                                                |
| `/study/$slug` | Study post (Markdown in `src/content/`)                         |

Unknown paths render the root `notFoundComponent` with HTTP 404.

### Search Params

URL search params are the source of truth for UI state. Defined in `src/validators/rootSearchParams.ts`:

- `accent` - Accent hue preset
- `colorMode` - light/dark/system

Both are **retained across navigation** via TanStack Router's `retainSearchParams` middleware in `__root.tsx`. Params equal to their default are stripped from the URL. Invalid values fall back to the default.

### Server Functions

Server-only code uses TanStack Start's `createServerFn`. Study posts read Markdown from disk in `src/lib/study/posts.ts`; the commit log calls GitHub in `src/lib/github/fetchCommitLog.ts`.

### Root Layout

`src/routes/__root.tsx` handles:

- SEO meta tags and structured data (JSON-LD)
- Global CSS import
- Search param validation and retention
- The paper `Sheet` on the desk and the `Grain` overlay
- Color mode initialization script (prevents flash)

`src/router.tsx` creates the `QueryClient` and connects it with `setupRouterSsrQueryIntegration`.

## Commit Log

The home page shows the latest public commits across the repos listed in `logRepos` (`src/config.ts`). The page renders without it; the log loads on the client afterwards.

```txt
useQuery(getCommitLog())          src/lib/github/queries.ts
    ↓
fetchCommitLog (GET server fn)    src/lib/github/fetchCommitLog.ts
    ↓
GITHUB_TOKEN set?  → GraphQL, one query with an alias per repo
otherwise / on failure → REST, one request per repo, no token
    ↓
Zod parses the response, commits are merged and sorted (src/lib/github/commitLog.ts)
```

- The server function returns errors as values: `{ status: "ok", log }` or `{ status: "error", code }`. The UI shows a link to GitHub when the log is unavailable.
- Every GitHub request times out after 4 seconds.
- Caching depends on the outcome. A full log is `200` with `s-maxage=300, stale-while-revalidate`, so the CDN serves it and GitHub sees about one request every five minutes. A partial log (some repos failed) is `200` with `s-maxage=60`. When every source fails, the response is `503` with no cache headers; the CDN does not store it and keeps serving the last good log.
- `GITHUB_TOKEN` is a fine-grained token with read-only access to public repositories, set as a Vercel environment variable. Without it the unauthenticated REST fallback applies.
- Only commits authored by `GITHUB_USER` count. Pins show each repo's newest commit date from the same response.

## Theming System

Each route renders the `SiteHeader` partial and its own `Colophon`. The header holds the `SiteControls` container, a bar of bracketed accent and mode options, and the `SiteIndex` navigation tree. The controls set two inputs:

- `--hue-accent` on `<body>` - from the `accent` param
- `data-color-mode` on `<html>` - from the `colorMode` param

All colors are defined in `src/styles/global.css` with `light-dark()`. The desk behind the sheet takes the accent hue; the sheet itself is tinted paper.

### Grain

`Grain` draws hashed film grain on a fixed canvas: multiply and darkening-only on light paper, soft-light on dark. It re-rolls at the configured rate, stays static under `prefers-reduced-motion`, pauses while the tab is hidden, and is hidden in print. The defaults live in `GRAIN_SETTINGS` in `src/lib/grain.ts`; the component accepts each as a prop.

### State Flow

```txt
User clicks a bracketed option in the control bar
    ↓
useAccent / useColorMode
    ↓
URL search param updated + localStorage persisted
    ↓
--hue-accent / data-color-mode updated
    ↓
UI reacts via CSS
```

`src/scripts/theme-blocking.js` is inlined in `__root.tsx` and applies color mode and accent before React hydrates. Keep its accent values in sync with `src/types/style.ts`.

## Keyboard

`useSiteHotkeys` (`src/hooks/useSiteHotkeys.ts`, used by `SiteControls`) binds Vim-style keys with TanStack Hotkeys. `?` shows every binding in the `KeyHints` panel; a prefix (`g`, `t`, `m`, `z`) shows its next keys.

- `j` `k` select the next or previous block, `h` `l` the links and buttons inside it, `Enter` opens. Arrow keys do the same once a block is selected; before that they scroll. `Esc` or a click clears the selection.
- `J` `K` jump between section headings and scroll them to the top.
- `d` `u` scroll half a page and carry the selection along. `gg` `G` select the first or last block, `zt` `zz` scroll the selection to the top or middle.
- `gh` `gs` go home or to the study list, which opens with its first entry selected.
- `t` + `r` `o` `g` `b` sets the accent, `m` + `l` `d` `s` the color mode.

The cursor lives in `src/lib/navCursor.ts`, outside React, so it survives route changes. Blocks are found by `BLOCK_SELECTOR` in visual reading order; add `data-nav-block` to make another element one. The selection is real focus; `NavCursor` draws the brackets.

## Audio

`src/lib/audio.ts` holds one audio element for the whole site, outside React, so playback continues across pages. `AudioPlayer` on a study page and `MiniPlayer` read and steer it through `useAudio`. Switching voices resumes five seconds before the current position. The chosen voice and each file's position are kept in localStorage. Generating the files is covered in [Content](./content.md#audio).

## Data Flow Summary

```txt
Routes (smart)
    ├── Call hooks, loaders and queries
    ├── Prepare data and copy
    └── Pass props down
         ↓
Partials (compositions)
    └── Compose components, no styling
         ↓
Components (dumb)
    ├── Receive props only
    ├── Own all their styling
    └── Know nothing about context
```

See [components.md](./components.md) for details on this pattern.
