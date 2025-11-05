# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Astro, deployed on Vercel. Uses server-side rendering with Vercel adapter. This is a minimal, content-focused site showcasing professional experience and projects.

## Development Commands

| Command           | Purpose                                      |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start local dev server at `localhost:3000`   |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview production build locally             |
| `npm run format`  | Format all files with Prettier               |
| `npm run lint`    | Lint TypeScript/JavaScript files with ESLint |

## Architecture

### Framework & Deployment

- **Astro 5** with server-side rendering (`output: "server"`)
- **Vercel adapter** for deployment
- Prefetching enabled for faster navigation
- Node 22.x runtime

### Project Structure

```
src/
├── assets/images/      # Static image assets
├── components/         # Astro components (Header, Footer, Navigation, Hr)
├── layouts/            # BaseLayout.astro - root layout for all pages
├── pages/              # File-based routing (index.astro, personal.astro, 404.astro)
├── styles/
│   ├── global.scss     # Global styles with custom properties
│   └── fonts.css       # Berkeley Mono font definitions
├── routes.ts           # Route definitions with closed/open states
└── env.d.ts            # Type definitions
```

### Styling System

- **Open Props** for standardized design tokens
- **SCSS** for component-level styles
- **Custom properties** defined in `global.scss`:
  - Uses OKLCH color space with configurable hue (`--hue: 170`)
  - Color palette: `--bg-main`, `--bg-support`, `--fg-main`, `--fg-support`, `--fg-minor`, `--fg-accent`
  - Typography: Berkeley Mono font family
  - Layout: `--content-max-width` set to `--size-content-3` from Open Props
  - Effects: `--shadow-hard` for border-style shadows
- Container queries (`container-type: inline-size`) for responsive sections
- Clamp-based fluid typography

### Page Layout Pattern

All pages follow this structure:

1. Import `BaseLayout` from `src/layouts/BaseLayout.astro`
2. Pass `title` prop to BaseLayout
3. Structure content in `<section>` tags (automatically constrained to max-width)
4. Component-level styles using scoped `<style>` or `<style lang="scss">`

### Routes System

Routes defined in `src/routes.ts` with typed paths and metadata:

- Type-safe `RoutePathName` union type
- `Route` interface includes `path`, `name`, and optional `closed` flag
- Used by Navigation component to render available pages
- Closed routes are visually marked but not yet implemented

### Code Style

- **ESLint**: TypeScript recommended rules, unix line endings, double quotes, semicolons required
- **Prettier**: 125 char print width, 2 space tabs, no trailing commas, double quotes
- **TypeScript**: Strict mode via `astro/tsconfigs/strict`

## Development Notes

- This is a personal portfolio site - content reflects the owner's experience and projects
- The site uses a "house" metaphor (nbr.haus) with different rooms representing different sections
- Some routes are marked as "closed" (Gallery, Studio, Library) - future development areas
- Font loading uses Berkeley Mono as the primary typeface
- Color system is hue-based for easy theme variations (currently set to hue 170)
