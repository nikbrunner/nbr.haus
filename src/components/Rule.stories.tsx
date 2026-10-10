import type { Meta, StoryObj } from "@storybook/react-vite";

import Rule from "@/components/Rule";

const meta: Meta<typeof Rule> = {
  component: Rule
};

export default meta;
type Story = StoryObj<typeof Rule>;

export const Solid: Story = {};

export const Dashed: Story = { args: { dashed: true } };
