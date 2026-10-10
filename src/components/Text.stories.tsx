import type { Meta, StoryObj } from "@storybook/react-vite";

import Text from "@/components/Text";

const meta: Meta<typeof Text> = {
  component: Text
};

export default meta;
type Story = StoryObj<typeof Text>;

export const CapsBold: Story = {
  args: { caps: true, bold: true, children: "DealerCenter Digital" }
};

export const Muted: Story = {
  args: { muted: true, children: "Software Engineer, Frontend Lead" }
};

export const Spaced: Story = {
  args: {
    spaced: true,
    children: "Electron app used by hundreds of bike retailers."
  }
};
