import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "@/components/Button";

const meta: Meta<typeof Button> = {
  component: Button
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button"
  }
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button"
  }
};

export const PrimaryLarge: Story = {
  args: {
    variant: "primary",
    size: "large",
    children: "Large Primary Button"
  }
};

export const AsChildWithAnchor: Story = {
  args: {
    variant: "primary",
    asChild: true,
    children: <a href="https://example.com">Link as Button</a>
  }
};

export const AsChildExternal: Story = {
  args: {
    variant: "secondary",
    asChild: true,
    children: (
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        External Link
      </a>
    )
  }
};
