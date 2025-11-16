# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with TanStack Start (SSR framework), React 19, TypeScript, and CSS Modules. The site is a single-page application showcasing profile, projects, work history, tech stack, dev tools, AI usage, and contact information.

## Development Commands

```bash
# Development (runs dev server + CSS types watcher concurrently)
npm run dev
# Dev server only (port 3000)
npm run dev:server
# CSS types watcher only
npm run dev:css-types

# Build for production
npm run build

# Preview production build
npm run serve

# Code quality
npm run check           # Run all checks (format, lint, compile)
npm run check:format    # Check formatting (Biome)
npm run format          # Auto-format code (Biome)
npm run check:lint      # Check linting (Biome)
npm run lint            # Auto-fix linting (Biome)
npm run check:compile   # TypeScript type checking

# Testing
npm run test            # Run Vitest tests
```

## Architecture

### Routing & SSR
- **TanStack Start** with file-based routing in `src/routes/`
- Routes auto-generate type-safe route tree at `src/routeTree.gen.ts` (do not edit manually)
- Root layout in `src/routes/__root.tsx` handles:
  - SEO meta tags and structured data (JSON-LD)
  - Global layout (Header, AccentPicker, DevTools)
  - Shell component for SSR
- Single route (`/`) defined in `src/routes/index.tsx` with responsive multi-column layouts

### Component Architecture
- **Functional components only** - no class components
- **CSS Modules** for styling (`.module.css` files)
  - TypeScript types auto-generated via `typed-css-modules` (tcm)
  - Import as: `import styles from "./Component.module.css"`
- **Path aliases**: `@/*` maps to `src/*` (configured in tsconfig.json)
- **Open Props** for design tokens (CSS custom properties)

### Content Structure
Components in `src/components/`:
- Presentational/dumb components (Header, Project, Job, Section, Link, etc.)

Content blocks in `src/content-blocks/index/`:
- Smart content containers for the index route (About, Projects, Jobs, TechStack, DevTools, AI, Connect, ProfilePicture)
- These consume the dumb components and provide content

### Responsive Layout Pattern
The index route renders **four different layouts** (1, 2, 3, and 4 columns) with CSS controlling which displays based on viewport. All layouts use the same Section and content-block components but arrange them differently.

### Styling Conventions
- CSS Modules for component-scoped styles
- Global styles in `src/styles/global.css`
- Custom properties from Open Props for consistent design tokens
- Semantic class names (`.project`, `.metadata`, `.links`, etc.)

### DevTools
- **TanStack DevTools** configured in root route with Router panel
- **TanStack Router DevTools Panel** integrated
- Client-only components wrapped with `<ClientOnly>`

## TypeScript Configuration
- Strict mode enabled with all recommended TypeScript strictness
- `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` enforced
- Module resolution: `bundler`
- Path aliases: `@/*` → `./src/*`

## Biome Configuration
- Formatter: 2-space indentation, double quotes for JS
- Linter: recommended rules enabled
  - `useUniqueElementIds`: error
  - `noDangerouslySetInnerHtml`: disabled (required for structured data)
- CSS Modules parsing enabled
- Auto-organize imports on save
- VCS integration with git

## Key Dependencies
- **TanStack Start** - SSR framework
- **TanStack Router** - File-based routing with type safety
- **React 19** - UI framework
- **Vite** - Build tool
- **Vitest** - Testing framework
- **Biome** - Linting and formatting
- **typed-css-modules** - CSS Module type generation
- **Open Props** - CSS design tokens
- **Lucide React** - Icon library
- **concurrently** - Run multiple npm scripts

## Build Configuration (vite.config.ts)
Plugins in order:
1. `@tanstack/devtools-vite` - DevTools integration
2. `nitro` - Server engine for SSR
3. `vite-tsconfig-paths` - Path alias support
4. `@tanstack/react-start/plugin/vite` - TanStack Start
5. `@vitejs/plugin-react` - React support

## Important Notes
- `src/routeTree.gen.ts` is auto-generated - never edit manually
- CSS Module `.d.ts` files are auto-generated - excluded from Biome
- Development uses port 3000
- AccentPicker component allows theme customization via CSS custom properties
- Profile picture uses CSS Modules with custom styling
- Structured data (JSON-LD) uses `dangerouslySetInnerHTML` (Biome rule disabled for this)
