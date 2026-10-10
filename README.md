# nbr.haus

Personal portfolio website built with TanStack Start, React 19, and TypeScript.

**Live:** [nbr.haus](https://nbr.haus) | **Deployments:** [Vercel](https://vercel.com/nikbrunner/nbr-haus)

## Quick Start

```bash
npm install
npm run dev
```

`npm install` also installs the Git hooks from `lefthook.yml`. If npm skips lefthook's install script, run `npx lefthook install`.

The commit log reads `GITHUB_TOKEN` (fine-grained, read-only, public repositories) when set. Without it, it falls back to unauthenticated GitHub requests.

## Documentation

- [Architecture](./docs/architecture.md) - System overview, routing, theming
- [Components](./docs/components.md) - Component patterns and structure
- [Styling](./docs/styling.md) - CSS conventions and theming
- [Content](./docs/content.md) - Adding routes, projects, posts
- [Testing](./docs/testing.md) - Testing tools and Storybook
