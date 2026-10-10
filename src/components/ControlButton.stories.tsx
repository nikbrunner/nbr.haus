import type { Meta, StoryObj } from "@storybook/react-vite";

import ControlButton from "@/components/ControlButton";

const meta: Meta<typeof ControlButton> = {
  component: ControlButton
};

export default meta;
type Story = StoryObj<typeof ControlButton>;

export const Default: Story = {
  args: { children: "Print / PDF" }
};

export const Pressed: Story = {
  args: { children: "Dark", pressed: true }
};
