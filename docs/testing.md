# Testing

Testing tools and patterns used in this project.

## Tools

| Tool           | Purpose                                                      |
| -------------- | ------------------------------------------------------------ |
| **Vitest**     | Runs stories as browser tests and unit tests under Node      |
| **Storybook**  | Component documentation; every story is also a test          |
| **Playwright** | Browser provider for story and DOM tests, and the E2E runner |

## Commands

```bash
npm run test        # Story, unit and DOM tests once
npm run test:e2e    # End-to-end tests against a dev server on port 3200
npm run test:e2e:ui      # The same in Playwright's UI: pick tests, watch them, step through
npm run test:e2e:headed  # The same in a visible browser window
npm run storybook   # Storybook dev server (port 6006)
```

`vitest.config.ts` defines two projects:

- `storybook` - every `*.stories.tsx` under `src/components/`, rendered in Chromium
- `unit` - every `*.test.ts` under `src/`, run under Node
- `dom` - every `*.browser.test.ts` under `src/`, run in Chromium for logic that needs real layout, such as `src/lib/navCursor.browser.test.ts`

`playwright.config.ts` runs `e2e/*.spec.ts` against its own dev server on port 3200, one worker at a time, so a running `npm run dev` stays untouched. `e2e/keyboard.spec.ts` covers the key bindings, the cursor and the background audio. The `pre-push` hook in `lefthook.yml` runs them before every push; `git push --no-verify` skips it.

## What Gets a Test

- Every component gets a story.
- Pure logic with decisions gets a unit test next to its source; logic that measures layout or moves focus gets a `*.browser.test.ts` instead, such as `src/lib/github/commitLog.test.ts` for parsing and merging GitHub responses.
- Components that only map props to markup need no unit test beyond their story.

## Storybook

Stories are co-located with components:

```tsx
// SpecSection.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";

import SpecSection from "@/components/SpecSection";

const meta: Meta<typeof SpecSection> = {
  component: SpecSection
};

export default meta;
type Story = StoryObj<typeof SpecSection>;

export const Default: Story = {
  args: {
    number: "02",
    title: "About",
    children: <p>I build frontend architecture and design systems.</p>
  }
};
```

Storybook config lives in `src/storybook/`, with the accessibility, docs, and Vitest addons.

## Quality Checks

```bash
npm run check
```

Runs oxfmt, ESLint, TypeScript, a check for components that only their own story imports (`scripts/check-story-only.ts`; knip counts stories as entry points and misses these), and knip (unused files, exports, dependencies).
