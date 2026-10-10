import type { Meta, StoryObj } from "@storybook/react-vite";

import Colophon from "@/components/Colophon";

const meta: Meta<typeof Colophon> = {
  component: Colophon
};

export default meta;
type Story = StoryObj<typeof Colophon>;

export const Default: Story = {
  args: {
    start: "nbr.haus",
    center: "Design via function",
    end: "Page 1 / 1"
  }
};
