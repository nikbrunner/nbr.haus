# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with TanStack Start (SSR framework), React 19, TypeScript, and regular CSS with BEM naming convention. The site is a single-page application showcasing profile, projects, work history, tech stack, and contact information.

## Development Commands

```bash
# Development (runs dev server on port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve

# Code quality
npm run check           # Run all checks (format, lint, compile)
npm run check:format    # Check formatting (Prettier)
npm run format          # Auto-format code (Prettier)
npm run check:lint      # Check linting (ESLint)
npm run lint            # Auto-fix linting (ESLint)
npm run lint:inspect    # Inspect ESLint configuration
npm run check:compile   # TypeScript type checking

# Testing
npm run test            # Run Vitest tests

# Storybook
npm run storybook       # Start Storybook dev server (port 6006)
npm run build:storybook # Build static Storybook
```

## Architecture

### Routing & SSR

- **TanStack Start** with file-based routing in `src/routes/`
- Routes auto-generate type-safe route tree at `src/routeTree.gen.ts` (do not edit manually)
- Root layout in `src/routes/__root.tsx` handles:
  - SEO meta tags and structured data (JSON-LD)
  - Global layout (StylePickers, DevTools)
  - Shell component for SSR (`RootDocument`)
  - Route-level search params validation with Zod
- Single route (`/`) defined in `src/routes/index.tsx` with responsive multi-column layouts
- Search params validation defined in `src/validators/rootSearchParams.ts` using Zod

### Component Architecture

- **Functional components only** - no class components
- **Regular CSS with BEM naming** for styling (`.css` files)
  - Import as: `import "./Component.css"`
  - BEM format: `.block__element--modifier` (e.g., `.project__badge--primary`)
  - **CVA (class-variance-authority)** for variant handling and conditional classes
    - Use `cva()` for components with variants
    - Use `cx()` for simple class composition
- **Path aliases**: `@/*` maps to `src/*` (configured in tsconfig.json)
- **Open Props** for design tokens (CSS custom properties)

### Directory Structure

```text
src/
├── assets/           # Static assets (images, etc.)
├── components/       # Presentational/dumb components
│   └── StylePicker/  # Theme customization system
├── content-blocks/   # Smart content containers
│   └── index/        # Content blocks for index route
├── hooks/            # Custom React hooks
├── routes/           # TanStack Router file-based routes
├── storybook/        # Storybook configuration
├── styles/           # Global styles
└── validators/       # Zod schemas for validation
```

### Components (`src/components/`)

Presentational/dumb components: Header, Project, Job, Section, Link, Badge, SpecCard, SpecList, SpecGrid, Hr, Highlight, NotFound

**StylePicker System** (`src/components/StylePicker/`):

- Full theming system with hue (accent color), color mode (light/system/dark), and contrast settings
- Uses `@tanstack/react-store` for state management
- Persists preferences to localStorage
- Supports URL search params for sharing themes

### Content Blocks (`src/content-blocks/index/`)

Smart content containers that consume dumb components and provide content:

- About, Projects, Jobs, DevStack, Connect, ProfilePicture, LookingForJob

### Hooks (`src/hooks/`)

Custom React hooks:

- `useOnClickOutside` - Detect clicks outside a ref element

### Responsive Layout Pattern

The index route renders **four different layouts** (1, 2, 3, and 4 columns) with CSS controlling which displays based on viewport. All layouts use the same Section and content-block components but arrange them differently.

### Styling Conventions

- **BEM naming convention** for component-scoped styles (e.g., `.spec-card__title`, `.project__badge--primary`)
- Global styles in `src/styles/global.css`
- Custom properties from Open Props for consistent design tokens
- CSS files co-located with components (e.g., `Component.tsx` + `Component.css`)
- StylePicker CSS variables: `--hue`, `--hue-accent`, `--hue-accent-alt`, `--contrast-l`, `--contrast-c`

### State Management

- **`@tanstack/react-store`** for StylePicker state (hue, colorMode, contrast)
- No global state manager for app data - content is static

### Storybook

- Configuration in `src/storybook/`
- Stories co-located with components (`*.stories.tsx`)
- Includes accessibility addon (`@storybook/addon-a11y`)

### DevTools

- **TanStack DevTools** configured in root route with Router panel
- **TanStack Router DevTools Panel** integrated as a plugin
- Client-only components wrapped with `<ClientOnly>`

## TypeScript Configuration

- Strict mode enabled with all recommended TypeScript strictness
- `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports` enforced
- Module resolution: `bundler`
- Path aliases: `@/*` → `./src/*`
- JSX: `react-jsx` (automatic runtime)

## ESLint Configuration

- Flat config format in `eslint.config.ts`
- Plugins: TypeScript ESLint, React, JSON, Markdown, CSS, Storybook
- Ignores patterns from `.gitignore` plus `.claude/*` and `.vscode/*`
- React version detection enabled
- Recommended rules for all file types

## Prettier Configuration

- 2-space indentation, no tabs
- Double quotes for strings
- Semicolons required
- Print width: 85 characters
- No trailing commas
- Arrow function parens: avoid when possible

## Key Dependencies

- **TanStack Start** - SSR framework
- **TanStack Router** - File-based routing with type safety
- **TanStack Store** - Lightweight state management (StylePicker)
- **React 19** - UI framework
- **Vite** - Build tool
- **Vitest** - Testing framework
- **Storybook** - Component development and documentation
- **ESLint** - Linting (with TypeScript, React, JSON, Markdown, CSS, Storybook plugins)
- **Prettier** - Code formatting
- **class-variance-authority (CVA)** - CSS class variant handling and composition
- **Open Props** - CSS design tokens
- **Lucide React** - Icon library
- **Zod** - Schema validation (used for search params)

## Build Configuration (vite.config.ts)

Plugins in order:

1. `@tanstack/devtools-vite` - DevTools integration
2. `nitro` - Server engine for SSR
3. `vite-tsconfig-paths` - Path alias support
4. `@tanstack/react-start/plugin/vite` - TanStack Start
5. `@vitejs/plugin-react` - React support

## Important Notes

- `src/routeTree.gen.ts` is auto-generated - never edit manually
- Development uses port 3000, Storybook uses port 6006
- StylePicker allows theme customization via CSS custom properties (controlled by `hue`, `colorMode`, `contrast` search params)
- Search params `hue` and `colorMode` are retained across navigation
- Structured data (JSON-LD) uses `dangerouslySetInnerHTML` for SEO
- Node 22.x required (see `engines` in package.json)
