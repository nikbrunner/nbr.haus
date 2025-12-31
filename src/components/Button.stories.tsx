import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "@/components/Button";

const meta: Meta<typeof Button> = {
  component: Button
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Default Button"
  }
};

export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Accent Button"
  }
};

export const AccentLarge: Story = {
  args: {
    variant: "accent",
    size: "large",
    children: "Large Accent Button"
  }
};

export const AsChildWithAnchor: Story = {
  args: {
    variant: "accent",
    asChild: true,
    children: <a href="https://example.com">Link as Button</a>
  }
};

export const AsChildExternal: Story = {
  args: {
    asChild: true,
    children: (
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        External Link
      </a>
    )
  }
};
