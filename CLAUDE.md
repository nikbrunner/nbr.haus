# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with TanStack Start (SSR framework), React 19, TypeScript, and regular CSS with BEM naming convention.

## Development Commands

```bash
npm run dev              # Dev server on port 3000
npm run build            # Production build
npm run serve            # Preview production build
npm run check            # All checks (format, lint, compile)
npm run format           # Auto-format (Prettier)
npm run lint             # Auto-fix linting (ESLint)
npm run test             # Run Vitest tests
npm run storybook        # Storybook dev server (port 6006)
```

## Architecture

### Routing & SSR

- **TanStack Start** with file-based routing in `src/routes/`
- Auto-generated route tree at `src/routeTree.gen.ts` (never edit manually)
- Root layout in `src/routes/__root.tsx` handles SEO, global layout, and search params
- Route groups: `(home)` for the main portfolio page
- Search params validated with Zod in `src/validators/rootSearchParams.ts`
- Params `hue`, `colorMode`, and `lang` are retained across navigation

### Routes

| Route | Purpose |
|-------|---------|
| `/` | Main portfolio (responsive multi-column layouts) |
| `/cv` | Print-friendly CV with i18n support |

### i18n System (`src/i18n/`)

Lightweight localization using TanStack Store:

- `useLocale()` - Get current locale
- `useTexts({ en, de })` - Get route-specific translations
- `useSharedTexts()` - Get shared translations (name, links, etc.)
- `<Trans>` component for inline translations
- Locale persisted to localStorage and synced with `lang` URL param

Route translations are co-located (e.g., `src/routes/cv/cv.en.ts`, `cv.de.ts`).

### Component Architecture

- **Dumb components** in `src/components/` - presentational only
- **Content blocks** in `src/content-blocks/` - smart containers that compose dumb components with data
- **CV components** in `src/components/cv/` - print-optimized for CV route
- Co-located CSS files with BEM naming (`.block__element--modifier`)
- **CVA (class-variance-authority)** for variant handling

### ControlPanel (`src/components/ControlPanel/`)

Theming system with:
- Hue (accent color), color mode (light/system/dark), contrast, and locale settings
- Uses `@tanstack/react-store` for state
- Persists to localStorage and syncs with URL search params

### Styling Conventions

- BEM naming for component-scoped styles
- Global styles in `src/styles/global.css`
- Open Props for design tokens
- CSS variables: `--hue`, `--hue-accent`, `--hue-accent-alt`, `--contrast-l`, `--contrast-c`

### Shared Configuration

- `src/config.ts` - Tech stack data, links, and shared constants

## Key Patterns

- Path alias: `@/*` → `src/*`
- Client-only components wrapped with `<ClientOnly>`
- Stories co-located with components (`*.stories.tsx`)
- Functional components only, no class components

## Important Notes

- Node 22.x required
- `src/routeTree.gen.ts` is auto-generated - never edit
- Print styles in CV route for PDF export
- Structured data (JSON-LD) for SEO
