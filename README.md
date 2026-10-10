# nbr.haus

Personal portfolio website built with TanStack Start, React 19, and TypeScript.

**Live:** [nbr.haus](https://nbr.haus) | **Deployments:** [Vercel](https://vercel.com/nikbrunner/nbr-haus)

## Quick Start

```bash
npm install
npm run dev
```

`npm install` also installs the Git hooks from `lefthook.yml`. If npm skips lefthook's install script, run `npx lefthook install`.

The commit log needs a GitHub token to work reliably: `GITHUB_PAT`, a fine-grained, read-only token for public repositories. Without it the site falls back to unauthenticated GitHub requests, which share a limit of 60 per hour per IP and run out quickly. Locally, start the dev server with the token from Proton Pass:

```bash
GITHUB_PAT=pass://Nik/.env/GITHUB_PAT pass-cli run -- npm run dev
```

On Vercel, `GITHUB_PAT` is set as an environment variable for Production, Preview and Development.

## Documentation

- [Architecture](./docs/architecture.md) - System overview, routing, theming
- [Components](./docs/components.md) - Component patterns and structure
- [Styling](./docs/styling.md) - CSS conventions and theming
- [Content](./docs/content.md) - Adding routes, projects, posts
- [Testing](./docs/testing.md) - Testing tools and Storybook
