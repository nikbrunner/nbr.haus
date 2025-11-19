import type { Meta, StoryObj } from "@storybook/react";
import AccentPicker from "./AccentPicker";

const meta: Meta<typeof AccentPicker> = {
  component: AccentPicker
};

export default meta;
type Story = StoryObj<typeof AccentPicker>;

export const Default: Story = {};
