# Testing

Testing tools and patterns used in this project.

## Tools

| Tool                | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| **Vitest**          | Unit/integration tests                         |
| **Testing Library** | React component testing                        |
| **Playwright**      | E2E tests (available but not extensively used) |
| **Storybook**       | Component documentation and visual testing     |

## Commands

```bash
npm run test        # Run all tests once
npm run storybook   # Start Storybook dev server (port 6006)
```

## Storybook

Storybook serves as living documentation for components. Stories are co-located with components:

```txt
src/components/
├── Button.tsx
├── Button.css
└── Button.stories.tsx
```

### Writing Stories

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Click me"
  }
};

export const Accent: Story = {
  args: {
    children: "Click me",
    variant: "accent"
  }
};
```

### Storybook Configuration

Storybook config lives in `src/storybook/`. Includes:

- Accessibility addon (`@storybook/addon-a11y`)
- Docs addon (`@storybook/addon-docs`)
- Vitest integration (`@storybook/addon-vitest`)

## Quality Checks

Run all checks before committing:

```bash
npm run check
```

This runs:

1. `check:format` - Prettier formatting
2. `check:lint` - ESLint rules
3. `check:compile` - TypeScript compilation
4. `knip` - Unused exports/dependencies
