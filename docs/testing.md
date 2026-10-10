# Testing

Testing tools and patterns used in this project.

## Tools

| Tool           | Purpose                                                 |
| -------------- | ------------------------------------------------------- |
| **Vitest**     | Runs stories as browser tests and unit tests under Node |
| **Storybook**  | Component documentation; every story is also a test     |
| **Playwright** | Browser provider for the story tests (Chromium)         |

## Commands

```bash
npm run test        # Story tests and unit tests once
npm run storybook   # Storybook dev server (port 6006)
```

`vitest.config.ts` defines two projects:

- `storybook` - every `*.stories.tsx` under `src/components/`, rendered in Chromium
- `unit` - every `*.test.ts` under `src/`, run under Node

## What Gets a Test

- Every component gets a story.
- Pure logic with decisions gets a unit test next to its source, such as `src/lib/github/commitLog.test.ts` for parsing and merging GitHub responses.
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

Runs oxfmt, ESLint, TypeScript, and knip (unused files, exports, dependencies).
