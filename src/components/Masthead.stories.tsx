import type { Meta, StoryObj } from "@storybook/react-vite";

import Masthead from "@/components/Masthead";

const meta: Meta<typeof Masthead> = {
  component: Masthead
};

export default meta;
type Story = StoryObj<typeof Masthead>;

export const Default: Story = {
  args: {
    start: <p>Header and controls</p>,
    end: <p>Index</p>
  }
};
